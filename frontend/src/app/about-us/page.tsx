import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Plane,
  Route,
} from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import ManagedPageContent, {
  getManagedPageReplacement,
  ManagedPageReplacement,
} from "@/components/ManagedPageContent";
import { metadataWithSeoOverride } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/about-us", {
    title: "About Vistar Cabs | Nashik and Maharashtra Journeys",
    description:
      "Learn about the Vistar Cabs website, Nashik roots and how to enquire about local, airport and intercity journeys.",
    alternates: { canonical: "/about-us" },
  });
}

const services = [
  {
    icon: MapPin,
    title: "Local journeys",
    detail:
      "Describe Nashik pickups, local stops and the time you expect to travel.",
    href: "/local-cab-service",
  },
  {
    icon: Route,
    title: "Outstation routes",
    detail:
      "Request a one-way or return trip between Nashik and connected cities.",
    href: "/outstation-cab-service",
  },
  {
    icon: Plane,
    title: "Airport transfers",
    detail:
      "Share the airport, terminal and flight schedule for a pickup or drop request.",
    href: "/airport-taxi",
  },
  {
    icon: Building2,
    title: "Corporate travel",
    detail: "Send a business travel requirement for the team to review.",
    href: "/corporate-cab-service",
  },
];

export default async function AboutPage() {
  const replacement = await getManagedPageReplacement("/about-us");
  if (replacement) return <ManagedPageReplacement page={replacement} />;

  return (
    <main className="min-h-screen bg-[#f2f7fc]">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/images/cities/nashik-ramkund-clear.jpg"
          alt="Godavari riverfront and ghats in Nashik"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/90 via-[#071a2f]/70 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide pb-16 pt-36">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/75"
          >
            <ArrowLeft size={14} /> Home
          </Link>
          <p className="eyebrow mt-9 text-amber-300">About Vistar Cabs</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Nashik rooted.
            <br />
            <span className="text-amber-300">Maharashtra connected.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50">
            Vistar Cabs is building a simple way for local travellers and
            visitors to describe a journey request. The website starts with
            Nashik and connects information for city, airport, destination and
            intercity travel across Maharashtra.
          </p>
        </div>
      </section>

      <section className="container-wide py-8 sm:py-12">
        <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <figure className="relative min-h-64 overflow-hidden rounded-3xl bg-slate-200 sm:min-h-[390px]">
            <Image
              src="/images/cities/nashik-ramkund-clear.jpg"
              alt="Godavari riverfront in Nashik city"
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-slate-900">
              Nashik · our starting point
            </figcaption>
          </figure>
          <figure className="relative min-h-64 overflow-hidden rounded-3xl bg-slate-200 sm:min-h-[390px]">
            <Image
              src="/images/blogs/nashik-to-trimbakeshwar-travel-guide.jpg"
              alt="Trimbakeshwar Temple with the Brahmagiri hills behind it"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071a2f]/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-slate-900">
              Local places and regional routes
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="container-wide grid gap-8 py-8 lg:grid-cols-[1fr_.8fr] sm:py-12">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="eyebrow text-amber-700">Our purpose</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Make it easier to explain the trip you need.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            A useful cab enquiry begins with clear pickup, destination, date and
            time details. Vistar Cabs uses this site to collect those requests
            and follow up directly about availability, vehicle options, fares
            and terms.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Our direction is to connect Nashik’s local areas and nearby
            destinations with practical routes to Mumbai, Pune, Chhatrapati
            Sambhajinagar, Ahilyanagar and Shirdi. Each request remains subject
            to confirmation by the Vistar Cabs team.
          </p>
          <Link
            href="/cities/nashik"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-800"
          >
            Explore Nashik <ArrowRight size={15} />
          </Link>
        </article>
        <aside className="rounded-3xl bg-[#071a2f] p-6 text-white sm:p-8">
          <p className="eyebrow text-amber-300">How an enquiry works</p>
          <ol className="mt-5 space-y-4">
            {[
              "Choose the trip type that matches your plan.",
              "Enter pickup, destination, date and callback details.",
              "Your request is saved; WhatsApp opens with a message for you to send.",
              "The team follows up to discuss availability and trip terms.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-black text-amber-300">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-6 text-slate-200">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">
            Submitting an enquiry does not itself confirm a booking. There is no
            online payment on this website.
          </p>
        </aside>
      </section>

      <section className="container-wide py-8 sm:py-12">
        <div className="max-w-2xl">
          <p className="eyebrow text-amber-700">Services and journeys</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            A starting point for different travel needs.
          </h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ icon: Icon, title, detail, href }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-800">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-black">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{detail}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-800">
                View service <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wide py-8 sm:py-12">
        <div className="rounded-3xl bg-[#0758c9] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div>
            <p className="eyebrow text-amber-300">Ready to plan?</p>
            <h2 className="mt-2 text-2xl font-black">
              Tell us where your journey begins.
            </h2>
          </div>
          <div className="mt-5 w-full max-w-xl sm:mt-0">
            <QuickTripEnquiry title="Ask about a Vistar Cabs trip" />
          </div>
        </div>
      </section>
      <ManagedPageContent path="/about-us" />
      <SiteFooter />
    </main>
  );
}

