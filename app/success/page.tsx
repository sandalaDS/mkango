import SuccessReceipt from "@/components/checkout/success-receipt";
import { findRoomBySlug } from "@/data/rooms";

const fallbackCheckIn = new Date().toISOString().split("T")[0];
const fallbackCheckOut = new Date(Date.now() + 2 * 86_400_000)
  .toISOString()
  .split("T")[0];

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;
  const slug = typeof params.room === "string" ? params.room : undefined;
  const reference = typeof params.ref === "string" ? params.ref : "ZAM-8842";
  const checkIn = typeof params.checkIn === "string" ? params.checkIn : fallbackCheckIn;
  const checkOut = typeof params.checkOut === "string" ? params.checkOut : fallbackCheckOut;
  const nightsRaw = params.nights ? Number(params.nights) : 2;
  const totalRaw = params.total ? Number(params.total) : undefined;
  const guest = typeof params.guest === "string" ? params.guest : "Lead Guest";
  const room = slug ? findRoomBySlug(slug) : undefined;

  const fallbackTotal = room
    ? room.pricePerNightZMW * (Number.isNaN(nightsRaw) ? 2 : nightsRaw)
    : 0;

  return (
    <SuccessReceipt
      reference={reference}
      room={room}
      checkIn={checkIn}
      checkOut={checkOut}
      nights={Number.isNaN(nightsRaw) ? 2 : nightsRaw}
      guest={guest}
      total={
        totalRaw && !Number.isNaN(totalRaw)
          ? totalRaw
          : Math.round(fallbackTotal * 1.12)
      }
    />
  );
};

export default SuccessPage;
