import { NextResponse } from "next/server";
import type { BookingPayload } from "@/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateReference = () => {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ZAM-${suffix}`;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingPayload;

    if (!payload.roomId || !payload.checkIn || !payload.checkOut) {
      return NextResponse.json(
        { message: "Missing booking details" },
        { status: 400 },
      );
    }

    if (!payload.guestName || !payload.guestEmail) {
      return NextResponse.json(
        { message: "Guest details required" },
        { status: 400 },
      );
    }

    if (payload.paymentMethod === "mobile_money" && !payload.mobileNumber) {
      return NextResponse.json(
        { message: "Mobile Money number required" },
        { status: 400 },
      );
    }

    await sleep(2500);

    const reference = generateReference();

    return NextResponse.json({
      status: "confirmed",
      reference,
      total: payload.totalAmount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Unable to process booking" },
      { status: 500 },
    );
  }
}
