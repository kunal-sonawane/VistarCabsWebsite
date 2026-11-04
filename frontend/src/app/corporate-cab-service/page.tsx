import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  MapPin,
  Route,
} from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CorporateInquiryForm from "@/components/CorporateInquiryForm";
import { metadataWithSeoOverride } from "@/lib/cms";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/corporate-cab-service", {
    title: "Corporate Cab Enquiries",
    description:
      "Send Vistar Cabs a corporate travel enquiry for employee, office, airport or intercity transport needs in Maharashtra.",
    alternates: { canonical: "/corporate-cab-service" },
  });
}

const questions = [
  [
    "How do we ask about corporate transport?",
    "Send the company, contact, city and a short description of your requirements. Vistar Cabs will contact you to discuss scope, schedule and availability.",
  ],
  [
    "Can the enquiry cover office and airport journeys?",
    "Yes. Describe the requested journey types and cities in the requirements field so the team can review them.",
  ],
  [
    "Does this form confirm a fleet or monthly contract?",
    "No. This form records an enquiry. Vehicle availability, service scope, rates and contract terms need direct discussion and written confirmation.",
  ],
  [
    "Can we request recurring employee travel?",
    "You can describe the expected locations and schedule. The team will review the request and confirm whether it can be supported.",
  ],
  [
    "Is an online payment required?",
    "No payment is collected through this website. Payment terms are discussed directly with Vistar Cabs.",
  ],
];

export default function CorporateCabsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/images/services/corporate-cab-service.jpg"
          alt="Taxi and passengers on a city street"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/78 to-[#071a2f]/45" />
        <Header />
        <div className="container-wide grid min-h-[480px] gap-8 pb-12 pt-36 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white/90">
              <BriefcaseBusiness size={15} className="text-amber-300" />{" "}
              Corporate mobility enquiry
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Plan work travel with one clear conversation.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
              Share where your team travels, the city and the kind of transport
              you need. Vistar Cabs will follow up to discuss availability and
              terms.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <Route size={16} className="text-amber-300" /> Office and
                intercity requests
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <MapPin size={16} className="text-amber-300" /> City-specific
                requirements
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
                <CalendarClock size={16} className="text-amber-300" /> Recurring
                schedule enquiries
              </span>
            </div>
          </div>
          <div className="lg:py-8">
            <CorporateInquiryForm />
          </div>
        </div>
      </section>
      <section className="container-wide grid gap-5 py-12 sm:py-16 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <p className="eyebrow text-amber-700">Frequently asked questions</p>
          <h2 className="mt-2 text-3xl font-black">
            Corporate travel, clearly explained.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A request is reviewed by the team. Service terms are confirmed
            before any trip is agreed.
          </p>
          <Link
            href="/contact-us"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-800"
          >
            Contact Vistar Cabs <ArrowRight size={15} />
          </Link>
        </div>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
          {questions.map(([question, answer]) => (
            <details key={question} className="py-4">
              <summary className="cursor-pointer text-sm font-black text-[#0758c9]">
                {question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
