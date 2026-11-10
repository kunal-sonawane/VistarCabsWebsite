import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Landmark,
  MapPin,
  Plane,
  Route,
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
    title: "Nashik Travel Guide | Places, Airports and Cab Journeys",
    description:
      "Explore Nashik city, Panchavati, Trimbakeshwar, Anjaneri, Igatpuri and airport journey planning with Vistar Cabs.",
    alternates: { canonical: "/about-nashik" },
    openGraph: {
      title: "Nashik Travel Guide | Vistar Cabs",
      description:
        "A Nashik-first visitor guide connecting local landmarks, airport pages and regional cab routes.",
    },
  };
  return metadataWithSeoOverride("/about-nashik", fallback);
}
const tiles = [
  {
    title: "Panchavati & Ramkund",
    kind: "Godavari riverfront",
    href: "/cities/nashik/panchavati",
    icon: Landmark,
    body: "Name a ghat, landmark or nearby pickup point to make a local journey request clear.",
  },
  {
    title: "Trimbakeshwar",
    kind: "Temple town",
    href: "/cities/nashik/trimbakeshwar",
    icon: MapPin,
    body: "Plan around Trimbakeshwar Temple and Kushavart Tirtha; check current visitor guidance before travel.",
  },
  {
    title: "Anjaneri",
    kind: "Hill and fort area",
    href: "/cities/nashik/anjaneri",
    icon: Route,
    body: "Share a road drop point and check weather and trail access. Cab access does not imply trail access.",
  },
  {
    title: "Igatpuri",
    kind: "Regional day trip",
    href: "/cities/nashik/igatpuri",
    icon: MapPin,
    body: "List your destination and return plan, especially when the trip includes several stops.",
  },
];
export default async function AboutNashik() {
  const replacement = await getManagedPageReplacement("/about-nashik");
  if (replacement) return <ManagedPageReplacement page={replacement} />;
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071a2f] text-white">
        <Image
          src="/images/cities/nashik-ramkund-clear.jpg"
          alt="Godavari riverfront and temple area in Nashik"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/76 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide flex min-h-[490px] flex-col justify-end pb-14 pt-32 sm:pb-16">
          <Link
            href="/cities/nashik"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/75"
          >
            <ArrowLeft size={14} /> Nashik cab guide
          </Link>
          <p className="eyebrow mt-8 text-amber-300">
            Vistar Cabs · our home city
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-[1.03] tracking-tight sm:text-6xl">
            Get to know
            <br />
            <span className="text-amber-300">
              Nashik by the places you visit.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            A city guide for travellers planning a Nashik visit: from the
            Godavari riverfront and temple towns to airport arrivals and
            journeys onward across Maharashtra.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/cities/nashik"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950"
            >
              Explore Nashik cab services <ArrowRight size={16} />
            </Link>
            <Link
              href="/kumbh-mela-nashik"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Simhastha travel guide <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container-wide py-8 sm:py-10">
        <div className="mx-auto max-w-2xl">
          <QuickTripEnquiry
            initialFrom="Nashik"
            title="Plan a Nashik journey"
          />
        </div>
      </section>
      <section className="container-wide grid gap-8 py-12 lg:grid-cols-[1fr_.8fr] lg:py-16">
        <div>
          <p className="eyebrow text-amber-700">
            One city, many kinds of journeys
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Start in Nashik.
            <br />
            Choose your own route.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Nashik is the starting hub for this site. Local visits, airport
            transfers, religious trips and intercity journeys need different
            pickup details. Use the city and destination pages to identify the
            place you mean; then submit an enquiry with the exact location and
            date.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            For local history, opening arrangements and visitor access, use
            official tourism and site information. Vistar Cabs arranges
            transport enquiries and does not manage entry, venue hours or event
            operations.
          </p>
          <a
            href="https://maharashtratourism.gov.in/districts/nashik/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-800 underline"
          >
            Maharashtra Tourism: Nashik district ↗
          </a>
        </div>
        <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            {
              icon: Plane,
              t: "Airport arrivals",
              d: "Open Nashik Airport at Ozar and add flight details.",
            },
            {
              icon: Route,
              t: "Intercity starts",
              d: "Connect Nashik with Mumbai, Pune, Shirdi and more.",
            },
            {
              icon: MapPin,
              t: "Local pickups",
              d: "Name the locality, station exit or a practical landmark.",
            },
          ].map((x) => (
            <div
              key={x.t}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-blue-700 shadow-sm">
                <x.icon size={19} />
              </span>
              <div>
                <h3 className="text-sm font-black">{x.t}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{x.d}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
      <section className="bg-[#f2f7fc] py-12 sm:py-16">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-amber-700">
                Places to put on your map
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Follow a local idea.
              </h2>
            </div>
            <Link
              href="/cities/nashik"
              className="inline-flex items-center gap-2 text-sm font-black text-blue-800"
            >
              All Nashik places <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((x, i) => (
              <Link
                href={x.href}
                key={x.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                <span className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f2f7fc] text-blue-700">
                    <x.icon size={19} />
                  </span>
                  <span className="text-[10px] font-black text-amber-700">
                    0{i + 1}
                  </span>
                </span>
                <span className="mt-4 block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {x.kind}
                </span>
                <span className="mt-1 block text-lg font-black">{x.title}</span>
                <span className="mt-2 block text-xs leading-5 text-slate-600">
                  {x.body}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-800">
                  View trip guide <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide grid gap-4 py-12 sm:grid-cols-3 sm:py-16">
        {[
          {
            title: "Nashik Airport (Ozar)",
            href: "/airports/nashik-ozar",
            sub: "Flight and onward address",
          },
          {
            title: "Nashik to Mumbai",
            href: "/nashik-to-mumbai-cab",
            sub: "City or airport destination",
          },
          {
            title: "Nashik to Pune",
            href: "/nashik-to-pune-cab",
            sub: "One-way or return request",
          },
        ].map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 hover:border-amber-300 hover:shadow-md"
          >
            <span>
              <b className="block text-sm">{x.title}</b>
              <small className="mt-1 block text-xs text-slate-500">
                {x.sub}
              </small>
            </span>
            <ArrowUpRight size={17} className="text-amber-700" />
          </Link>
        ))}
      </section>
      <ManagedPageContent path="/about-nashik" />
      <SiteFooter />
    </main>
  );
}

