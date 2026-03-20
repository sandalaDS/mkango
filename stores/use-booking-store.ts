import { create } from "zustand";
import type { Room } from "@/types";

const TAX_RATE = 0.12;
const BREAKFAST_ZMW_PER_PERSON = 390;
const EXTRA_GUEST_BASE_ZMW = 150;

const toISODate = (date: Date) => date.toISOString().split("T")[0];

const defaultCheckInDate = () => new Date();

const defaultCheckOutDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

const calculateNights = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Number.isNaN(nights) ? 1 : Math.max(1, nights);
};

const calculateTotal = (room: Room | undefined, nights: number, guests: number = 1, includeBreakfast: boolean = false) => {
  if (!room) return 0;
  let basePerNight = room.pricePerNightZMW;
  if (guests > 1) {
    basePerNight += (EXTRA_GUEST_BASE_ZMW * (guests - 1));
  }
  const breakfast = includeBreakfast ? (BREAKFAST_ZMW_PER_PERSON * guests) : 0;
  const base = (basePerNight + breakfast) * nights;
  const taxes = base * TAX_RATE;
  return Math.round(base + taxes);
};

const deriveInitialDates = () => {
  const checkIn = toISODate(defaultCheckInDate());
  const checkOut = toISODate(defaultCheckOutDate());
  return {
    checkIn,
    checkOut,
    nights: calculateNights(checkIn, checkOut),
  };
};

type PaymentMethod = "card" | "mobile_money";
type PaymentNetwork = "mtn" | "airtel" | "zamtel";

type BookingState = {
  selectedRoom?: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  paymentMethod: PaymentMethod;
  paymentNetwork: PaymentNetwork;
  guestName: string;
  guestEmail: string;
  mobileNumber: string;
  guests: number;
  includeBreakfast: boolean;
  totalAmount: number;
  setRoom: (room: Room) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuestName: (value: string) => void;
  setGuestEmail: (value: string) => void;
  setGuests: (count: number) => void;
  setIncludeBreakfast: (include: boolean) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaymentNetwork: (network: PaymentNetwork) => void;
  setMobileNumber: (value: string) => void;
  reset: () => void;
};

export const useBookingStore = create<BookingState>((set) => {
  const initial = deriveInitialDates();
  return {
    selectedRoom: undefined,
    checkIn: initial.checkIn,
    checkOut: initial.checkOut,
    nights: initial.nights,
    paymentMethod: "card",
    paymentNetwork: "mtn",
    guestName: "",
    guestEmail: "",
    mobileNumber: "",
    guests: 1,
    includeBreakfast: false,
    totalAmount: 0,
    setRoom: (room) =>
      set((state) => ({
        selectedRoom: room,
        totalAmount: calculateTotal(room, state.nights, state.guests, state.includeBreakfast),
      })),
    setDates: (checkIn, checkOut) =>
      set((state) => {
        const normalizedCheckIn = checkIn || state.checkIn;
        const normalizedCheckOut = checkOut || state.checkOut;
        const nights = calculateNights(normalizedCheckIn, normalizedCheckOut);
        return {
          checkIn: normalizedCheckIn,
          checkOut: normalizedCheckOut,
          nights,
          totalAmount: calculateTotal(state.selectedRoom, nights, state.guests, state.includeBreakfast),
        };
      }),
    setGuestName: (guestName) => set(() => ({ guestName })),
    setGuestEmail: (guestEmail) => set(() => ({ guestEmail })),
    setGuests: (guests) => set((state) => ({ guests, totalAmount: calculateTotal(state.selectedRoom, state.nights, guests, state.includeBreakfast) })),
    setIncludeBreakfast: (includeBreakfast) => set((state) => ({ includeBreakfast, totalAmount: calculateTotal(state.selectedRoom, state.nights, state.guests, includeBreakfast) })),
    setPaymentMethod: (paymentMethod) => set(() => ({ paymentMethod })),
    setPaymentNetwork: (paymentNetwork) => set(() => ({ paymentNetwork })),
    setMobileNumber: (mobileNumber) => set(() => ({ mobileNumber })),
    reset: () =>
      set(() => {
        const fresh = deriveInitialDates();
        return {
          selectedRoom: undefined,
          checkIn: fresh.checkIn,
          checkOut: fresh.checkOut,
          nights: fresh.nights,
          paymentMethod: "card",
          paymentNetwork: "mtn",
          guestName: "",
          guestEmail: "",
          mobileNumber: "",
          guests: 1,
          includeBreakfast: false,
          totalAmount: 0,
        };
      }),
  };
});

export const getCostBreakdown = (room: Room | undefined, nights: number, guests: number = 1, includeBreakfast: boolean = false) => {
  if (!room) {
    return { base: 0, taxes: 0, total: 0 };
  }
  let basePerNight = room.pricePerNightZMW;
  if (guests > 1) {
    basePerNight += (EXTRA_GUEST_BASE_ZMW * (guests - 1));
  }
  const breakfast = includeBreakfast ? (BREAKFAST_ZMW_PER_PERSON * guests) : 0;
  const base = (basePerNight + breakfast) * nights;
  const taxes = Math.round(base * TAX_RATE);
  return {
    base,
    taxes,
    total: base + taxes,
  };
};
