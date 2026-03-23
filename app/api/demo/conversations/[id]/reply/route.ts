import { NextRequest, NextResponse } from 'next/server';
import { getLocalPayload } from '@/lib/payload';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { body } = await req.json();

    if (!body || !body.trim()) {
      return NextResponse.json({ error: 'Reply body is required' }, { status: 400 });
    }

    const payload = await getLocalPayload();
    
    const convId = Number(id);

    await payload.create({
      collection: 'messages',
      data: {
        conversation: convId,
        senderType: 'staff',
        body,
      }
    });

    await payload.update({
      collection: 'conversations',
      id: convId,
      data: {
        status: 'HUMAN_ACTIVE',
        unreadForStaff: false,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Reply Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
