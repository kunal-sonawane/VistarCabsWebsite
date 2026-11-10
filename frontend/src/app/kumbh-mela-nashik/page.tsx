import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPinned,
  Plane,
  TrainFront,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import SiteFooter from "@/components/SiteFooter";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { metadataWithSeoOverride } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: "Nashik Simhastha Kumbh Mela 2027–28 Travel Guide",
    description:
      "Plan travel enquiries for the Nashik–Trimbakeshwar Simhastha Kumbh Mela. Dates and access can change; follow the latest official authority notices.",
    alternates: { canonical: "/kumbh-mela-nashik" },
    openGraph: {
      title: "Nashik–Trimbakeshwar Simhastha Kumbh Mela 2027–28",
      description:
        "A Nashik travel guide with official update links, current published dates and cab enquiry preparation.",
    },
  };
  return metadataWithSeoOverride("/kumbh-mela-nashik", fallback);
}
const keyDates = [
  {
    date: "31 Oct 2026",
    title: "Dhwajarohan · flag hoisting",
    place: "Ramtirth, Nashik and Kushavarta Tirth, Trimbakeshwar",
    icon: CalendarDays,
  },
  {
    date: "15 Jun 2027",
    title: "Major Mela period begins",
    place: "Nashik–Trimbakeshwar",
    icon: CalendarDays,
  },
  {
    date: "29 Jul 2027",
    title: "Nagar Pradakshina",
    place: "Nashik · time to be notified",
    icon: CalendarDays,
  },
  {
    date: "2 Aug 2027",
    title: "First Amrut Snan",
    place: "Nashik and Trimbakeshwar",
    icon: CalendarDays,
  },
  {
    date: "31 Aug 2027",
    title: "Second Amrut Snan",
    place: "Nashik and Trimbakeshwar",
    icon: CalendarDays,
  },
  {
    date: "11 Sep 2027",
    title: "Third Amrut Snan",
    place: "Ramtirth, Nashik",
    icon: CalendarDays,
  },
  {
    date: "12 Sep 2027",
    title: "Third Amrut Snan",
    place: "Kushavarta Tirth, Trimbakeshwar",
    icon: CalendarDays,
  },
  {
    date: "24 Jul 2028",
    title: "Dhwajavatarana · flag lowering",
    place: "Simhastha conclusion",
    icon: CalendarDays,
  },
];
export default async function KumbhPage() {
  const replacement = await getManagedPageReplacement("/kumbh-mela-nashik");
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071a2f] text-white">
        <Image
          src="/images/kumbh-mela-nashik.jpg"
          alt="Pilgrims at the Godavari river ghats during a Nashik Kumbh gathering"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/75 to-[#071a2f]/25" />
        <Header />
        <div className="container-wide grid min-h-[560px] gap-8 pb-10 pt-32 sm:pt-36 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:pb-14">
          <div className="order-2 max-w-3xl lg:order-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/75"
            >
              <ArrowLeft size={14} /> Back to Vistar Cabs
            </Link>
            <p className="eyebrow mt-8 text-amber-300">
              Nashik · Trimbakeshwar · Simhastha 2027–28
            </p>
            <h1 className="mt-3 text-4xl font-black leading-[1.04] tracking-tight sm:text-6xl">
              Make your way to
              <br />
              <span className="text-amber-300">Simhastha.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
              The official Simhastha window is 31 October 2026–24 July 2028. The
              major Mela period is 15 June–30 September 2027. Use official
              updates for the latest event schedule, access and travel
              instructions.
            </p>
          </div>
          <div className="order-1 space-y-3 lg:order-2">
            <QuickTripEnquiry
              initialFrom="Nashik"
              initialTo="Trimbakeshwar"
              title="Plan a Simhastha journey"
            />
            <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <CalendarDays className="text-amber-300" size={19} />
              <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                Official event window
              </p>
              <p className="mt-1 text-lg font-black">
                31 Oct 2026 – 24 Jul 2028
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <MapPinned className="text-amber-300" size={19} />
              <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                Main journey area
              </p>
              <p className="mt-1 text-lg font-black">Nashik + Trimbakeshwar</p>
            </div>
            <div className="col-span-2 flex items-start gap-3 rounded-2xl border border-amber-200/30 bg-[#071a2f]/55 p-4 backdrop-blur">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-amber-300"
                size={19}
              />
              <p className="text-xs leading-5 text-white/85">
                <b>Schedule status:</b> These key dates are published on the
                official Simhastha portal. Event timings, routes, access and
                operating instructions can change; check official advisories
                before travel.
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-wide py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-amber-700">
              Official key dates · checked 3 November 2026
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Keep the schedule close.
              <br className="hidden sm:block" /> Check before you travel.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            The Simhastha window runs from 31 October 2026 to 24 July 2028. The
            major Mela period is 15 June–30 September 2027. Nashik and
            Trimbakeshwar have separate locations for the final Amrut Snan.
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {keyDates.map((x, i) => (
            <article
              key={x.date + x.place}
              className={`relative overflow-hidden rounded-2xl border bg-white p-5 ${i === 0 || i >= 5 ? "border-amber-200" : "border-slate-200"}`}
            >
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-[#f2f7fc] text-[#0758c9]">
                <x.icon size={18} />
              </span>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-amber-700">
                {x.date}
              </p>
              <h3 className="mt-2 pr-12 text-lg font-black">{x.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{x.place}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">
          <b>Schedule note:</b> These event dates are published by the official
          Simhastha portal. Follow its live schedule and local authority
          advisories for updated timings, routes, access and parking
          instructions. Vistar Cabs does not control event operations or
          guarantee access to restricted areas.
        </p>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div className="container-wide grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow text-amber-700">Two pilgrimage centres</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Plan around the place you need to reach.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The authority plan identifies Nashik’s Godavari ghats, including
              Ramkund, and Trimbakeshwar’s temple precincts and Kushavart Kund
              as important pilgrimage areas. Local movement and vehicle access
              may change under event arrangements.
            </p>
            <Link
              href="/cities/nashik"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0758c9]"
            >
              Explore Nashik city guide <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl bg-[#f2f7fc] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-700">
                <MapPinned size={19} />
              </span>
              <h3 className="mt-4 text-lg font-black">Nashik</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ramkund and the Godavari ghats form a central pilgrimage area.
                Share the neighbourhood, approach point and meeting location for
                your journey request.
              </p>
              <Link
                href="/cities/nashik/panchavati"
                className="mt-4 inline-flex text-xs font-bold text-blue-800"
              >
                Panchavati travel page <ArrowRight size={13} />
              </Link>
            </article>
            <article className="rounded-2xl bg-[#f2f7fc] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-amber-700">
                <MapPinned size={19} />
              </span>
              <h3 className="mt-4 text-lg font-black">Trimbakeshwar</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Trimbakeshwar Temple and Kushavart Kund are key visit points.
                Confirm current timings, access and movement guidance with the
                relevant authorities.
              </p>
              <Link
                href="/cities/nashik/trimbakeshwar"
                className="mt-4 inline-flex text-xs font-bold text-blue-800"
              >
                Trimbakeshwar travel page <ArrowRight size={13} />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-[#f2f7fc] py-12 sm:py-16">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="eyebrow text-amber-700">
              Plan your arrival connection
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Rail, air or road into the Nashik region.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Nashik Road railway station, Nashik Airport at Ozar and Shirdi
              Airport may be relevant regional arrival points. Confirm current
              services, flight/train details and local event instructions before
              travel; routes, access and transport arrangements can change.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <TrainFront className="text-blue-700" size={21} />
              <h3 className="mt-3 text-lg font-black">Arriving by rail</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Nashik Road station is a key rail arrival point. Check the
                current train schedule, station exit and official crowd/approach
                guidance; arrange the last-mile pickup point clearly.
              </p>
              <Link
                href="/cities/nashik/nashik-road"
                className="mt-4 inline-flex items-center gap-1 text-xs font-black text-blue-800"
              >
                Nashik Road guide <ArrowRight size={13} />
              </Link>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <Plane className="text-blue-700" size={21} />
              <h3 className="mt-3 text-lg font-black">Arriving by air</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Nashik Airport at Ozar and Shirdi Airport are regional options
                mentioned in the Authority’s planning material. Confirm the
                operating flight, terminal, road access and cab availability for
                your date.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/airports/nashik-ozar"
                  className="text-xs font-black text-blue-800"
                >
                  Nashik Airport
                </Link>
                <Link
                  href="/airports/shirdi-airport"
                  className="text-xs font-black text-blue-800"
                >
                  Shirdi Airport
                </Link>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <MapPinned className="text-amber-700" size={21} />
              <h3 className="mt-3 text-lg font-black">Continuing by road</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Nashik and Trimbakeshwar connect by regional roads. Event
                traffic controls, parking plans and permitted vehicle access may
                change; check current Authority and police instructions before
                setting out.
              </p>
              <Link
                href="/cities/nashik/trimbakeshwar"
                className="mt-4 inline-flex items-center gap-1 text-xs font-black text-blue-800"
              >
                Trimbakeshwar guide <ArrowRight size={13} />
              </Link>
            </article>
          </div>
        </div>
      </section>{" "}
      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[1.2fr_.8fr] sm:py-16">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="eyebrow text-amber-700">
            Build a realistic trip request
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Arrival point in. Clear plan out.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Send your preferred date, origin, event-area destination, passenger
            count, luggage and return needs. Vistar Cabs will follow up to
            discuss availability, vehicle and fare. Sending a request does not
            reserve a vehicle or provide access to controlled areas.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Plane,
                title: "Arriving by air",
                copy: "Include the correct airport, flight number, arrival time and terminal where applicable.",
              },
              {
                icon: TrainFront,
                title: "Arriving by rail",
                copy: "Share the station, train arrival time and a clear meeting point.",
              },
              {
                icon: MapPinned,
                title: "Visiting both centres",
                copy: "List Nashik and Trimbakeshwar stops in order; ask the team to review the schedule.",
              },
              {
                icon: ShieldCheck,
                title: "Confirm before travel",
                copy: "Check fare, pickup point, traffic controls, parking and current authority instructions.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="flex gap-3 rounded-2xl bg-[#f2f7fc] p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue-700">
                  <x.icon size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-black">{x.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {x.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/airports/nashik-ozar"
              className="rounded-full bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-800"
            >
              Nashik Airport
            </Link>
            <Link
              href="/airports/shirdi-airport"
              className="rounded-full bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-800"
            >
              Shirdi Airport
            </Link>
            <Link
              href="/nashik-to-mumbai-cab"
              className="rounded-full bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-800"
            >
              Mumbai to Nashik route
            </Link>
            <Link
              href="#quick-enquiry"
              className="rounded-full bg-amber-300 px-4 py-2.5 text-xs font-black text-slate-950"
            >
              Open enquiry form
            </Link>
          </div>
        </article>
        <aside className="h-fit rounded-3xl bg-[#071a2f] p-6 text-white sm:p-8">
          <p className="eyebrow text-amber-300">Official updates</p>
          <h2 className="mt-2 text-2xl font-black">
            Use authority information for event decisions.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Check the official plan and the Authority’s latest proceedings for
            changes to dates, routes, access and parking.
          </p>
          <div className="mt-5 grid gap-2">
            <a
              href="https://simhasthamahakumbhmela.maharashtra.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 p-3 text-sm font-bold hover:bg-white/15"
            >
              Official Simhastha portal and current plan ↗
            </a>
            <a
              href="https://simhasthamahakumbhmela.maharashtra.gov.in/snan-calendar"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 p-3 text-sm font-bold hover:bg-white/15"
            >
              Official Snan calendar ↗
            </a>
            <a
              href="https://divcomnashik.maharashtra.gov.in/en/meeting-proceedings/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 p-3 text-sm font-bold hover:bg-white/15"
            >
              Latest Authority meeting proceedings ↗
            </a>
            <a
              href="https://divcomnashik.maharashtra.gov.in/en/about-nashik-trimbakeshwar-authority/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 p-3 text-sm font-bold hover:bg-white/15"
            >
              About the Kumbh Mela Authority ↗
            </a>
          </div>
          <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-5 text-slate-400">
            Vistar Cabs is a transport enquiry service; event operations are
            managed by the competent authorities.
          </p>
          <Link
            href="#quick-enquiry"
            className="mt-5 block rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-slate-950"
          >
            Go to the enquiry form
          </Link>
        </aside>
      </section>
      <ManagedPageContent path="/kumbh-mela-nashik" />
      <SiteFooter />
    </main>
  );
}
