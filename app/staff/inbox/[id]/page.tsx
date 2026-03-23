import { getLocalPayload } from '@/lib/payload';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { InboxPoller } from '../poller';

export const dynamic = 'force-dynamic';

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const payload = await getLocalPayload();
  const convId = Number(unwrappedParams.id);
  
  const conversation = await payload.findByID({
    collection: 'conversations',
    id: convId,
  });

  if (!conversation) {
    notFound();
  }

  const messagesRef = await payload.find({
    collection: 'messages',
    where: { conversation: { equals: convId } },
    sort: 'createdAt',
    limit: 100,
  });

  const leadsRef = await payload.find({
    collection: 'leads',
    where: { conversation: { equals: convId } },
    limit: 1,
  });

  const lead = leadsRef.docs[0];

  async function handleReply(formData: FormData) {
    'use server';
    const body = formData.get('reply') as string;
    if (!body?.trim()) return;

    const pl = await getLocalPayload();
    await pl.create({
      collection: 'messages',
      data: {
        conversation: convId,
        senderType: 'staff',
        body,
      }
    });
    
    await pl.update({
      collection: 'conversations',
      id: convId,
      data: { status: 'HUMAN_ACTIVE', unreadForStaff: false }
    });

    revalidatePath('/staff/inbox/' + unwrappedParams.id);
  }

  async function updateStatus(formData: FormData) {
    'use server';
    const action = formData.get('action') as string;
    let newStatus = conversation.status;
    if (action === 'takeOver') newStatus = 'HUMAN_ACTIVE';
    if (action === 'returnToAi') newStatus = 'AI_ACTIVE';
    if (action === 'markClosed') newStatus = 'CLOSED';

    const pl = await getLocalPayload();
    await pl.update({
      collection: 'conversations',
      id: convId,
      data: { status: newStatus, unreadForStaff: false }
    });
    revalidatePath('/staff/inbox/' + unwrappedParams.id);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 flex flex-col h-screen">
      <InboxPoller intervalMs={3000} />
      <div className="mb-4 shrink-0">
        <Link href="/staff/inbox" className="text-[#0f4d37] hover:underline text-sm font-medium">
          &larr; Back to Inbox
        </Link>
      </div>
      
      {/* Top: Lead Summary Card */}
      {lead && (
        <div className="bg-white shadow rounded-lg border border-slate-200 p-5 mb-6 shrink-0 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="col-span-2 md:col-span-4 border-b pb-2 mb-2 font-semibold text-slate-800 uppercase tracking-wide text-xs flex justify-between">
            <span>Lead Information</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{lead.requestType}</span>
          </div>
          <div><span className="text-slate-500 block text-xs">Guest Name</span>{lead.guestName || '-'}</div>
          <div><span className="text-slate-500 block text-xs">Contact</span>{lead.guestContact || '-'}</div>
          <div><span className="text-slate-500 block text-xs">Dates</span>{lead.checkInDate || '?'} to {lead.checkOutDate || '?'}</div>
          <div><span className="text-slate-500 block text-xs">Guests</span>{lead.guestCount || '-'}</div>
          <div className="col-span-2 md:col-span-4 mt-2">
            <span className="text-slate-500 block text-xs">Notes/Summary</span>
            <span className="text-slate-800 bg-slate-50 p-2 block rounded mt-1">{lead.notes || conversation.summary || 'No additional notes'}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200 flex flex-col flex-1 min-h-0">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 p-4 shrink-0 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {conversation.guestName || 'Anonymous Guest'}
            </h2>
            <p className="text-sm text-slate-500">Status: {conversation.status}</p>
          </div>
          <form action={updateStatus} className="flex gap-2">
             <button name="action" value="takeOver" className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-semibold hover:bg-blue-100">Take Over</button>
             <button name="action" value="returnToAi" className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold hover:bg-emerald-100">Return to AI</button>
             <button name="action" value="markClosed" className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded text-xs font-semibold hover:bg-gray-100">Close</button>
          </form>
        </div>

        {/* Middle: Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50">
          {messagesRef.docs.map((m: any) => (
            <div key={m.id} className={"flex " + (m.senderType === 'guest' ? 'justify-start' : 'justify-end')}>
              <div className={"max-w-[70%] rounded-lg px-4 py-2 text-sm " + 
                (m.senderType === 'guest' ? 'bg-white shadow border border-slate-200 text-slate-800' :
                 m.senderType === 'staff' ? 'bg-[#0f4d37] text-white' : 'bg-slate-200 text-slate-800')}>
                <div className="text-[10px] uppercase opacity-70 mb-1 font-semibold tracking-wider flex justify-between items-center gap-4">
                  <span>{m.senderType === 'guest' ? 'Guest' : m.senderType === 'staff' ? 'Staff' : 'AI Concierge'}</span>
                  <span className="lowercase font-normal opacity-75 whitespace-nowrap">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {m.body}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom: Reply Input */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form action={handleReply} className="flex gap-2">
            <input
              type="text"
              name="reply"
              disabled={conversation.status === 'CLOSED'}
              placeholder={conversation.status === 'CLOSED' ? 'Conversation closed' : 'Type staff reply...'}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0f4d37] focus:ring-1 focus:ring-[#0f4d37] disabled:bg-slate-100"
              autoComplete="off"
            />
            <button 
              type="submit"
              disabled={conversation.status === 'CLOSED'}
              className="px-6 py-2 bg-[#0f4d37] text-white font-medium text-sm rounded-lg hover:bg-[#0c402e] transition disabled:opacity-50"
            >
              Reply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
