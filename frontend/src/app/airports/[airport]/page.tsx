import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Plane,
  Clock3,
  MapPin,
} from "lucide-react";
import Header from "@/components/Header";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airportEditorialContent, airports, cities, routes } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type Props = { params: Promise<{ airport: string }> };
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { airport } = await params;
  const a = airports.find((item) => item.slug === airport);
  if (!a) return {};
  const path = `/airports/${a.slug}`;
  const fallback: Metadata = {
    title: `${a.name} Cab Enquiries`,
    description: `Plan a cab enquiry for ${a.name}. Share your flight, pickup and destination details; confirm availability directly with Vistar Cabs.`,
    alternates: { canonical: path },
    openGraph: {
      title: `${a.name} Cab Enquiries | Vistar Cabs`,
      description: a.description,
    },
  };
  return metadataWithSeoOverride(path, fallback);
}
export default async function AirportPage({ params }: Props) {
  const { airport } = await params;
  const a = airports.find((item) => item.slug === airport);
  if (!a) notFound();
  const pagePath = `/airports/${a.slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  const city = cities.find((c) => c.name === a.city);
  const airportContext = airportEditorialContent[a.slug];
  const cityRoutes = routes
    .filter((r) => r.from === a.city || r.to === a.city)
    .slice(0, 6);
  const airportPlanOptions = [
    {
      title: `Pickup at ${a.name}`,
      copy: `For an arrival pickup, share your flight number, scheduled landing time, terminal or meeting point, passenger count and the address you are travelling to after leaving ${a.name}.`,
    },
    {
      title: `Drop-off at ${a.name}`,
      copy: `For a departure, provide your full pickup address, flight departure time and terminal at ${a.name}. Ask the team to confirm the pickup plan and allow a suitable traffic buffer.`,
    },
    {
      title: `Continue from ${a.city}`,
      copy: `If the airport is one part of a longer journey, include your onward city or destination, any intermediate stops and whether you need a return trip.`,
    },
    {
      title: "Passengers and baggage",
      copy: "Mention how many people are travelling, the amount of luggage and any mobility or child-seat requirements. The team can confirm whether an appropriate vehicle is available.",
    },
  ];
  const airportFaq = [
    {
      q: `What should I include in a ${a.name} pickup request?`,
      a: "Add the flight number, scheduled arrival, terminal or agreed meeting point, passenger count, luggage and your onward address. Confirm the airport's current pickup instructions separately.",
    },
    {
      q: `What should I share for a drop-off at ${a.name}?`,
      a: "Give your complete pickup address, flight departure time, terminal and preferred pickup time. Allow a suitable buffer for traffic and ask Vistar Cabs to confirm the pickup arrangement.",
    },
    {
      q: "Can I request an airport cab for another city or a return trip?",
      a: "Yes, include the origin, destination, date, return requirement and any stops. Vistar Cabs will review the full itinerary and confirm if it can be arranged.",
    },
    {
      q: "Does sending this form confirm an airport cab?",
      a: "No. It sends an enquiry and opens WhatsApp with the trip details ready. Press Send in WhatsApp, then wait for Vistar Cabs to confirm the vehicle, fare, pickup point and any waiting terms.",
    },
  ];
  const airportNarrative = [
    {
      heading: `Cab and taxi service to or from ${a.name}`,
      paragraphs: [
        `${a.description} A useful ${a.city} airport cab request begins with the exact airport named on your ticket, the direction of travel and the complete address at the other end. If you are travelling to a hotel, home, office, railway station or a different city, write that destination explicitly. Airport names and pickup locations can be easy to confuse, especially when a region has more than one airport, so check the airline itinerary before submitting the request.`,
        `A transfer can be the first leg of a longer itinerary or the final ride before a flight. Include your date, flight number, scheduled arrival or departure, number of passengers and the amount of luggage. If the journey includes another passenger pickup, a station, a meal stop or an outstation destination, list every stop in order. The team needs the full plan to discuss a suitable vehicle and timing; the online form does not confirm a live booking or guarantee a particular fare.`,
      ],
    },
    {
      heading: `Planning an arrival pickup at ${a.name}`,
      paragraphs: [
        `For an arriving flight, share the flight number and scheduled landing time, terminal information shown by the airline, passenger count and a clear onward address. Ask Vistar Cabs to confirm the agreed meeting point, how to contact the driver and whether any waiting time or parking terms apply. Flight schedules can change, and airport pickup procedures may vary, so check current airline and airport guidance close to your travel date.`,
        `If you are meeting a family member or colleague, make sure they know where the pickup will happen and how to contact the person arranging the cab. For a transfer to another city or a pilgrimage destination, provide the final address rather than leaving the destination as a broad city name. Mention mobility needs, child passengers or bulky luggage when you enquire so the team can check whether an appropriate vehicle is available.`,
      ],
    },
    {
      heading: `Planning a departure drop at ${a.name}`,
      paragraphs: [
        `For a departure, provide your home, hotel or office address, the flight time and terminal, and when you would like to leave. The time needed to cross ${a.city} depends on the pickup area, traffic and road conditions, so build in a buffer for your own airline check-in and security requirements. Ask the team to confirm the pickup window and the complete fare before you rely on the arrangement.`,
        `A scheduled drop may include more than one passenger pickup or a stop to collect luggage. Add those details when sending the request, because they can affect both the route and the time required. Verify terminal information and airline updates independently, and keep your booking or flight reference available if the team needs to clarify the airport location.`,
      ],
    },
    {
      heading: `${a.city} connections and onward road travel`,
      paragraphs: [
        `Travellers may continue from ${a.name} to a neighbourhood in ${a.city}, a railway station, a business address, a temple area or another Maharashtra city. State whether you want a direct transfer, a return journey or a trip with agreed stops. ${cityRoutes.length ? `Related road routes include ${cityRoutes.map((route) => `${route.from} to ${route.to}`).join(", ")}.` : `For an onward road journey, provide the exact destination and any planned stops.`} A route name alone is not enough to confirm the trip: share the actual start and end addresses, travel date and preferred time.`,
        `${airportContext?.intro ?? "Airport travel needs a clear meeting point, flight schedule and onward address."} Check the current travel and visitor instructions for any destination you plan to visit. For temples, heritage sites or private venues, entry, opening hours and parking are managed separately by the relevant authority. A cab enquiry can discuss transport to a named destination, but it does not include tickets, venue reservations or guaranteed access.`,
      ],
    },
    {
      heading: `How to enquire for a ${a.name} taxi`,
      paragraphs: [
        `Complete the trip form with your origin, destination, travel date, preferred time and callback mobile number. Add flight and terminal details when available, and use the notes or follow-up to explain any return journey, additional passenger pickup or long-distance connection. If your flight or onward appointment is time-sensitive, say so clearly. These details help the team review the request and discuss a practical plan.`,
        `Submitting the form saves an enquiry and opens WhatsApp with the trip information prepared. Press Send in WhatsApp to deliver that message to Vistar Cabs. Until you receive direct confirmation, treat the request as pending: confirm availability, vehicle, total fare, meeting point, waiting, toll and cancellation terms before making travel decisions that depend on the transfer.`,
      ],
    },
  ];
  const airportPhoto: Record<string, string> = {
    "nashik-ozar": "/images/airports/nashik-ozar.jpg",
    "mumbai-csmia": "/images/airports/mumbai-csmia.jpg",
    "navi-mumbai-airport": "/images/airports/navi-mumbai-airport.jpg",
    "pune-airport": "/images/airports/pune-airport.jpg",
    "sambhajinagar-airport": "/images/airports/sambhajinagar-airport.jpg",
    "shirdi-airport": "/images/airports/shirdi-airport.jpg",
  };
  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate min-h-[440px] overflow-hidden text-white sm:min-h-[490px]">
        <Image
          src={airportPhoto[a.slug] || "/images/services/airport-taxi.jpg"}
          alt={`${a.name} terminal`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/65 to-[#071a2f]/20" />
        <Header />
        <div className="container-wide grid min-h-[440px] items-center gap-8 py-28 sm:min-h-[490px] lg:grid-cols-[1.15fr_.85fr]">
          <div className="order-2 max-w-3xl lg:order-1">
            <Link
              href="/#airports"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/10 px-3.5 py-2 text-xs font-bold text-white/80 backdrop-blur transition hover:bg-white/15"
            >
              <ArrowRight size={13} /> Airport connections
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-amber-300 backdrop-blur">
                <Plane size={23} />
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-black tracking-widest">
                {a.code}
              </span>
            </div>
            <p className="eyebrow mt-5 text-amber-300">
              {a.city} · Airport enquiry
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-.04em] sm:text-6xl">
              A smoother plan
              <br className="hidden sm:block" /> to and from {a.name}.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              {a.description}
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <QuickTripEnquiry
              initialFrom={a.city}
              initialTo={`${a.name} (${a.code})`}
              title="Request an airport transfer"
            />
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        <article className="mx-auto max-w-4xl">
          <p className="eyebrow text-amber-700">Airport taxi and transfer guide</p>
          {airportNarrative.map((part, index) => (
            <section key={part.heading} className={index === 0 ? "mt-3" : "mt-10 border-t border-slate-200 pt-8"}>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{part.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {part.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </article>
      </section>

      <section className="relative z-10 -mt-5">
        <div className="container-wide">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(7,26,47,.10)] sm:grid-cols-3">
            <div className="flex items-center gap-3 p-4 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <Plane size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Airport code</p>
                <p className="mt-1 text-[10px] text-slate-500">{a.code}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                <Clock3 size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Flight schedule</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Share date and local time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-100 p-4 sm:border-l sm:border-t-0 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs font-black">Pickup or drop</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Add the exact address
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-10 py-14 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
        <div>
          <p className="eyebrow text-amber-700">Transfer planning</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
            Give the team a clear flight plan.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Include the details below in your enquiry. The team can then discuss
            your pickup or drop request and confirm the meeting point,
            availability, fare and any waiting terms.
          </p>
          <div className="mt-7 max-w-4xl space-y-5">
            {[
              [
                "Flight number",
                "Share it when available, especially for an arrival.",
              ],
              [
                "Terminal or meeting point",
                "Add the terminal and a practical pickup gate or meeting landmark.",
              ],
              [
                "Onward address",
                "Name the hotel, home, station, city area or other drop location.",
              ],
              [
                "Passengers and luggage",
                "Mention group size, luggage or any special travel requirements.",
              ],
            ].map(([title, copy], i) => (
              <article
                key={title}
                className="border-b border-slate-200 pb-4 last:border-0"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#f2f7fc] text-[10px] font-black text-blue-800">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-sm font-black">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="flex flex-col justify-between rounded-[26px] bg-[#071a2f] p-5 text-white sm:p-7">
          <div>
            <p className="eyebrow text-amber-300">Arrival or departure?</p>
            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Help the pickup
              <br />
              plan come together.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The team needs different details depending on whether the cab is
              meeting a flight or taking you to one.
            </p>
          </div>
          <div className="mt-6 space-y-5">
            <div className="border-b border-white/15 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                For arrivals
              </span>
              <p className="mt-2 text-sm font-bold">
                Flight · terminal · meeting point
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Add the onward address and enough context for the team to
                discuss the pickup.
              </p>
            </div>
            <div className="pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                For departures
              </span>
              <p className="mt-2 text-sm font-bold">
                Pickup address · flight time
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Share when you want to leave and when your flight departs.
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-400">
            Always confirm current terminal and airport pickup rules before
            travel.
          </p>
        </aside>
      </section>

      {airportContext && (
        <section className="container-wide py-14 sm:py-18">
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-700">Local airport guide</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {airportContext.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {airportContext.intro}
            </p>
          </div>
          <div className="mt-7 max-w-4xl space-y-5">
            {airportContext.items.map((item) => (
              <article
                key={item.title}
                className="border-b border-slate-200 pb-5 last:border-0"
              >
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-700">Airport cab planning</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Plan the whole transfer, not only the terminal pickup.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {a.name} may be the start or end of a longer trip. A precise
              address, flight schedule and pickup direction help the Vistar Cabs
              team understand what you need. Send an enquiry for the route and
              date; it is not a confirmed vehicle or booking.
            </p>
          </div>
          <div className="mt-6 max-w-4xl space-y-5">
            {airportPlanOptions.map((option) => (
              <article
                key={option.title}
                className="border-b border-slate-200 pb-5 last:border-0"
              >
                <h3 className="text-lg font-black">{option.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {option.copy}
                </p>
              </article>
            ))}
          </div>
          {cityRoutes.length > 0 && (
            <div className="mt-8 rounded-2xl bg-white p-5 sm:p-6">
              <h3 className="text-lg font-black">
                Popular route enquiries connected with {a.city}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Use a route page to add a starting city and destination before
                sending your request.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cityRoutes.map((route) => (
                  <Link
                    key={route.slug}
                    href={`/${route.slug}`}
                    className="rounded-full border border-slate-200 px-3.5 py-2 text-xs font-bold text-blue-800 hover:border-amber-300"
                  >
                    {route.from} to {route.to}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-wide flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-amber-700">A clear expectation</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              This is a transfer enquiry, not a live booking.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Flight operations, pickup procedures, wait times, vehicle and fare
              can change. Confirm the latest arrangements directly with the
              airport and Vistar Cabs.
            </p>
          </div>
          <span className="text-sm font-bold text-blue-800">
            Use the airport enquiry form at the top of this page.
          </span>
        </div>
      </section>

      {(city || cityRoutes.length > 0) && (
        <section className="container-wide py-14 sm:py-18">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-700">
                Continue your trip planning
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Explore {city?.name || a.city} connections.
              </h2>
            </div>
            {city && (
              <Link
                href={`/cities/${city.slug}`}
                className="inline-flex items-center gap-2 text-sm font-black text-blue-800"
              >
                Open city guide <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
          {cityRoutes.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cityRoutes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-amber-300"
                >
                  {r.from} <span className="text-amber-700">→</span> {r.to}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="bg-[#f4f7fb] py-12 sm:py-16">
        <div className="container-wide mx-auto max-w-4xl">
          <p className="eyebrow text-amber-700">Airport transfer questions</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Before you travel via {a.name}.
          </h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
            {airportFaq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
                  <span>{item.q}</span>
                  <span className="text-xl text-amber-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}
