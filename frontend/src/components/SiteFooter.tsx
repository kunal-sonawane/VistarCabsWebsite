import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";
import { site, cities, airports } from "@/lib/site";
import { getPublicSiteSettings } from "@/lib/cms";
import PaymentMarks from "@/components/PaymentMarks";

const footerServices = [
  ["Airport", "/airport-taxi"],
  ["Local", "/local-cab-service"],
  ["One Way Cab", "/outstation-cab-service"],
  ["Round Trip Cab", "/outstation-cab-service"],
  ["Corporate Cabs", "/corporate-cab-service"],
  ["Kumbh Mela 2026–2028", "/kumbh-mela-nashik"],
  ["Outstation", "/outstation-cab-service"],
] as const;

export default async function SiteFooter() {
  const dynamic = await getPublicSiteSettings();
  const primaryPhone = dynamic?.primaryPhone || site.phone;
  const secondaryPhone = dynamic?.secondaryPhone || site.secondaryPhone;
  const email = site.email;
  const whatsapp = dynamic?.whatsappNumber || site.whatsapp;
  const socialLinks = [
    ["Instagram", dynamic?.instagramUrl || site.instagram, Instagram],
    ["Facebook", dynamic?.facebookUrl || site.facebook, Facebook],
    ["YouTube", dynamic?.youtubeUrl || site.youtube, Youtube],
    ["LinkedIn", dynamic?.linkedinUrl || site.linkedin, Linkedin],
  ] as const;
  const phoneNumbers = [
    ...new Set(
      [primaryPhone, secondaryPhone, site.tertiaryPhone].filter(Boolean),
    ),
  ];

  return (
    <footer id="contact" className="bg-[#071a2f] py-7 text-white sm:py-12">
      <div className="container-wide">
        <div className="mb-4 sm:mb-6">
          <h2 className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[.2em] text-slate-300">
            <span>Available in states</span>
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-[10px] font-medium normal-case tracking-normal text-slate-400">
              1 State
            </span>
          </h2>
          <div className="mt-2">
            <Link
              href="/maharashtra"
              className="inline-flex rounded-md border border-white/25 px-2.5 py-1 text-[11px] text-slate-100 transition hover:border-amber-300 hover:text-amber-200"
            >
              Maharashtra
            </Link>
          </div>
          <h2 className="mt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-[.2em] text-slate-300">
            <span>Available services</span>
            <span className="h-px flex-1 bg-white/15" />
            <span className="text-[10px] font-medium normal-case tracking-normal text-slate-400">
              {footerServices.length} Services
            </span>
          </h2>
          <div className="mt-2 hidden flex-wrap gap-2 sm:flex">
            {footerServices.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="rounded-md border border-white/25 px-2.5 py-1 text-[11px] text-slate-100 transition hover:border-amber-300 hover:text-amber-200"
              >
                {label}
              </Link>
            ))}
          </div>
          <details className="mt-2 rounded-xl border border-white/10 px-3 py-2 sm:hidden">
            <summary className="cursor-pointer list-none text-xs font-bold text-slate-200">
              Browse services
            </summary>
            <div className="flex flex-wrap gap-2 pb-1 pt-3">
              {footerServices.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-md border border-white/25 px-2.5 py-1 text-[11px] text-slate-100"
                >
                  {label}
                </Link>
              ))}
            </div>
          </details>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-9 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/vistar-cabs-logo.png"
              alt="Vistar Cabs"
              width={176}
              height={58}
              className="h-12 w-auto rounded-lg bg-white px-2 object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
              {dynamic?.coverageSummary ||
                "Nashik rooted. Maharashtra connected. Plan local, intercity and airport cab enquiries with Vistar Cabs."}
            </p>
            <div className="mt-5 space-y-2 text-xs text-slate-300">
              {phoneNumbers.map((phone, index) => (
                <a
                  key={phone}
                  className="flex items-center gap-2 hover:text-white"
                  href={`tel:${phone}`}
                >
                  <Phone size={14} />
                  {index === 0
                    ? "Call Vistar Cabs"
                    : `Contact number ${index + 1}`}{" "}
                  · +91 {phone.replace(/\D/g, "").slice(-10)}
                </a>
              ))}
              {whatsapp && (
                <a
                  className="flex items-center gap-2 hover:text-white"
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={14} />
                  WhatsApp enquiries
                </a>
              )}
              {email && (
                <a
                  className="flex items-center gap-2 hover:text-white"
                  href={`mailto:${email}`}
                >
                  <Mail size={14} />
                  {email}
                </a>
              )}
              <p className="max-w-xs pt-1 text-[11px] leading-5 text-slate-400">
                {site.address}
              </p>
              {dynamic?.operatingHours && (
                <p className="text-slate-400">
                  Hours: {dynamic.operatingHours}
                </p>
              )}
            </div>
            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Follow Vistar Cabs
              </p>
              <div className="flex gap-2">
                {socialLinks.map(([label, url, Icon]) => (
                  <SocialBadge
                    key={label}
                    label={label}
                    url={url}
                    Icon={Icon}
                  />
                ))}
              </div>
              {socialLinks.some(([, url]) => !url) && (
                <p className="mt-2 text-[10px] text-slate-500">
                  Social profile links can be added in Site settings.
                </p>
              )}
            </div>
          </div>
          <FooterLinks
            title="Company"
            links={[
              ["About Us", "/about-us"],
              ["Contact Us", "/contact-us"],
              ["Blogs", "/blogs"],
              ["Customer feedback", "/#feedback"],
              ["Frequently asked questions", "/#faqs"],
              ["Simhastha travel guide", "/kumbh-mela-nashik"],
            ]}
          />
          <FooterLinks
            title="Services & airports"
            links={[
              ["Outstation journeys", "/outstation-cab-service"],
              ["Airport transfers", "/airport-taxi"],
              ["Local Nashik trips", "/local-cab-service"],
              ["Corporate cabs", "/corporate-cab-service"],
              ...airports.map(
                (airport) =>
                  [
                    airport.city + " airport · " + airport.code,
                    "/airports/" + airport.slug,
                  ] as [string, string],
              ),
            ]}
          />
          <FooterLinks
            title="Cities & useful links"
            links={[
              ...cities.map(
                (city) =>
                  [city.name + " city guide", "/cities/" + city.slug] as [
                    string,
                    string,
                  ],
              ),
              ["Maharashtra travel pages", "/maharashtra"],
            ]}
            note="Availability, fares and trip terms are confirmed directly with Vistar Cabs."
          />
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 sm:grid-cols-[.8fr_1.2fr] sm:items-center">
              <div>
                <h2 className="text-sm font-black">Get the App Link</h2>
                <p className="mt-1 text-xs text-slate-400">
                  <span className="underline decoration-amber-300 underline-offset-4">
                    App link coming soon
                  </span>
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Payment options
                </h3>
                <PaymentMarks />
                <p className="mt-2 text-[10px] leading-5 text-slate-500">
                  Payment arrangements are confirmed directly with Vistar Cabs.
                  This website does not take online payments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-[10px] text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Vistar Cabs</span>
          <span>Enquiry only · No online payment is collected here.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
  note,
}: {
  title: string;
  links: Array<[string, string]>;
  note?: string;
}) {
  return (
    <>
      <details className="rounded-xl border border-white/10 px-3 py-2 sm:hidden">
        <summary className="cursor-pointer list-none text-sm font-black">
          {title}
        </summary>
        <div className="grid gap-2.5 pb-2 pt-3 text-xs text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href + label} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
          {note && (
            <p className="pt-2 text-[10px] leading-4 text-slate-500">{note}</p>
          )}
        </div>
      </details>
      <div className="hidden sm:block">
        <h2 className="text-sm font-black">{title}</h2>
        <div className="mt-4 grid gap-3 text-xs text-slate-300">
          {links.map(([label, href]) => (
            <Link key={href + label} href={href} className="hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        {note && (
          <p className="mt-5 text-[10px] leading-5 text-slate-500">{note}</p>
        )}
      </div>
    </>
  );
}

function SocialBadge({
  label,
  url,
  Icon,
}: {
  label: string;
  url: string;
  Icon: typeof Instagram;
}) {
  const brand: Record<string, string> = {
    Instagram: "bg-gradient-to-br from-[#ffd76a] via-[#f04468] to-[#8048c8]",
    Facebook: "bg-[#1877f2]",
    YouTube: "bg-[#ff0033]",
    LinkedIn: "bg-[#0a66c2]",
  };
  const style = `grid h-10 w-10 place-items-center rounded-full text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${brand[label] || "bg-white/15"}`;
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Vistar Cabs on ${label}`}
      title={label}
      className={style}
    >
      <Icon size={18} strokeWidth={2.2} />
    </a>
  ) : (
    <span
      aria-label={`${label} profile to be configured`}
      title={`${label} profile link can be added in Site settings`}
      className={`${style} cursor-default opacity-80`}
    >
      <Icon size={18} strokeWidth={2.2} />
    </span>
  );
}
