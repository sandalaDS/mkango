import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import WhatsAppWidget from "@/components/whatsapp-widget";

type IconComponent = () => ReactElement;

type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  Icon: IconComponent;
};

type Room = {
  name: string;
  detail: string;
  rate: string;
  image: string;
};

type GolfStat = {
  label: string;
  detail: string;
  Icon: IconComponent;
};

const navPrimary = [
  { label: "Home", href: "#hero" },
  { label: "Rooms & Suites", href: "#rooms" },
  { label: "Dining", href: "#dining" },
];

const navSecondary = [
  { label: "Functions", href: "#functions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#footer" },
];

const experiences: Experience[] = [
  {
    id: "stay",
    title: "Stay",
    description:
      "38 suites framed in teak, linen, and custom art. Butler-light service anticipates every detail from pillow menus to terrace turndowns.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    cta: "Discover the suites",
    Icon: KeyIcon,
  },
  {
    id: "functions",
    title: "Functions",
    description:
      "Garden weddings, ballroom conferences, and corporate retreats styled with bespoke decor and concierge-run itineraries.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    cta: "Plan an event",
    Icon: FlagIcon,
  },
  {
    id: "dining",
    title: "Dining",
    description:
      "Chef-driven menus pairing Zambian terroir with Mediterranean restraint inside a glasshouse overlooking the 9th green.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    cta: "Book a table",
    Icon: ClocheIcon,
  },
];

const rooms: Room[] = [
  {
    name: "Presidential Manor Suite",
    detail: "Private plunge pool - Terrace cinema - Butler pantry",
    rate: "From $520 / night",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Savannah Panorama Loft",
    detail: "Double-height salon - Soaking tub - Sunrise golf views",
    rate: "From $380 / night",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Garden Veranda Suite",
    detail: "Private garden - Outdoor rain shower - Club privileges",
    rate: "From $320 / night",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Residency Penthouse",
    detail: "Three bedrooms - Chef's kitchen - Members' lift access",
    rate: "From $640 / night",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
  },
];

const golfStats: GolfStat[] = [
  {
    label: "18-hole course",
    detail: "Par 72, dusk-lit back nine with River Chongwe breezes.",
    Icon: FlagIcon,
  },
  {
    label: "Pro shop",
    detail: "Custom fittings, rental sets, and limited collab apparel.",
    Icon: TeeIcon,
  },
  {
    label: "Lessons",
    detail: "PGA pros on rotation with short-game clinics weekly.",
    Icon: SwingIcon,
  },
  {
    label: "Clubhouse dining",
    detail: "Sunken fireplace lounge & champagne Sunday brunch.",
    Icon: ClubhouseIcon,
  },
];

const testimonials = [
  {
    quote:
      "From the WhatsApp concierge to the twilight tee time, every moment felt orchestrated just for us.",
    guest: "Nandi & Emmanuel, Nairobi",
    stay: "Three-night golf & gastronomy stay",
  },
  {
    quote:
      "Suites open to birdsong and mist over the greens. The team anticipated our needs with a graceful calm.",
    guest: "Isabella M., London",
    stay: "Residency Penthouse",
  },
  {
    quote:
      "We hosted a 60-guest celebration and the culinary pacing rivaled Michelin dining in Paris.",
    guest: "Chileshe & Patrick, Lusaka",
    stay: "Wedding weekend buyout",
  },
];

const galleryShots = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
];

const availabilityPreview = [
  { day: 7, status: "available" },
  { day: 8, status: "available" },
  { day: 9, status: "limited" },
  { day: 10, status: "available" },
  { day: 11, status: "waitlist" },
  { day: 12, status: "available" },
  { day: 13, status: "available" },
  { day: 14, status: "limited" },
  { day: 15, status: "available" },
  { day: 16, status: "limited" },
  { day: 17, status: "available" },
  { day: 18, status: "available" },
  { day: 19, status: "waitlist" },
  { day: 20, status: "available" },
];

