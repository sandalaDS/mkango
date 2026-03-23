import { NextRequest, NextResponse } from 'next/server';
import { getLocalPayload } from '@/lib/payload';

// Make it fully dynamic so it doesn't get cached
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const payload = await getLocalPayload();
    
    const messagesRef = await payload.find({
      collection: 'messages',
      where: { conversation: { equals: id } },
      sort: 'createdAt',
      limit: 100,
    });
    
    const conv = await payload.findByID({
      collection: 'conversations',
      id
    });

    return NextResponse.json({ 
       messages: messagesRef.docs,
       status: conv.status
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
