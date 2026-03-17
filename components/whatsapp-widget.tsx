'use client';

import Link from "next/link";
import { useState } from "react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-72 rounded-3xl border border-black/10 bg-white/95 p-4 text-sm shadow-[0_45px_90px_rgba(15,61,46,0.18)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-fern)]">Concierge</p>
              <p className="text-base font-semibold">M&apos;kango Golfview</p>
            </div>
            <span className="text-xs text-black/60">06:00 - 23:00 CAT</span>
          </div>
          <p className="mt-3 text-black/70">
            Tell us when you plan to arrive and we will line up transfers, tee times, and dining.
          </p>
          <Link
            href="https://wa.me/260971000000"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-emerald-dark)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--color-emerald-deep)]"
          >
            Continue on WhatsApp
          </Link>
        </div>
      )}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="whatsapp-shadow flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-emerald-dark)] text-white transition hover:bg-[var(--color-emerald-deep)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
      >
        <span className="sr-only">Toggle WhatsApp concierge</span>
        <WhatsAppIcon />
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 0 0-7.67 13.62L3.5 21l4.54-.75A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3 8.4c-.2.6-.3 1.3.6 2.6s2.2 2.6 3.7 3.1c1.1.4 1.7.2 2.3-.2l.5-.3c.2-.1.4-.2.5 0l1 .6c.3.2.6.3.5.7-.1.4-.5 1.6-1.3 2.1-.6.4-1.3.5-2.2.3-2-.5-4.5-2-5.8-3.5s-2.2-3.4-2.3-4.7c0-.5.2-1 .4-1.4.4-.6.9-.8 1.2-.7l1 .4c.2.1.3.3.2.5l-.3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
