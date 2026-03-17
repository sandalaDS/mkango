'use client';

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  guest: string;
  stay: string;
};

type Props = {
  testimonials: Testimonial[];
  interval?: number;
};

export default function TestimonialsCarousel({
  testimonials,
  interval = 6000,
}: Props) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || testimonials.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, reduceMotion, testimonials.length]);

  const active = useMemo(() => testimonials[index], [index, testimonials]);

  const shift = (direction: "prev" | "next") => {
    setIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
      return (prev + 1) % testimonials.length;
    });
  };

  return (
    <div className="relative rounded-[32px] border border-black/10 bg-white/95 p-8 shadow-[0_35px_90px_rgba(15,61,46,0.08)]">
      <div aria-live="polite" className="space-y-6">
        <div className="text-[var(--color-gold)]">
          <StarRow />
        </div>
        <p className="text-2xl leading-snug text-black">{`"${active.quote}"`}</p>
        <div className="text-sm uppercase tracking-[0.3em] text-black/60">{active.guest}</div>
        <p className="text-sm text-black/70">{active.stay}</p>
      </div>
      <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.4em] text-black/60">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => shift("prev")}
            className="h-10 w-10 rounded-full border border-black/10 transition hover:border-black"
            aria-label="Show previous testimonial"
          >
            &larr;
          </button>
          <button
            onClick={() => shift("next")}
            className="h-10 w-10 rounded-full border border-black/10 transition hover:border-black"
            aria-label="Show next testimonial"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex gap-2 text-[var(--color-gold)]">
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="m12 3.5 2.5 5 5.5.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.5-.8z" />
        </svg>
      ))}
    </div>
  );
}
