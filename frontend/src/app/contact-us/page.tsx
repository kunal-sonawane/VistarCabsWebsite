import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import QuickTripEnquiry from "@/components/QuickTripEnquiry";
import { site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  return metadataWithSeoOverride("/contact-us", {
    title: "Contact Vistar Cabs | Nashik",
    description:
      "Call, email or send Vistar Cabs a cab enquiry from Nashik for local, airport and intercity journeys.",
    alternates: { canonical: "/contact-us" },
  });
}

export default async function ContactPage() {
  const numbers = [
    ...new Set([site.phone, site.secondaryPhone, site.tertiaryPhone]),
  ];
  const waLink = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Vistar Cabs, I would like to enquire about a cab journey.")}`
    : "";
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/images/contact-us.jpg"
          alt="A cab and driver on a Nashik city road"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/75 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide pb-14 pt-36 sm:pb-20">
          <p className="eyebrow text-amber-300">Contact Vistar Cabs</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Let’s talk through your journey.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            Use the enquiry form or call the team to discuss your pickup,
            destination, date and travel plan.
          </p>
        </div>
      </section>
      <section className="container-wide grid gap-5 py-10 sm:py-14 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="eyebrow text-amber-700">Reach the team</p>
          <h2 className="mt-2 text-2xl font-black">Contact details</h2>
          <div className="mt-5 grid gap-3">
            {numbers.map((number, index) => (
              <a
                key={number}
                href={`tel:${number}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {index === 0
                      ? "Call Vistar Cabs"
                      : `Contact number ${index + 1}`}
                  </span>
                  <span className="mt-1 block text-sm font-black">
                    +91 {number.replace(/\D/g, "").slice(-10)}
                  </span>
                </span>
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                <Mail size={17} />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Email
                </span>
                <span className="mt-1 block text-sm font-black">
                  {site.email}
                </span>
              </span>
            </a>
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <MessageCircle size={17} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    WhatsApp
                  </span>
                  <span className="mt-1 block text-sm font-black">
                    Message Vistar Cabs
                  </span>
                </span>
              </a>
            )}
          </div>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-700">
            <MapPin size={20} />
          </span>
          <p className="eyebrow mt-5 text-amber-700">Nashik office</p>
          <h2 className="mt-2 text-2xl font-black">Find Vistar Cabs</h2>
          <p className="mt-4 rounded-2xl bg-[#f4f7fb] p-4 text-sm leading-7 text-slate-700">
            {site.address}
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Please contact the team before visiting to confirm availability and
            the best time to reach the office.
          </p>
          <div className="mt-6">
            <QuickTripEnquiry title="Send a cab enquiry" />
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
