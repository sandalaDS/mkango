'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Message = {
  id: string;
  role: 'user' | 'ai' | 'system' | 'staff';
  content: string;
};

const renderMessageContent = (content: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline underline-offset-4 hover:opacity-80 transition"
      >
        {match[1]}
      </a>
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : content;
};

const SHORTCUTS = [
  "What are the room rates?",
  "Is breakfast included?",
  "Do you have a gym?",
  "Can I pay in US Dollars?",
];

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content:
        "Hello. Welcome to M'kango Golfview Hotel. I can help with room types, dining, facilities, and connect you with the reservations team.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationStatus, setConversationStatus] = useState<string>('AI_ACTIVE');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Polling for Staff Replies
  useEffect(() => {
    if (!conversationId) return;
    
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/demo/conversations/${conversationId}/messages?t=${Date.now()}`, {
          cache: 'no-store'
        });
        const data = await res.json();
        
        if (data.messages && data.messages.length > 0) {
           const mapped: Message[] = data.messages.map((m: any) => ({
             id: m.id || Math.random().toString(),
             role: m.senderType === 'guest' ? 'user' : (m.senderType === 'staff' ? 'staff' : 'ai'),
             content: m.body,
           }));
           
           setMessages(prev => {
              if (prev.length !== mapped.length) return mapped;
              return prev;
           });
        }
        if (data.status) {
           setConversationStatus(data.status);
        }
      } catch (e) {
         console.error('Polling error:', e);
      }
    }, 3000); // Polling every 3 seconds for demo reliability

    return () => clearInterval(interval);
  }, [conversationId]);

  const submitMessage = async (textToSubmit: string) => {
    if (!textToSubmit.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSubmit };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.content,
          conversationId,
        }),
      });

      const data = await res.json();

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      // We don't manually append the AI message here if we are polling, but polling might take 3s.
      // So we append it instantly for UX, polling will overwrite with same length/content next tick.
      if (data.reply) {
        setMessages((prev) => {
          // Prevent double mapping if polling already got it
          const alreadyExists = prev.some(m => m.content === data.reply);
          if (alreadyExists) return prev;
          return [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'ai',
              content: data.reply,
            },
          ];
        });
      }

      if (data.isEscalated) {
        setConversationStatus('PENDING_HUMAN');
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'system',
          content: 'Sorry, I am having trouble connecting right now.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  return (
    <div className="flex h-[550px] max-h-[80vh] w-[340px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-2xl ring-1 ring-black/5 md:w-[400px]">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0a3826] to-[#0f4d37] p-4 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 p-2 backdrop-blur-sm">
            <Image src="/logo/symbol-white.svg" alt="Logo" width={24} height={24} className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80">Guest Desk</p>
            <p className="text-sm font-semibold tracking-wide">M&apos;kango Golfview Hotel</p>
          </div>
        </div>
        <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl font-medium transition-colors hover:bg-white/20">&times;</button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8faf9] p-5">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-[#0f4d37] text-white rounded-2xl rounded-tr-sm shadow-[#0f4d37]/20 flex flex-col items-end text-left'
                  : m.role === 'system'
                    ? 'w-full bg-red-50 text-center text-xs text-red-600 rounded-2xl'
                    : m.role === 'staff'
                      ? 'bg-gradient-to-br from-amber-50 to-amber-100 text-slate-900 border border-amber-200 rounded-2xl rounded-tl-sm shadow-sm'
                      : 'border border-gray-100 bg-white text-gray-800 rounded-2xl rounded-tl-sm'
              }`}
            >
              <div className="w-full">
                {m.role === 'staff' && (
                  <div className="flex items-center gap-1.5 mb-1.5 opacity-80">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[9px] font-bold">M</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0f4d37]">Hotel Team</span>
                  </div>
                )}
                {m.role === 'ai' ? renderMessageContent(m.content) : m.content}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 1 && !isLoading && conversationStatus === 'AI_ACTIVE' && (
          <div className="mt-4 flex flex-wrap gap-2 px-1">
            {SHORTCUTS.map((shortcut) => (
              <button
                key={shortcut}
                onClick={() => submitMessage(shortcut)}
                className="rounded-full border border-[#0f4d37] bg-white px-3 py-1.5 text-xs text-[#0f4d37] shadow-sm transition hover:bg-[#0f4d37] hover:text-white"
              >
                {shortcut}
              </button>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
              <span className="delay-75 h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
              <span className="delay-150 h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {conversationStatus === 'PENDING_HUMAN' && (
        <div className="flex items-center justify-center gap-2 border-t border-amber-100 bg-[#fffbeb] py-2 text-[11px] font-medium text-amber-800">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-20"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
          </span>
          Waiting for hotel team response...
        </div>
      )}
      {conversationStatus === 'HUMAN_ACTIVE' && (
        <div className="flex items-center justify-center gap-2 border-t border-blue-200 bg-blue-50 py-2 text-[11px] font-medium text-blue-800 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)]">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          Hotel team is active in this chat
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-gray-100 bg-white p-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How can we help you today?"
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-[14px] outline-none transition-all placeholder:text-gray-400 focus:border-[#0f4d37]/30 focus:bg-white focus:ring-2 focus:ring-[#0f4d37]/10"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4d37] text-white shadow-md shadow-[#0f4d37]/20 transition-all hover:bg-[#0a3826] disabled:opacity-50 disabled:shadow-none"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>
      </form>
    </div>
  );
}