const footerColumns = [
  {
    title: "Hotel",
    links: ["About", "Press", "Membership"],
  },
  {
    title: "Rooms",
    links: ["Suites", "Residences", "Offers"],
  },
  {
    title: "Golf",
    links: ["Course", "Academy", "Events"],
  },
  {
    title: "Dining",
    links: ["Restaurant", "Lounge", "Private Dining"],
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Pinterest", href: "https://pinterest.com", Icon: PinterestIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
];

export default function Home() {
  return (
    <div className="relative bg-canvas text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col gap-14 px-4 pb-24 pt-6 sm:px-6 lg:px-10">
        <header className="sticky top-4 z-40 rounded-full border border-white/35 bg-[#0a2318]/70 px-6 py-4 text-white shadow-[0_30px_90px_rgba(4,15,8,0.45)] backdrop-blur-2xl">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
            <nav className="hidden items-center justify-start gap-6 text-[11px] font-medium uppercase tracking-[0.25em] lg:flex">
              {navPrimary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/10 text-2xl font-semibold tracking-[0.35em]">
                M&apos;G
              </div>
              <span className="text-[11px] uppercase tracking-[0.6em] text-white/80">
                M&apos;kango Golfview
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              <nav className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.25em] md:flex">
                {navSecondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-[var(--color-gold)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="#functions"
                className="hidden rounded-full border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] md:inline-flex"
              >
                Plan Functions
              </Link>
              <Link
                href="#booking"
                className="rounded-full bg-[var(--color-gold)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-emerald-deep)] transition hover:bg-[#d6b77f]"
              >
                Book Now
              </Link>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-24 lg:gap-32">
          <section
            id="hero"
            className="relative isolate left-1/2 w-screen -translate-x-1/2 min-h-screen overflow-hidden bg-[var(--color-emerald-deep)] text-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
              alt="Aerial view of M&apos;kango Golfview Hotel grounds"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#031207]/90 via-[#0c2c1d]/70 to-[#021006]/80" />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pb-16 pt-32 sm:px-6 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:gap-12">
                  <div className="rounded-[40px] bg-white/95 p-8 text-[var(--color-emerald-deep)] shadow-[0_45px_120px_rgba(7,23,14,0.28)] sm:p-10">
                    <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-fern)]">
                      A manor for stays, golf, and elevated functions
                    </p>
                    <h1 className="mt-6 font-serif text-4xl leading-[1.08] text-[var(--color-emerald-deep)] sm:text-5xl lg:text-[4.75rem] lg:leading-[1.05]">
                      M&apos;kango Golfview Hotel
                    </h1>
                    <p className="mt-5 max-w-3xl text-base text-[var(--color-emerald-deep)]/80 lg:text-xl">
                      Suites spill onto the greens, bespoke weddings and conferences unfold in light-filled salons, and every transfer is orchestrated through a 24/7 WhatsApp concierge.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="#booking"
                        className="rounded-full bg-[var(--color-emerald-deep)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#14563f]"
                      >
                        Book a Stay
                      </Link>
                      <Link
                        href="#experiences"
                        className="rounded-full border border-[var(--color-emerald-deep)]/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-emerald-deep)] transition hover:border-[var(--color-emerald-deep)] hover:bg-[var(--color-emerald-deep)]/5"
                      >
                        Explore the Resort
                      </Link>
                    </div>
                  </div>
                  <div className="rounded-[40px] border border-white/25 bg-[#0a2215]/85 p-8 text-sm text-white/85 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]">
                      Concierge composition
                    </p>
                    <p className="mt-4 text-base text-white/90">
                      78 keys, 6 villas, and 5 event salons staged for editorial conferences, moonlit weddings, and player residencies above Lusaka&apos;s treetops.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 text-white">
                      <div>
                        <p className="text-4xl font-semibold">24/7</p>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                          WhatsApp concierge
                        </p>
                      </div>
                      <div>
                        <p className="text-4xl font-semibold">18</p>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                          Championship holes
                        </p>
                      </div>
                      <div>
                        <p className="text-4xl font-semibold">350</p>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                          Guest ballroom
                        </p>
                      </div>
                      <div>
                        <p className="text-4xl font-semibold">3</p>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                          Signature dining rooms
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
                  <span className="uppercase tracking-[0.45em]">
                    Suites &bull; Golf &bull; Dining &bull; Bespoke functions
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-16 bg-white/60" />
                    <div className="scroll-indicator text-[11px]">Scroll</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="experiences"
            className="space-y-10 rounded-[36px] border border-black/5 bg-white/80 p-8 shadow-[0_40px_120px_rgba(15,61,46,0.08)] lg:p-12"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-fern)]">
                  Experience Preview
                </p>
                <h2 className="text-3xl lg:text-4xl">
                  An editorial glimpse into stay, functions, and gastronomy.
                </h2>
              </div>
              <p className="max-w-xl text-base text-black/70">
                Each vignette layers photography with custom line icons and hover reveals,
                echoing Maison Mastrorelli&apos;s pacing yet grounded in Zambian light.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {experiences.map((experience) => (
                <article
                  id={experience.id}
                  key={experience.id}
                  className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] border border-black/5 bg-white/60"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, 100vw"
                    />
                  </div>
                  <div className="relative space-y-4 p-6">
                    <div className="flex items-center gap-3 text-[var(--color-emerald-dark)]">
                      <experience.Icon />
                      <span className="text-sm uppercase tracking-[0.25em]">
                        {experience.title}
                      </span>
                    </div>
                    <p className="text-base text-black/70">{experience.description}</p>
                    <button className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-emerald-dark)]">
                      {experience.cta}
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-emerald-dark)] transition group-hover:bg-[var(--color-emerald-dark)] group-hover:text-white"
                      >
                        &rarr;
                      </span>
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/85 opacity-0 transition group-hover:opacity-100" />
                </article>
              ))}
            </div>
          </section>

          <section id="rooms" className="space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Rooms & Suites
              </p>
              <h2 className="text-3xl lg:text-4xl">
                Horizontal gallery of residences curated for serenity.
              </h2>
            </div>
            <div className="-mx-4 overflow-x-auto px-4">
              <div className="flex gap-6 pb-4 snap-x snap-mandatory">
                {rooms.map((room) => (
                  <article
                    key={room.name}
                    className="group relative min-w-[280px] flex-1 snap-start rounded-[32px] border border-black/5 bg-white shadow-[0_25px_80px_rgba(15,61,46,0.06)] transition hover:-translate-y-2 md:min-w-[360px]"
                  >
                    <div className="relative h-64 overflow-hidden rounded-[32px]">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-105"
                        sizes="(min-width: 1024px) 360px, 80vw"
                      />
                    </div>
                    <div className="space-y-3 p-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-fern)]">
                          Suite
                        </p>
                        <h3 className="text-2xl">{room.name}</h3>
                      </div>
                      <p className="text-base text-black/70">{room.detail}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{room.rate}</span>
                        <button className="rounded-full border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-black hover:bg-black hover:text-white">
                          View Room
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="golf"
            className="grid gap-10 rounded-[40px] border border-black/5 bg-white/70 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-14"
          >
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Golf Experience
              </p>
              <h2 className="text-4xl leading-tight">
                A split layout of typography and imagery, narrating the course&apos;s rituals.
              </h2>
              <p className="text-lg text-black/70">
                Designed for dawn practices and sunset finishes, the course winds around
                indigenous flora with caddies trained in storytelling. Stats are paired
                with custom minimalist line illustrations for tactile clarity.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {golfStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-black/10 bg-white/80 p-5 shadow-[0_20px_45px_rgba(15,61,46,0.05)]"
                  >
                    <div className="mb-3 flex items-center gap-3 text-[var(--color-emerald-dark)]">
                      <stat.Icon />
                      <span className="text-xs uppercase tracking-[0.25em]">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-sm text-black/70">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[40px]">
              <Image
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
                alt="Golfer on emerald fairway"
                fill
                className="object-cover brightness-[0.9]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="golf-grid absolute inset-0 opacity-80" />
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-emerald-deep)]">
                Parallax fairways, curated foursomes
              </div>
            </div>
          </section>

          <section
            id="dining"
            className="relative overflow-hidden rounded-[48px] border border-black/5"
          >
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1900&q=80"
              alt="Dining terrace overlooking the course"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="relative z-10 flex min-h-[520px] flex-col justify-between px-10 py-14 text-white lg:px-20 lg:py-20">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]">
                  Dining & Lounge
                </p>
                <h2 className="mt-6 text-4xl lg:text-5xl">Dining with a View</h2>
                <p className="mt-4 max-w-2xl text-lg text-white/80">
                  A full-width visual with fade reveal animation as guests scroll. Chef
                  Kamo&apos;s seasonal tasting, fire-to-table braais, and a champagne cart
                  gliding between tables.
                </p>
              </div>
              <Link
                href="#booking"
                className="flex w-fit items-center gap-3 rounded-full border border-white/50 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition hover:border-white"
              >
                Explore the Restaurant
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </section>

          <section id="gallery" className="space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Gallery
              </p>
              <h2 className="text-3xl">Editorial cuts from dawn to midnight.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryShots.map((src, index) => (
                <div
                  key={src}
                  className={`relative aspect-[3/4] overflow-hidden rounded-[28px] border border-black/5 ${
                    index % 2 === 0 ? "lg:translate-y-8" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt="Gallery capture from the resort"
                    fill
                    className="object-cover transition duration-700 ease-out hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-10 rounded-[40px] border border-black/5 bg-white/90 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Testimonials
              </p>
              <h2 className="text-4xl">Sentiments in an editorial carousel.</h2>
              <p className="text-base text-black/70">
                Subtle quote marks, elegant type, and star icons. Auto-play respects
                prefers-reduced-motion, while controls maintain focus states.
              </p>
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
            <div className="rounded-[32px] border border-black/5 bg-white/80 p-8 shadow-[0_50px_120px_rgba(15,61,46,0.08)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Booking Prompt
              </p>
              <h3 className="mt-4 text-3xl">Plan Your Stay</h3>
              <p className="mt-2 text-base text-black/70">
                WhatsApp our concierge or reserve directly. The availability calendar
                previews low inventory nights in real time.
              </p>
              <div
                id="booking"
                className="mt-8 rounded-[28px] bg-[var(--color-emerald-deep)]/95 p-6 text-white"
              >
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-white/70">
                  <span>April 2026</span>
                  <div className="flex gap-3 text-white">
                    <button aria-label="Previous week" className="h-9 w-9 rounded-full border border-white/30">
                      &larr;
                    </button>
                    <button aria-label="Next week" className="h-9 w-9 rounded-full border border-white/30">
                      &rarr;
                    </button>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-white/70">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-2 text-center">
                  {availabilityPreview.map((item) => (
                    <div
                      key={item.day}
                      className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/20 text-sm font-semibold"
                    >
                      {item.day}
                      <span
                        className={`mt-1 h-1.5 w-1.5 rounded-full ${
                          item.status === "available"
                            ? "bg-[var(--color-gold)]"
                            : item.status === "limited"
                              ? "bg-[#ffb347]"
                              : "bg-[#ff6b6b]"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/70">
                  Limited nights flagged in amber. Waitlist nights in coral.
                </p>
                <Link
                  href="https://wa.me/260971000000"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-emerald-deep)] transition hover:bg-white/90"
                >
                  Reserve with Concierge
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer
          id="footer"
          className="mt-12 grid gap-8 rounded-[36px] border border-black/5 bg-white/80 p-10 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10">
                <span className="text-lg font-semibold">M&apos;G</span>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-black/60">
                Five-star mid-sized hotel in Lusaka, Zambia
              </p>
            </div>
            <p>
              +260 977 000 000
              <br />
              reservations@mkango.co.zm
              <br />
              Plot 34, Great East Road, Lusaka
            </p>
            <div className="flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:border-black hover:translate-y-[-2px]"
                >
                  <Icon />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.3em] text-black/60">
                  {column.title}
                </h4>
                <ul className="space-y-2 text-sm text-black/70">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="transition hover:text-black">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </footer>
      </div>
      <WhatsAppWidget />
    </div>
  );
}

function KeyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.2 14.2L23 23M20 23L23 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M7 4v20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 5c4-2 7 2 11 0v8c-4 2-7-2-11 0V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClocheIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M5 18h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 18a6 6 0 1 1 12 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

function TeeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle
        cx="14"
        cy="8"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 12v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SwingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M9 21c1.5-4.5 3.5-9 9-14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ClubhouseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M6 18V9l8-5 8 5v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M11.5 16.5c-.5-2 1-4 .5-6-1-3-5-1.5-4 1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 11v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <path
        d="M12 16v-3c0-2 3-2 3 0v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

