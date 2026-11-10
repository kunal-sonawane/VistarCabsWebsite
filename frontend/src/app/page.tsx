import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Plane,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import InquiryForm from "@/components/InquiryForm";
import SiteFooter from "@/components/SiteFooter";
import FeedbackSlider from "@/components/FeedbackSlider";
import {
  CorporateHomeSection,
  KumbhHomeSection,
} from "@/components/HomeHighlights";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airports, cities, destinationGuides, routes, site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/", {
    title: "Vistar Cabs | Nashik Cab Enquiries Across Maharashtra",
    description:
      "Plan local, airport and intercity cab enquiries from Nashik across Maharashtra with Vistar Cabs.",
    alternates: { canonical: "/" },
  });
}

const faqs = [
  {
    q: "How do I enquire about a cab?",
    a: "Choose a trip type, add your pickup, destination, date and time, then share callback details. Vistar Cabs will contact you to discuss availability and fare.",
  },
  {
    q: "Can I request an airport pickup or drop?",
    a: "Yes. Select Airport, choose pickup or drop, and add flight or terminal details if available. Confirm the arrangement with the team before travel.",
  },
  {
    q: "Do I pay online on this website?",
    a: "No payment gateway is included. This website collects an enquiry; confirm trip details and payment arrangements directly with Vistar Cabs.",
  },
  {
    q: "Which cities can I explore?",
    a: "Browse pages for Nashik, Mumbai, Pune, Chhatrapati Sambhajinagar, Ahilyanagar and Shirdi. Ask the team to confirm availability for your exact pickup and route.",
  },
];
const journeys = [
  {
    title: "Outstation journeys",
    label: "Intercity · One way or return",
    text: "Start with your route and travel date. Add return plans and stops when you enquire.",
    image: "/images/services/outstation-cab-service.jpg",
    alt: "A road journey through the Sahyadri region",
    href: "/outstation-cab-service",
    tone: "from-[#061c35]/10 via-[#061c35]/45 to-[#061c35]/90",
  },
  {
    title: "Airport transfers",
    label: "Pickup · Drop · Flight details",
    text: "Share the airport, terminal, pickup time and flight number so the team can discuss your transfer.",
    image: "/images/services/airport-taxi.jpg",
    alt: "Airport terminal and passenger pickup area",
    href: "/airport-taxi",
    tone: "from-[#061c35]/5 via-[#061c35]/35 to-[#061c35]/90",
  },
  {
    title: "Local cab enquiries",
    label: "City trips · Multiple stops",
    text: "Tell us where you want to go and how long you expect to need the cab.",
    image: "/images/services/local-cab-service.jpg",
    alt: "City street scene for a local cab journey",
    href: "/local-cab-service",
    tone: "from-[#061c35]/10 via-[#061c35]/40 to-[#061c35]/90",
  },
];
const featuredGuides = [
  {
    city: "Nashik",
    name: "Trimbakeshwar",
    href: "/cities/nashik/trimbakeshwar",
    type: "Temple visit",
    text: "Plan a pickup, visit window and return timing.",
  },
  ...destinationGuides
    .filter((g) =>
      [
        "thane",
        "lonavala",
        "bhimashankar",
        "ellora-caves",
        "shani-shingnapur-route",
      ].includes(g.slug),
    )
    .map((g) => ({
      city: g.cityName,
      name: g.name,
      href: `/cities/${g.citySlug}/${g.slug}`,
      type: g.category,
      text: "Open the guide for stops and trip-planning notes.",
    })),
];

