import { NextRequest, NextResponse } from 'next/server';
import { generateText, tool } from 'ai';
import { getPrimaryModel } from '@/lib/ai/model-config';
import { getLocalPayload } from '@/lib/payload';
import { getConciergeSystemPrompt } from '@/lib/ai/concierge-system-prompt';
import { hotelFaqs } from '@/data/hotel-faqs';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId, guestName, guestContact } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const payload = await getLocalPayload();
    let currentConversationId = conversationId;

    if (!currentConversationId) {
      const newConv = await payload.create({
        collection: 'conversations',
        data: {
          status: 'AI_ACTIVE',
          guestName: guestName || '',
          guestContact: guestContact || '',
          unreadForStaff: false,
        },
      });
      currentConversationId = newConv.id;
    } else {
      try {
        const existingConv = await payload.findByID({ collection: 'conversations', id: currentConversationId });
        if (existingConv.status === 'HUMAN_ACTIVE') {
          await payload.create({
            collection: 'messages',
            data: { conversation: currentConversationId, senderType: 'guest', body: message }
          });
          // Update the unread indicator for staff so they know the guest replied
          await payload.update({
            collection: 'conversations',
            id: currentConversationId,
            data: { unreadForStaff: true }
          });
          return NextResponse.json({ reply: '', conversationId: currentConversationId, isEscalated: true });
        }
      } catch (e) {
        console.error('Error fetching conv', e);
      }
    }

    await payload.create({
      collection: 'messages',
      data: {
        conversation: currentConversationId,
        senderType: 'guest',
        body: message,
      },
    });

    const pastMessagesDocs = await payload.find({
      collection: 'messages',
      where: {
        conversation: { equals: currentConversationId },
      },
      sort: '-createdAt',
      limit: 20,
    });

    const chronologicalDocs = pastMessagesDocs.docs.reverse();

    const aiMessagesContext = chronologicalDocs.map((doc: any) => ({
      role: doc.senderType === 'guest' ? 'user' : 'assistant',
      content: doc.body,
    })) as Array<{ role: 'user'|'assistant', content: string }>;

    let isEscalation = false;

    const systemPrompt = `
      ${getConciergeSystemPrompt()}
      
      FAQs to help you answer:
      ${hotelFaqs.map((faq: any) => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}

      CRITICAL INSTRUCTIONS:
      Do NOT confirm bookings, hallucinate availability, or provide internal checkout links.
      If a user wants to book a room, check availability, or make a reservation, guide them to our booking system using the directToNebula tool. Give them the Nebula URL. Do NOT use fake urls.
      If a user asks about an airport transfer, a conference/event, or has a complaint, use the captureActionableLead tool to escalate it to our staff.
      When escalating, state clearly: "I’ve shared this with our team. They’ll review and get back to you shortly. I can still help with other questions in the meantime."
      Always include "✔ Message sent to hotel team" if you successfully captured a lead.
    `;

    const { text, toolResults } = await generateText({
      model: getPrimaryModel(),
      system: systemPrompt,
      messages: aiMessagesContext,
      tools: {
        directToNebula: tool({
          description: 'Provide the guest with the direct booking URL for the Nebula CRS when they want to check availability, book a room, or make a reservation.',
          parameters: z.object({
             checkin: z.string().optional().describe('Check-in date yyyy-mm-dd'),
             checkout: z.string().optional().describe('Check-out date yyyy-mm-dd'),
             guests: z.number().optional().describe('Number of guests')
          }),
          // @ts-expect-error SDK Type mismatch for maxSteps tools
          execute: async ({ checkin, checkout, guests }: { checkin?: string; checkout?: string; guests?: number }) => {
            let url = "https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370";
            const params = new URLSearchParams();
            if (checkin) params.append("checkin", checkin);
            if (checkout) params.append("checkout", checkout);
            if (guests) params.append("guests", guests.toString());
            if (params.toString()) {
               url += "?" + params.toString();
            }
            return { directUrl: url, instructions: "Present this URL to the guest so they can book directly. E.g [Check Availability on Nebula](url)" };
          }
        }),
        captureActionableLead: tool({
          description: 'Capture a lead and escalate to staff for airport transfers, conference/event inquiries, or serious complaints.',
          parameters: z.object({
            requestType: z.enum(['airport_transfer', 'conference_event', 'complaint', 'other']),
            guestName: z.string().optional(),
            guestContact: z.string().optional(),
            checkInDate: z.string().optional(),
            checkOutDate: z.string().optional(),
            guestCount: z.number().optional(),
            notes: z.string().describe('Detailed notes or summary of the request.'),
          }),
          // @ts-expect-error SDK Type mismatch for maxSteps tools
          execute: async (leadData: any) => {
            isEscalation = true;
            await payload.create({
              collection: 'leads',
              data: {
                conversation: currentConversationId,
                ...leadData,
              }
            });
            await payload.update({
              collection: 'conversations',
              id: currentConversationId,
              data: {
                status: 'PENDING_HUMAN',
                unreadForStaff: true,
                summary: 'Lead Captured: ' + leadData.notes,
              }
            });
            return {
              success: true,
              instructions: 'Acknowledge the escalation using exactly this phrasing: "I’ve shared this with our team. They’ll review and get back to you shortly. I can still help with other questions in the meantime. ✔ Message sent to hotel team"'
            };
          }
        })
      },
    });

    let finalResponse = text;

    const executeCaptureActionableLeadFallback = async (leadParams: any) => {
      isEscalation = true;
      try {
        await payload.create({
          collection: 'leads',
          data: {
            conversation: currentConversationId,
            requestType: leadParams.requestType || leadParams.lead_type || 'other',
            notes: typeof leadParams === 'string' ? leadParams : JSON.stringify(leadParams),
          }
        });
        await payload.update({
          collection: 'conversations',
          id: currentConversationId,
          data: { status: 'PENDING_HUMAN', unreadForStaff: true, summary: 'Lead Captured: ' + JSON.stringify(leadParams) }
        });
      } catch(e) {}
    };

    // HARDSCRABBLE FALLBACK: Keyword triggers
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('airport') || lowerMessage.includes('transfer') || lowerMessage.includes('conference') || lowerMessage.includes('event')) {
      if (!isEscalation) {
         await executeCaptureActionableLeadFallback({ requestType: lowerMessage.includes('airport') ? 'airport_transfer' : 'conference_event', notes: message });
      }
    }

    if (finalResponse) {
      if (finalResponse.includes('captureActionableLead') && !isEscalation) {
         await executeCaptureActionableLeadFallback({ requestType: 'other', notes: 'Escalated organically by AI.' });
      }
      const isNebula = finalResponse.includes('directToNebula');

      // Unconditionally wipe any technical leak tags/JSON without es2018 's' flag 
      finalResponse = finalResponse.replace(/<function[\s\S]*?<\/function>/gi, '');
      finalResponse = finalResponse.replace(/<function[\s\S]*?>/gi, '');
      finalResponse = finalResponse.replace(/```[\s\S]*?```/gi, '');
      // Strip any stray JSON blobs which contain standard tooling keys
      finalResponse = finalResponse.replace(/\{[\s\S]*?\}/gi, '');

      if (isEscalation && !finalResponse.includes('Message sent')) {
         finalResponse += "\n\nI’ve shared this with our team. They’ll review and get back to you shortly. I can still help with other questions in the meantime. ✔ Message sent to hotel team";
      }
      
      if (isNebula && !finalResponse.includes('nebulacrs.hti.app')) {
         finalResponse += `\n\n[Check Availability on our Bookings Page](https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370)`;
      }
    }

    // Default SDK tool check if it parsed it correctly natively
    if (!finalResponse.trim() && toolResults && toolResults.length > 0) {
      if (toolResults[0].toolName === 'captureActionableLead') {
        finalResponse = "I’ve shared this with our team. They’ll review and get back to you shortly. I can still help with other questions in the meantime. \n\n✔ Message sent to hotel team";
      } else if (toolResults[0].toolName === 'directToNebula') {
        finalResponse = `Let me guide you to our booking system where you can check live availability:\n\n[Check Availability on our Bookings Page](https://nebulacrs.hti.app/apollo3/mkangogolfview/#/hotel/370)`;
      }
    }

    if (!finalResponse.trim() && isEscalation) {
       finalResponse = "I have recorded your details and transferred them to our front desk. ✔ Message sent to hotel team";
    }

    if (!finalResponse.trim()) {
       finalResponse = "I have taken note of that. Is there anything else you need assistance with?";
    }

    await payload.create({
      collection: 'messages',
      data: {
        conversation: currentConversationId,
        senderType: 'ai',
        body: finalResponse,
      },
    });

    return NextResponse.json({
      reply: finalResponse,
      conversationId: currentConversationId,
      isEscalated: isEscalation,
    });

  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
