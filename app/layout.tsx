import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M'kango Golfview Hotel | Luxury Golf Resort in Lusaka",
  description:
    "Discover the editorial, five-star experience at M'kango Golfview Hotel—rooms, dining, golf, and concierge moments overlooking Lusaka's serene greens.",
  keywords: [
    "Mkango Golfview Hotel",
    "luxury hotel Lusaka",
    "golf resort Zambia",
    "five star hotel Zambia",
  ],
  authors: [{ name: "M'kango Hospitality" }],
  metadataBase: new URL("https://mkango.local"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
