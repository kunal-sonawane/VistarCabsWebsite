import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import NearbyPlaces from "@/components/NearbyPlaces";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { airports, cities, routes, site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type ServicePage = {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};
const servicePages: ServicePage[] = [
  {
    slug: "outstation-cab-service",
    title: "Outstation cab enquiries from Nashik",
    keyword: "outstation cab service in Nashik",
    description:
      "Plan an outstation cab enquiry from Nashik. Share your route, date, trip type and callback details with Vistar Cabs.",
    intro:
      "A longer journey is easier to plan when the route, stops and return needs are clear. Tell Vistar Cabs where you are starting, where you are going and when you want to travel. The team will discuss availability, vehicle and fare directly.",
    sections: [
      {
        heading: "One-way drop or return journey",
        body: "Choose One Way or Round Trip in the enquiry form. For a return request, add the return date and include your planned stop order or overnight needs in the notes.",
      },
      {
        heading: "Your trip, clearly planned",
        body: "Share the full pickup and drop areas, date, preferred departure time, passenger count and luggage. For a multi-stop trip, list each stop so the team can review the request.",
      },
    ],
    faqs: [
      {
        q: "Can I request a one-way cab from Nashik?",
        a: "Yes. Select One Way, enter your origin and destination, then submit your callback details. The team will confirm whether the requested date and route can be arranged.",
      },
      {
        q: "Can I add sightseeing or overnight stops?",
        a: "Include the stops and overnight request in the trip notes. The team will discuss route feasibility, waiting terms and availability.",
      },
      {
        q: "Will I see a fixed fare online?",
        a: "No fare is quoted on this page. Confirm the complete fare and trip terms directly before accepting an arrangement.",
      },
    ],
  },
  {
    slug: "airport-taxi",
    title: "Airport transfer enquiries from Nashik",
    keyword: "airport taxi Nashik",
    description:
      "Plan a cab enquiry to or from an airport connected to Nashik and Maharashtra. Add your flight and terminal details.",
    intro:
      "Airport pickups and drops work best with the correct airport, flight time and meeting point. Use the airport trip option and include the onward address, passenger count and luggage needs so Vistar Cabs can review the request.",
    sections: [
      {
        heading: "For an arrival pickup",
        body: "Include airport name, terminal, flight number and scheduled arrival time. Add your onward address and a practical meeting point; confirm pickup procedure and waiting terms directly.",
      },
      {
        heading: "For a departure drop",
        body: "Share the airport and terminal, your full pickup address, flight departure time and preferred pickup window. Confirm the requested timing with the team before travel.",
      },
    ],
    faqs: [
      {
        q: "Which airport details should I include?",
        a: "Name the airport and terminal, then include the flight number, date, flight time, passenger count and exact destination or pickup address.",
      },
      {
        q: "Can an airport transfer be booked in advance?",
        a: "You can send an advance request. It is not confirmed until Vistar Cabs replies with availability and trip terms.",
      },
      {
        q: "Are all airports available for every date?",
        a: "Availability depends on the airport, route, vehicle and date. Confirm your exact request directly.",
      },
    ],
  },
  {
    slug: "local-cab-service",
    title: "Hourly cab enquiries in Nashik",
    keyword: "hourly cab service in Nashik",
    description:
      "Plan a Nashik hourly cab enquiry. Share pickup, destination, date, time and preferred package for a direct follow-up.",
    intro:
      "For a city pickup with several stops or a time-based itinerary, tell Vistar Cabs where the journey starts, what places you want to visit and the package duration you prefer. Confirm the arrangement directly.",
    sections: [
      {
        heading: "Point-to-point and multi-stop trips",
        body: "For a direct ride, share the pickup and drop addresses. For a local itinerary, list stops in order and include how long you expect to spend at each place.",
      },
      {
        heading: "Temple, city and countryside plans",
        body: "Panchavati, Trimbakeshwar, Nashik Road, Sinnar, Igatpuri and the vineyard area have separate journey needs. Include the exact destination or meeting point and check visitor access with each venue.",
      },
    ],
    faqs: [
      {
        q: "Can I request a local cab for several hours?",
        a: "Yes. Select Hourly and choose a preferred package duration. Package availability and fare must be confirmed directly.",
      },
      {
        q: "Can I include multiple Nashik attractions?",
        a: "List your stops in order and share the expected return time. The Vistar Cabs team will review the requested plan.",
      },
      {
        q: "Does submitting the enquiry confirm a cab?",
        a: "No. It sends a request for follow-up. The team confirms service availability and terms directly.",
      },
    ],
  },
  {
    slug: "corporate-cab-service",
    title: "Corporate travel enquiries in Nashik",
    keyword: "corporate cab service in Nashik",
    description:
      "Discuss one-time or recurring business travel requirements with Vistar Cabs. Share schedules and locations to check availability.",
    intro:
      "For a meeting, business visitor or team journey, share the pickup locations, dates, expected schedule and passenger requirements. The team can discuss whether the requested arrangement fits its services.",
    sections: [
      {
        heading: "One-time and recurring requests",
        body: "Describe whether you need a single transfer, several stops in one day or a recurring schedule. Include the expected hours, pickup areas and passenger count.",
      },
      {
        heading: "Agree on the details before travel",
        body: "Vehicle, availability, fare, invoicing requirements and recurring terms need to be confirmed with Vistar Cabs before a trip is accepted.",
      },
    ],
    faqs: [
      {
        q: "Can I enquire about recurring travel?",
        a: "Yes. Share the frequency, service dates, operating areas and schedule so the team can review the request.",
      },
      {
        q: "Can I ask for a quote first?",
        a: "Yes. Send the journey information and ask the team to confirm a written fare or proposal before agreeing.",
      },
    ],
  },
];
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = routes.find((x) => x.slug === slug);
  const s = servicePages.find((x) => x.slug === slug);
  if (!r && !s) return {};
  const title = r ? `${r.from} to ${r.to} Cab Enquiry` : s!.title;
  const description = r
    ? `Plan a cab enquiry from ${r.from} to ${r.to}. Share your addresses, travel date, trip type and callback details with Vistar Cabs.`
    : s!.description;
  const fallback: Metadata = {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: `${title} | Vistar Cabs`, description },
  };
  return metadataWithSeoOverride(`/${slug}`, fallback);
}
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200">
      {items.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
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
  );
}
export default async function LandingPage({ params }: Props) {
  const { slug } = await params;
  const route = routes.find((x) => x.slug === slug);
  const service = servicePages.find((x) => x.slug === slug);
  if (!route && !service) notFound();
  const pagePath = `/${slug}`;
  const replacement = await getManagedPageReplacement(pagePath);
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  const title = route
    ? `${route.from} to ${route.to} cab enquiry`
    : service!.title;
  const intro = route ? route.details : service!.intro;
  const message = route
    ? `Hello Vistar Cabs, please contact me about a cab from ${route.from} to ${route.to}.`
    : `Hello Vistar Cabs, I would like to enquire about ${service!.title}.`;
  const linkedAirports = route
    ? airports.filter((a) => a.city === route.from || a.city === route.to)
    : [];
  const linkedCities = route
    ? [route.from, route.to]
        .map((n) => cities.find((c) => c.name === n))
        .filter((c): c is (typeof cities)[number] => Boolean(c))
    : [];
  const routeTripOptions = route
    ? [
        {
          title: "One-way city-to-city cab",
          copy: `Request a direct pickup in ${route.from} and drop at your exact address in ${route.to}. Share the locality, building or meeting point instead of only the city name.`,
        },
        {
          title: "Return journey",
          copy: `If you need to come back from ${route.to}, include the return date and preferred time. The team can confirm whether a return arrangement is available and explain the fare and waiting terms.`,
        },
        {
          title: "Family, group or business travel",
          copy: `Mention the number of passengers, luggage and any time-sensitive arrival in ${route.to}. Vistar Cabs can discuss a suitable vehicle after checking your request and availability.`,
        },
        ...(linkedAirports.length
          ? [
              {
                title: "Airport-connected trip",
                copy: `For an airport journey near ${route.from} or ${route.to}, name the airport and terminal, add your flight number and schedule, and provide the other end of the transfer.`,
              },
            ]
          : []),
        {
          title: "Planned stops or onward visits",
          copy: `List every stop between ${route.from} and ${route.to} in visit order. Extra stops can change the route, timing and quote, so ask the team to confirm the complete plan before travelling.`,
        },
      ]
    : [];
  const routeNarrative = route
    ? [
        `A private cab enquiry between ${route.from} and ${route.to} should describe the entire door-to-door trip. Enter the pickup locality, building or meeting point in ${route.from}, then give the actual drop address in ${route.to}. This is especially useful when the journey begins at a home or hotel and ends at a hospital, office, campus, railway station, airport or a specific family address. City names alone do not tell the team which roads or access points your trip requires.`,
        `${linkedCities.find((city) => city.name === route.from)?.detail ?? `The trip begins in ${route.from}.`} ${linkedCities.find((city) => city.name === route.to)?.detail ?? `The destination is ${route.to}.`} If your pickup or drop is outside the central area, include the neighbourhood and a nearby landmark. Note any appointment or arrival deadline and allow your own time buffer for traffic, road conditions and planned stops. This page does not publish a guaranteed distance or travel duration for the address-specific route.`,
        `Choose the arrangement that matches your plan. A one-way enquiry covers the requested direction; a return enquiry must include when and where you want to travel back. If you expect the cab to wait, make several stops or stay overnight, explain that before accepting a quote. The complete route, waiting, tolls, driver allowance and any additional terms should be confirmed directly with Vistar Cabs so that both sides are discussing the same itinerary.`,
        `Vehicle suitability depends on the passenger count, luggage, route and date. A small party with light bags may ask about a compact car, while a family or group may need more seating or baggage space. Tell the team about mobility requirements, child passengers and bulky items; do not assume a vehicle or capacity until it has been confirmed as available for your trip.`,
        `For a railway or airport connection, include the train or flight number, schedule, terminal or meeting point and the onward address. ${linkedAirports.length ? `Related airport connections include ${linkedAirports.map((airport) => `${airport.name} (${airport.code})`).join(", ")}.` : "If an airport is part of the trip, name it precisely and include the terminal and flight schedule."} Verify current airport or railway pickup instructions with the operator. The enquiry form records a request and prepares a WhatsApp message; press Send there, then wait for Vistar Cabs to confirm availability, vehicle, fare and pickup arrangements.`,
      ]
    : [];
  const serviceNarrative = service
    ? service.slug === "outstation-cab-service"
      ? [
          `An outstation cab from Nashik is planned around the actual pickup address, destination, travel date and whether you need a one-way drop or a return journey. Share both addresses rather than only the city names, and mention any appointment, family visit or connection that affects when you need to arrive. If you expect to stay overnight or travel back on a later date, include that in your first request so the team can discuss the full arrangement.`,
          `Before asking for a quote, decide whether the trip is direct or includes stops, and give a realistic departure window. Highway conditions, traffic, weather and site access can change the schedule, so estimates should not be treated as guaranteed arrival times. Ask Vistar Cabs to explain the complete fare and any toll, waiting, driver allowance, extra-stop or overnight terms that apply to your itinerary.`,
          `Vehicle choice depends on the number of passengers, luggage and the road journey. Tell the team about bulky bags, child passengers or mobility needs, then confirm the available vehicle and seating capacity for the date. The enquiry form records a request; a cab is arranged only after the team directly confirms availability, vehicle, fare and trip terms.`,
        ]
      : service.slug === "airport-taxi"
        ? [
            `An airport taxi request needs the exact airport, terminal and direction of travel. For an arrival, provide the flight number, scheduled landing time, passenger count and onward address. For a departure, provide the pickup address, flight time and preferred pickup window. Verify your ticket and current airline or airport instructions before travelling, especially if more than one airport serves the region.`,
            `Include luggage, additional passenger pickups, a railway station connection or any onward intercity destination in the same enquiry. The meeting point, waiting arrangement and time buffer should be confirmed directly; airport procedures and flight schedules can change. A form submission does not monitor the flight or guarantee that a vehicle will be waiting at a particular gate.`,
            `Ask the team to confirm the total fare, vehicle, terminal meeting point, waiting, tolls and any extra-stop terms before you accept the transfer. The mobile form captures the route, date, time and callback number, then opens WhatsApp with the request prepared. Press Send there if you want to message Vistar Cabs; the request remains unconfirmed until you receive a direct reply.`,
          ]
        : service.slug === "local-cab-service"
          ? [
              `A local cab in Nashik can be requested for a direct ride or for a day that includes several stops. Describe where the trip starts, name each destination in sequence and estimate how long you expect to spend at each one. A station pickup, hospital appointment, office visit, temple-area journey and vineyard visit may each need a different schedule, so include the details that matter to your plan.`,
              `If you are asking about an hourly or full-day arrangement, state the duration you have in mind and whether the cab should wait while you visit each place. Confirm the included time or distance, extra usage, waiting and return terms directly before accepting. Venue opening times, local restrictions, traffic and parking are separate considerations; check current guidance with each place you plan to visit.`,
              `Mention passenger count, luggage and any accessibility needs so Vistar Cabs can discuss which vehicle categories may be available. Use complete addresses and a callback number, then wait for a direct response about availability and fare. Sending an enquiry starts a conversation; it does not reserve a vehicle or guarantee a specific package.`,
            ]
          : [
              `A corporate cab enquiry can describe a single meeting transfer, movement between several offices, guest pickups or a recurring travel requirement. Include the service dates, pickup locations, expected schedule, passenger count and the person who should coordinate follow-up. For multiple pickups, list them in order and indicate any arrival deadline or changes that may affect the plan.`,
              `If the request involves repeated journeys, explain the frequency and operating hours rather than assuming a fixed monthly arrangement. Tell the team what records or invoicing information your organisation needs, then ask whether those requirements can be supported. Pricing, billing terms, vehicle availability and recurring schedules must be discussed and agreed directly; this page does not promise a corporate contract or a particular service level.`,
              `For airport or intercity business travel, add flight details, destination addresses, luggage and return needs. A clear itinerary helps the team assess the request and respond with the vehicle and terms available for those dates. No service is confirmed until Vistar Cabs replies and both sides agree on the schedule, fare and operating details.`,
            ]
    : [];
  const faqs = route
    ? [
        {
          q: `Can I request a return trip from ${route.to}?`,
          a: "Yes. Choose Outstation, select Round Trip, and add the return date and time. The team will confirm the requested arrangement and fare.",
        },
        {
          q: `What details should I provide for a ${route.from} to ${route.to} cab?`,
          a: `Enter the exact ${route.from} pickup and ${route.to} drop-off points, travel date/time and any stops or airport terminal details. This route page does not estimate live timing.`,
        },
        {
          q: "Does submitting this page guarantee a cab?",
          a: "No. It prepares an enquiry only. Availability, vehicle and fare must be confirmed directly with Vistar Cabs.",
        },
        {
          q: `Can I request a pickup from a specific area in ${route.from}?`,
          a: `Yes. Enter your neighbourhood, full pickup address or a clear meeting point in ${route.from}, and give the exact drop address in ${route.to}. The team will review those locations when checking availability.`,
        },
        {
          q: "Can I ask about the vehicle and fare before confirming?",
          a: "Yes. Send the trip details first and ask Vistar Cabs to confirm the available vehicle, complete fare and any applicable waiting, toll or stop terms before you accept the arrangement.",
        },
        {
          q: "What if my trip includes an airport or extra stops?",
          a: "Add the airport and terminal, flight details if relevant, and every planned stop to your request. The team needs the complete itinerary to review the trip; airport pickup procedures and access should also be checked with the airport.",
        },
      ]
    : service!.faqs;
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071a2f] text-white">
        <Image
          src={
            route?.from === "Mumbai"
              ? "/images/cities/mumbai.jpg"
              : route?.from === "Chhatrapati Sambhajinagar"
                ? "/images/cities/sambhajinagar.jpg"
                : "/images/cities/nashik.jpg"
          }
          alt="Vistar Cabs regional road travel"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/78 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide grid min-h-[510px] gap-7 pb-14 pt-32 sm:pt-36 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className={route || service ? "order-2 lg:order-1" : ""}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/75 hover:text-white"
            >
              <ArrowLeft size={14} /> Vistar Cabs home
            </Link>
            <p className="eyebrow mt-8 text-amber-300">
              {route
                ? "Nashik-first route planning"
                : "Vistar Cabs · service enquiry"}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              {route ? (
                <>
                  {route.from}
                  <span className="text-amber-300"> to </span>
                  {route.to}
                  <br />
                  Cab journey
                </>
              ) : (
                title
              )}
              <span className="text-amber-300">.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
              {route
                ? `Plan a journey request from ${route.from} to ${route.to}. Share the exact pickup, destination, travel date and any stops so the Vistar Cabs team can discuss the details.`
                : intro}
            </p>
            {!route && !service && <a
              href={
                site.whatsapp
                  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
                  : "/#book"
              }
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"
            >
              {site.whatsapp ? "Ask about this journey" : "Open trip enquiry"}{" "}
              <MessageCircle size={16} />
            </a>}
          </div>
          <aside className={`rounded-3xl border border-white/20 bg-[#071a2f]/55 p-5 shadow-2xl backdrop-blur-md sm:p-6 ${route || service ? "order-1 lg:order-2" : ""}`}>
            {route ? (
              <QuickTripEnquiry
                initialFrom={route.from}
                initialTo={route.to}
                title="Send a trip enquiry"
              />
            ) : service ? (
              <QuickTripEnquiry title={`Enquire about ${service.title}`} />
            ) : (
              <>
                <p className="eyebrow text-amber-200">Tell us what you need</p>
                <h2 className="mt-2 text-2xl font-black">
                  A few details help the team plan.
                </h2>
                <div className="mt-5 space-y-3">
                  {[
                    [
                      "01",
                      "Service",
                      "Outstation, airport, hourly or corporate",
                    ],
                    [
                      "02",
                      "Travel plan",
                      "Locations, date, time and relevant details",
                    ],
                    ["03", "Callback", "Your phone number for follow-up"],
                  ].map((x) => (
                    <div
                      key={x[0]}
                      className="flex gap-3 rounded-xl bg-white/10 p-3"
                    >
                      <span className="text-xs font-black text-amber-300">
                        {x[0]}
                      </span>
                      <span>
                        <b className="block text-sm">{x[1]}</b>
                        <small className="mt-0.5 block text-xs text-white/65">
                          {x[2]}
                        </small>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-white/70">Use the enquiry form on this page to share your trip details.</p>
              </>
            )}
          </aside>
        </div>
      </section>
      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(7,26,47,.06)] sm:p-8">
          <p className="eyebrow text-amber-700">
            {route ? "Your route, clearly planned" : "What to expect"}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {route
              ? `Prepare for the ${route.from} to ${route.to} drive.`
              : "A simple enquiry with direct follow-up."}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {route
              ? route.details
              : "Share your locations and schedule, then let the team review the request. The page does not confirm live availability, vehicle type or a fixed fare."}
          </p>
          <div className="mt-6 space-y-3">
            {(route
              ? [
                  "Exact pickup and destination",
                  "Travel date and preferred time",
                  "Return plan, passengers or stops",
                ]
              : [
                  "Choose a service",
                  "Add the trip details",
                  "Confirm availability and fare",
                ]
            ).map((x, i) => (
              <div key={x} className="flex gap-3 border-b border-slate-200 pb-3 last:border-0">
                <span className="pt-1 text-[10px] font-black text-blue-800">
                  0{i + 1}
                </span>
                <h3 className="pt-1 text-sm font-black">{x}</h3>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
            This page supports an enquiry. Confirm availability, vehicle, fare,
            estimated timing and trip terms directly with Vistar Cabs.
          </p>
          {service && (
            <div className="mt-8 space-y-6">
              {service.sections.map((sec) => (
                <section key={sec.heading}>
                  <h3 className="text-lg font-black">{sec.heading}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {sec.body}
                  </p>
                </section>
              ))}
            </div>
          )}
        </article>
        <aside className="h-fit rounded-3xl bg-[#f2f7fc] p-6 sm:p-8">
          <p className="eyebrow text-amber-700">Before you send the request</p>
          <h2 className="mt-2 text-xl font-black">A useful checklist</h2>
          <div className="mt-5 space-y-4">
            {[
              "Exact pickup address and a clear meeting point",
              "Destination entrance or locality",
              "Travel date and preferred pickup time",
              "Passenger and luggage details, if known",
            ].map((x) => (
              <div
                key={x}
                className="flex gap-3 text-sm leading-6 text-slate-700"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-blue-700">
                  <Check size={13} />
                </span>
                {x}
              </div>
            ))}
          </div>
          {!route && !service && <Link
            href="#quick-enquiry"
            className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0758c9] px-4 py-3 text-sm font-black text-white hover:bg-[#0649a6]"
          >
            Return to the enquiry form <ArrowRight size={16} />
          </Link>}
          <div className="mt-5 flex items-start gap-2 rounded-xl bg-white p-4 text-xs leading-5 text-slate-600">
            <ShieldCheck
              size={16}
              className="mt-0.5 shrink-0 text-emerald-700"
            />
            No online payment is taken on this enquiry page.
          </div>
        </aside>
      </section>
      {service && (
        <section className="container-wide pb-14 sm:pb-18">
          <article className="mx-auto max-w-4xl">
            <p className="eyebrow text-amber-700">Vistar Cabs service guide</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{service.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
              {serviceNarrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        </section>
      )}
      {route && linkedCities.find((item) => item.name === route.to) && (
        <NearbyPlaces
          citySlug={linkedCities.find((item) => item.name === route.to)!.slug}
          cityName={route.to}
          eyebrow={`Plan a visit after arriving in ${route.to}`}
        />
      )}
      {route && (
        <section className="bg-[#f4f7fb] py-12 sm:py-16">
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="eyebrow text-amber-700">Plan this journey</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Choose the trip arrangement that fits.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                A {route.from} to {route.to} cab request can be planned as a
                one-way transfer, a return journey, or a trip with agreed stops.
                Tell us which arrangement you need and include the actual pickup
                and drop addresses. The team will confirm whether it can be
                arranged for your date and share the fare before you decide.
              </p>
            </div>
            <article className="mt-7 max-w-4xl">
              <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                {`Taxi from ${route.from} to ${route.to}: route and trip planning`}
              </h3>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {routeNarrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
            <div className="mt-6 max-w-4xl space-y-4">
              {[
                ["One-way trip", `Travel from your pickup in ${route.from} to your chosen address in ${route.to}.`],
                ["Return journey", "Share when you need the return and whether it is the same day or a later date."],
                ["Stops along the way", "List planned stops and destination areas so the route request can be reviewed clearly."],
              ].map(([title, copy]) => (
                <article key={title} className="border-b border-slate-200 pb-4 last:border-0">
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{copy}</p>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <p className="eyebrow text-amber-700">Ways to plan this route</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">
                Choose the trip type that matches your plans.
              </h3>
              <div className="mt-5 max-w-4xl space-y-4">
                {routeTripOptions.map((option) => (
                  <article
                    key={option.title}
                    className="border-b border-slate-200 pb-4 last:border-0"
                  >
                    <h4 className="text-lg font-black">{option.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {option.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-6 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 sm:p-7 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="eyebrow text-blue-800">Before you enquire</p>
                <h3 className="mt-2 text-xl font-black">
                  A clear request gets a useful follow-up.
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The form starts with this route. Add the exact addresses and
                  schedule, then keep your phone available for the response.
                </p>
              </div>
              <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[
                  `Enter your exact pickup point in ${route.from}.`,
                  `Enter the destination address or locality in ${route.to}.`,
                  "Choose your travel date and preferred pickup time.",
                  "Add a callback number; include return needs and stops when the team follows up.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3 border-b border-blue-200 pb-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-xs font-black text-amber-900">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-6 text-slate-700">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}
      {route && (
        <section className="bg-[#071a2f] py-12 text-white">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-amber-300">
                  Connections for this journey
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Continue exploring the route.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-300">
                City and airport links help you describe your actual pickup and
                drop-off points.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {linkedCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cities/${c.slug}`}
                  className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold hover:border-amber-300"
                >
                  {c.name} city guide
                </Link>
              ))}
              {linkedAirports.slice(0, 4).map((a) => (
                <Link
                  key={a.slug}
                  href={`/airports/${a.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold hover:border-amber-300"
                >
                  <Plane size={13} />
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[.65fr_1.35fr]">
        <div>
          <p className="eyebrow text-amber-700">Frequently asked questions</p>
          <h2 className="mt-2 text-2xl font-black">Before you travel.</h2>
        </div>
        <FAQ items={faqs} />
      </section>
      <ManagedPageContent path={pagePath} />
      <SiteFooter />
    </main>
  );
}
