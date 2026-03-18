"use client";

import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";
import { useBookingStore } from "@/stores/use-booking-store";

const styles = {
  primary:
    "inline-flex items-center justify-center rounded-none bg-[var(--color-emerald-dark)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_rgba(15,61,46,0.35)] transition hover:bg-[#124533]",
  outline:
    "inline-flex items-center justify-center rounded-none border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:border-black hover:bg-black hover:text-white",
};

type BookRoomButtonProps = {
  slug: string;
  label?: string;
  variant?: keyof typeof styles;
  fullWidth?: boolean;
};

const BookRoomButton = ({
  slug,
  label = "Book Room",
  variant = "outline",
  fullWidth = false,
}: BookRoomButtonProps) => {
  const router = useRouter();
  const setRoom = useBookingStore((state) => state.setRoom);
  const disabled = !slug;

  const handleClick = () => {
    if (disabled) return;
    const selected = rooms.find((room) => room.slug === slug);
    if (selected) {
      setRoom(selected);
    }
    router.push(`/checkout?room=${slug}`);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${styles[variant]} ${fullWidth ? "w-full" : ""} ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default BookRoomButton;
