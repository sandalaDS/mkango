import type { Room } from "@/types";

export const rooms: Room[] = [
  {
    id: "rm_presidential",
    title: "Presidential Manor Suite",
    slug: "presidential-manor-suite",
    pricePerNightZMW: 11100,
    pricePerNightUSD: 520,
    featuredImage:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Private plunge pool",
      "Terrace cinema",
      "Butler pantry",
    ],
    status: "available",
  },
  {
    id: "rm_savannah",
    title: "Savannah Panorama Loft",
    slug: "savannah-panorama-loft",
    pricePerNightZMW: 8100,
    pricePerNightUSD: 380,
    featuredImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Double-height salon",
      "Soaking tub",
      "Sunrise golf views",
    ],
    status: "available",
  },
  {
    id: "rm_garden",
    title: "Garden Veranda Suite",
    slug: "garden-veranda-suite",
    pricePerNightZMW: 6900,
    pricePerNightUSD: 320,
    featuredImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Private garden",
      "Outdoor rain shower",
      "Club privileges",
    ],
    status: "available",
  },
  {
    id: "rm_residency",
    title: "Residency Penthouse",
    slug: "residency-penthouse",
    pricePerNightZMW: 13400,
    pricePerNightUSD: 640,
    featuredImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80",
    amenities: [
      "Three bedrooms",
      "Chef's kitchen",
      "Members' lift access",
    ],
    status: "available",
  },
];

export const findRoomBySlug = (slug: string): Room | undefined =>
  rooms.find((room) => room.slug === slug);
