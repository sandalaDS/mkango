import { create } from "zustand";
import type { Room } from "@/types";

const TAX_RATE = 0.12;

const toISODate = (date: Date) => date.toISOString().split("T")[0];

const defaultCheckInDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
};

const defaultCheckOutDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date;
};

const calculateNights = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Number.isNaN(nights) ? 1 : Math.max(1, nights);
};

const calculateTotal = (room: Room | undefined, nights: number) => {
  if (!room) return 0;
  const base = room.pricePerNightZMW * nights;
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
  totalAmount: number;
  setRoom: (room: Room) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuestName: (value: string) => void;
  setGuestEmail: (value: string) => void;
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
    totalAmount: 0,
    setRoom: (room) =>
      set((state) => ({
        selectedRoom: room,
        totalAmount: calculateTotal(room, state.nights),
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
          totalAmount: calculateTotal(state.selectedRoom, nights),
        };
      }),
    setGuestName: (guestName) => set(() => ({ guestName })),
    setGuestEmail: (guestEmail) => set(() => ({ guestEmail })),
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
          totalAmount: 0,
        };
      }),
  };
});

export const getCostBreakdown = (room: Room | undefined, nights: number) => {
  if (!room) {
    return { base: 0, taxes: 0, total: 0 };
  }
  const base = room.pricePerNightZMW * nights;
  const taxes = Math.round(base * TAX_RATE);
  return {
    base,
    taxes,
    total: base + taxes,
  };
};
