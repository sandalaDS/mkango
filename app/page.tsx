import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import BookRoomButton from "@/components/booking/book-room-button";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import WhatsAppWidget from "@/components/whatsapp-widget";
import Header from "@/components/header";
import { rooms as suiteInventory } from "@/data/rooms";

type IconComponent = () => ReactElement;

type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  Icon: IconComponent;
};

type ShowcaseRoom = {
  name: string;
  detail: string;
  rate: string;
  image: string;
  slug: string;
};

type FunctionStat = {
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

const showcaseRooms: ShowcaseRoom[] = suiteInventory.map((room) => ({
  name: room.title,
  detail: room.amenities.join(" · "),
  rate: `From $${room.pricePerNightUSD} / night`,
  image: room.featuredImage,
  slug: room.slug,
}));

const defaultCheckoutSlug =
  showcaseRooms[0]?.slug ?? suiteInventory[0]?.slug ?? "presidential-manor-suite";

const functionStats: FunctionStat[] = [
  {
    label: "Bespoke styling",
    detail: "Custom decor partnerships for tailored atmospheres.",
    Icon: FlagIcon,
  },
  {
    label: "Catering",
    detail: "Chef-curated menus for intimate or grand receptions.",
    Icon: ClocheIcon,
  },
  {
    label: "Event planning",
    detail: "Dedicated concierge for end-to-end coordination.",
    Icon: SwingIcon,
  },
  {
    label: "Multiple venues",
    detail: "From garden marquees to the 350-guest grand ballroom.",
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
    <div className="relative bg-[var(--color-canvas)] text-ink">
      <Header />

      <main>
        <section
          id="hero"
          className="relative flex h-screen min-h-[600px] w-full items-center justify-center overflow-hidden text-center text-white"
        >
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
            alt="Aerial view of M&apos;kango Hotel grounds"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 mt-16 flex w-full max-w-4xl flex-col items-center px-4">
            <p className="text-xs uppercase tracking-[0.45em] text-white/90 lg:text-sm">
              A manor for stays and elevated functions
            </p>
            <h2 className="mt-8 font-serif text-6xl leading-[1.05] text-[var(--color-gold)] sm:text-8xl lg:text-[9rem]">
              M&apos;kango
            </h2>
            <p className="mt-8 max-w-2xl text-base text-white/90 lg:text-xl">
              Suites open to lush landscapes, bespoke functions unfold in light-filled salons, all orchestrated through a 24/7 WhatsApp concierge.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link
                href="/checkout"
                className="rounded-none bg-[var(--color-gold)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-emerald-deep)] transition hover:bg-white hover:text-[var(--color-ink)]"
              >
                Book a Stay
              </Link>
              <Link
                href="#experiences"
                className="rounded-none border border-white/50 bg-black/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--color-ink)]"
              >
                Explore the Resort
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="scroll-indicator text-[11px] text-white">Scroll</div>
          </div>
        </section>

        <div className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-24 px-4 pb-24 sm:px-6 lg:mt-32 lg:gap-32 lg:px-10">

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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseRooms.map((room) => (
                <article
                  key={room.slug}
                  className="group relative flex flex-col rounded-[32px] border border-black/5 bg-white shadow-[0_25px_80px_rgba(15,61,46,0.06)] transition hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-fern)]">
                          Suite
                        </p>
                        <h3 className="text-2xl">{room.name}</h3>
                      </div>
                      <p className="text-base text-black/70">{room.detail}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-semibold">{room.rate}</span>
                      <BookRoomButton slug={room.slug} label="Book this suite" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="functions"
            className="grid gap-10 rounded-[40px] border border-black/5 bg-white/70 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-14"
          >
            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-fern)]">
                Functions
              </p>
              <h2 className="text-4xl leading-tight">
                A bespoke layout of typography and imagery, setting the stage for unforgettable events.
              </h2>
              <p className="text-lg text-black/70">
                Designed for exclusive weddings, corporate residencies, and celebratory dinners, our spaces adapt to your vision with seamless elegance. Stats are paired with custom minimalist line illustrations for tactile clarity.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {functionStats.map((stat) => (
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
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                alt="Elegant function space"
                fill
                className="object-cover brightness-[0.9]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute bottom-6 left-6 rounded-3xl bg-white/80 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-emerald-deep)]">
                Curated spaces, unforgettable moments
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
                <h2 className="mt-6 text-4xl lg:text-5xl text-white">Dining with a View</h2>
                <p className="mt-4 max-w-2xl text-lg text-white/80">
                  A full-width visual with fade reveal animation as guests scroll. Chef
                  Kamo&apos;s seasonal tasting, fire-to-table braais, and a champagne cart
                  gliding between tables.
                </p>
              </div>
              <Link
                href="/checkout"
                className="flex w-fit items-center gap-3 rounded-none border border-white/50 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition hover:border-white"
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
                    <button aria-label="Previous week" className="h-9 w-9 rounded-none border border-white/30">
                      &larr;
                    </button>
                    <button aria-label="Next week" className="h-9 w-9 rounded-none border border-white/30">
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
                        className={`mt-1 h-1.5 w-1.5 rounded-none ${
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
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <BookRoomButton
                      slug={defaultCheckoutSlug}
                      variant="primary"
                      label="Launch Checkout Demo"
                      fullWidth
                    />
                  </div>
                  <Link
                    href="https://wa.me/260971000000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full flex-1 items-center justify-center rounded-none border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
                  >
                    Reserve with Concierge
                  </Link>
                </div>
              </div>
            </div>
          </section>
        <footer
          id="footer"
          className="grid gap-8 rounded-[36px] border border-black/5 bg-white/80 p-10 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-none border border-black/10">
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
                  className="flex h-11 w-11 items-center justify-center rounded-none border border-black/10 transition hover:border-black hover:translate-y-[-2px]"
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
      </main>
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

