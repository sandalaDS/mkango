import { getLocalPayload } from '@/lib/payload';
import Link from 'next/link';
import { InboxPoller } from './poller';

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const payload = await getLocalPayload();
  
  const conversations = await payload.find({
    collection: 'conversations',
    sort: '-updatedAt',
    limit: 50,
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <InboxPoller intervalMs={5000} />
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Staff Inbox</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
        <ul className="divide-y divide-slate-200">
          {conversations.docs.map((conv: any) => (
            <li key={conv.id} className={conv.unreadForStaff ? 'bg-indigo-50/30' : ''}>
              <Link href={'/staff/inbox/' + conv.id} className="block hover:bg-slate-50 p-4 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {conv.unreadForStaff && <span className="w-2 h-2 rounded-full bg-blue-600 block"></span>}
                    <p className="text-sm font-medium text-[#0f4d37] truncate">
                      {conv.guestName || 'Anonymous Guest'} {conv.guestContact ? `(${conv.guestContact})` : ''}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center flex-shrink-0 gap-3">
                    <p className="text-xs text-slate-400 whitespace-nowrap hidden sm:block">
                      {new Date(conv.updatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      conv.status === 'PENDING_HUMAN' ? 'bg-red-100 text-red-800' : 
                      conv.status === 'HUMAN_ACTIVE' ? 'bg-blue-100 text-blue-800' :
                      conv.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {conv.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between px-5">
                  <div className="sm:flex text-sm text-slate-500 w-full justify-between items-center">
                    <p className="truncate pr-4">
                      {conv.summary || 'No summary available.'}
                    </p>
                    <p className="text-xs text-slate-400 whitespace-nowrap block sm:hidden mt-2">
                      {new Date(conv.updatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          {conversations.docs.length === 0 && (
            <li className="p-4 text-slate-500 text-center">No conversations found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
