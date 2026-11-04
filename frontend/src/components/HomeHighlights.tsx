import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CarFront,
  Clock3,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export function KumbhHomeSection() {
  return (
    <section
      id="kumbh-home"
      aria-labelledby="kumbh-home-title"
      className="bg-[#f4f7fb] px-3 py-5 sm:px-5 sm:py-7"
    >
      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-[#071a2f] px-5 py-8 text-white shadow-xl sm:px-9 sm:py-12 lg:px-14 lg:py-14">
        <Image
          src="/images/kumbh-mela-nashik.jpg"
          alt="Pilgrims gathered beside the Godavari ghats in Nashik"
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/80 to-[#071a2f]/35" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[.18em] text-amber-300">
            Nashik · Trimbakeshwar · Simhastha
          </p>
          <h2
            id="kumbh-home-title"
            className="mx-auto mt-3 max-w-4xl text-2xl font-black leading-tight tracking-tight sm:text-4xl"
          >
            Nashik–Trimbakeshwar Simhastha 2027–28
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/90 sm:text-base">
            The official event window runs from 31 October 2026 to 24 July 2028,
            with the major Mela period scheduled for 15 June–30 September 2027.
            Plan an enquiry for Ramkund, Panchavati, Trimbakeshwar, Nashik Road
            or an airport connection.
          </p>
          <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-amber-300" /> Follow
              official updates
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-amber-300" /> Nashik and
              Trimbakeshwar centres
            </span>
            <span className="flex items-center gap-2">
              <CarFront size={15} className="text-amber-300" /> Enquiry only ·
              confirm directly
            </span>
          </div>
          <Link
            href="/kumbh-mela-nashik"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ffad22] px-6 text-sm font-black text-slate-950 transition hover:bg-amber-200"
          >
            Explore the Kumbh travel guide <ArrowRight size={16} />
          </Link>
          <p className="mx-auto mt-3 max-w-3xl text-[10px] leading-5 text-white/65">
            Dates checked against the official Maharashtra Simhastha portal on 3
            November 2026; schedules, access and traffic instructions may be
            updated.
          </p>
        </div>
      </div>
    </section>
  );
}

const corporateFeatures = [
  { icon: CarFront, label: "Corporate travel requests" },
  { icon: Clock3, label: "Scheduled or recurring needs" },
  { icon: MapPin, label: "City and airport journeys" },
  { icon: Handshake, label: "Discuss the scope directly" },
];

export function CorporateHomeSection() {
  return (
    <section id="corporate" className="bg-white py-12 sm:py-16">
      <div className="container-wide">
        <div className="grid items-center gap-6 rounded-[28px] border border-blue-100 bg-[#eef5ff] p-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
          <div className="relative min-h-[230px] overflow-hidden rounded-2xl shadow-lg sm:min-h-[340px]">
            <Image
              src="/images/services/corporate-cab-service.jpg"
              alt="Corporate cab service photo supplied for Vistar Cabs"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow">
              Corporate travel enquiries
            </span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1.5 text-xs font-bold text-blue-700">
              <Building2 size={14} /> Corporate mobility
            </span>
            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Plan your team’s travel with one clear enquiry.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Tell us the cities, travel pattern and contact person. The Vistar
              Cabs team can review the request and discuss availability, scope
              and terms with you.
            </p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
              {corporateFeatures.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon size={18} className="shrink-0 text-blue-600" />
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href="/corporate-cab-service"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0758c9] px-6 text-sm font-extrabold text-white transition hover:bg-blue-800"
            >
              Corporate enquiry <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