export default async function Home() {
  const replacement = await getManagedPageReplacement("/");
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  return (
    <main className="overflow-hidden bg-white">
      <section className="booking-hero relative overflow-hidden text-white">
        <Header />
        <div className="container-wide relative z-10 flex flex-col pb-6 pt-20 sm:pt-24 lg:pb-6 lg:pt-24">
          <div className="order-2 mx-auto mt-4 max-w-4xl text-center lg:order-2 lg:mx-0 lg:mt-4 lg:max-w-none lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#061c35]/30 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.17em] text-amber-100 backdrop-blur-sm">
              <Sparkles size={13} /> Nashik rooted · Maharashtra connected
            </span>
            <h1 className="mt-4 text-[clamp(1.8rem,3.1vw,2.8rem)] font-black leading-[1.05] tracking-[-.055em] lg:whitespace-nowrap">
              The road ahead starts{" "}
              <span className="text-amber-300">with Vistar Cabs.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base lg:mx-0">
              Local trips, airport transfers and journeys across Maharashtra.
              Share your plan and let the Vistar Cabs team call you back.
            </p>
          </div>
          <div
            id="book"
            aria-label="Quick trip enquiry"
            className="order-1 mx-auto w-full max-w-[1160px] lg:order-1 lg:mt-0"
          >
            <InquiryForm />
          </div>
          <div className="order-3 mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] font-bold text-white/85 sm:text-xs lg:mx-0 lg:justify-start">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-amber-300" /> Enquiry first
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-amber-300" /> Availability
              confirmed directly
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-amber-300" /> No online payment
            </span>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/20 bg-[#061c35]/20 backdrop-blur-sm">
          <div className="container-wide flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-3 text-[9px] font-extrabold uppercase tracking-[.15em] text-white/85 sm:justify-between">
            <span>OUTSTATION · AIRPORT · HOURLY · CORPORATE</span>
            <a
              href="#journeys"
              className="inline-flex items-center gap-1 text-amber-200"
            >
              Find your trip <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </section>

      <KumbhHomeSection />

      <section id="services" className="bg-[#f4f7fb] py-14 sm:py-20">
        <div className="container-wide">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-amber-700">A journey for every plan</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Pick the kind of trip.
                <br className="hidden sm:block" /> We’ll help plan the details.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Start with the journey type that fits. A website enquiry is a
              request for a callback, not an instant booking or confirmed fare.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {journeys.map((journey, i) => (
              <Link
                key={journey.href}
                href={journey.href}
                className="group relative isolate flex min-h-[340px] overflow-hidden rounded-[24px] bg-slate-800 text-white shadow-[0_16px_45px_rgba(8,33,58,.12)] sm:min-h-[390px]"
              >
                <Image
                  src={journey.image}
                  alt={journey.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-t ${journey.tone}`}
                />
                <span className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/15 text-sm font-black backdrop-blur">
                  0{i + 1}
                </span>
                <div className="mt-auto p-5 sm:p-6">
                  <span className="text-[10px] font-black uppercase tracking-[.16em] text-amber-200">
                    {journey.label}
                  </span>
                  <h3 className="mt-2 text-2xl font-black tracking-tight">
                    {journey.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-white/80">
                    {journey.text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black text-slate-900 transition group-hover:bg-amber-300">
                    Explore service <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CorporateHomeSection />

      <section id="cities" className="bg-[#071a2f] py-14 text-white sm:py-20">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-300">
                Your Maharashtra starts here
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Choose a city.
                <br className="hidden sm:block" />
                Find the trip that fits.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              City pages bring together local areas, airport links, nearby
              destinations and relevant routes.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cities.map((city, i) => {
              const photo =
                {
                  nashik: "/images/cities/nashik-ramkund-clear.jpg",
                  mumbai: "/images/cities/mumbai-gateway-taj.png",
                  pune: "/images/cities/pune-shaniwar-wada.png",
                  sambhajinagar: "/images/cities/sambhajinagar.jpg",
                  ahilyanagar: "/images/cities/ahilyanagar.jpg",
                  shirdi: "/images/cities/shirdi.jpg",
                }[city.slug] || "/images/cities/nashik-ramkund-clear.jpg";
              return (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="group relative isolate flex min-h-[220px] items-end overflow-hidden rounded-2xl border border-white/10 bg-slate-800 sm:min-h-[260px]"
                >
                  <Image
                    src={photo}
                    alt={`${city.name} cab journey`}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="-z-20 object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061326]/95 via-[#061326]/35 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-white/25 bg-black/15 px-3 py-1 text-[10px] font-black text-white/85 backdrop-blur">
                    0{i + 1}
                  </span>
                  <div className="p-5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                      Explore city
                    </p>
                    <h3 className="mt-1 text-xl font-black">{city.name}</h3>
                    <p className="mt-1 line-clamp-2 max-w-sm text-xs leading-5 text-white/75">
                      {city.detail}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold text-white">
                      Open city guide <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section id="airports" className="bg-[#f4f7fb] py-14 sm:py-20">
        <div className="container-wide">
          <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch">
            <div className="relative min-h-[330px] overflow-hidden rounded-[26px] bg-[#071a2f] text-white sm:min-h-[430px]">
              <Image
                src="/images/services/airport-taxi.jpg"
                alt="Cab waiting near an airport terminal"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/95 via-[#071a2f]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="eyebrow text-amber-300">Airport connections</p>
                <h2 className="mt-2 max-w-md text-3xl font-black tracking-tight sm:text-4xl">
                  Land, collect your plan, and go.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                  Include your flight, terminal and onward address. Confirm the
                  ground transfer details directly.
                </p>
                <Link
                  href="/airport-taxi"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2.5 text-xs font-black text-slate-950"
                >
                  Airport enquiry details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <p className="eyebrow text-amber-700">Choose your airport</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Six airport pages.
                  <br />
                  One clear enquiry.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                  Open the page for the airport you need. It lists the trip
                  details worth including so the team can discuss your request.
                </p>
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {airports.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/airports/${a.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-blue-200 hover:shadow-md"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                      <Plane size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-black">
                        {a.name}
                      </span>
                      <span className="mt-1 block text-[10px] text-slate-500">
                        {a.city} · {a.code}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-amber-700 transition group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="destinations" className="bg-white py-14 sm:py-20">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-700">
                Where will the road take you?
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Maharashtra, connected
                <br className="hidden sm:block" /> through local journeys.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Open a destination guide for useful places to consider, then tell
              us the exact pickup, stops and schedule.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGuides.map((place, i) => (
              <Link
                key={place.href}
                href={place.href}
                className="group flex min-h-[166px] items-end justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#f2f8ff] p-5 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                    {place.city} · {place.type}
                  </span>
                  <h3 className="mt-2 text-lg font-black">{place.name}</h3>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-600">
                    {place.text}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#0758c9] shadow-sm transition group-hover:bg-amber-300">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FeedbackSlider />
      <section id="routes" className="bg-[#071a2f] py-14 text-white sm:py-18">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-300">Popular connections</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Start from Nashik.
                <br className="hidden sm:block" /> Connect across the region.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-300">
              These route pages help you prepare an enquiry. Availability and
              journey details are confirmed directly.
            </p>
          </div>
          <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {routes.slice(0, 9).map((r) => (
              <Link
                href={`/${r.slug}`}
                key={r.slug}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[.04] p-4 transition hover:border-amber-300/50 hover:bg-white/[.09]"
              >
                <span>
                  <span className="block text-[10px] font-bold text-slate-400">
                    {r.note}
                  </span>
                  <span className="mt-1 block text-sm font-black">
                    {r.from} <span className="text-amber-400">→</span> {r.to}
                  </span>
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-amber-300 transition group-hover:translate-x-0.5"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-white py-14 sm:py-18">
        <div className="container-wide grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="relative mb-5 h-36 overflow-hidden rounded-2xl sm:h-44">
              <Image
                src="/images/faq.jpg"
                alt="Travel FAQ guide banner"
                fill
                sizes="(max-width: 1023px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow text-amber-700">Good to know</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              A few booking questions.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Have a different trip in mind? Share the details through the form
              and confirm arrangements with the team.
            </p>
            <a
              href="#book"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white"
            >
              Plan your journey <ArrowRight size={15} />
            </a>
          </div>
          <div className="divide-y divide-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">
                  <span>{f.q}</span>
                  <span className="text-xl text-amber-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ManagedPageContent path="/" />
      <SiteFooter />
    </main>
  );
}
