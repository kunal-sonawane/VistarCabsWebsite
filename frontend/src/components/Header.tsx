"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { getApiUrl, site } from "@/lib/site";

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blogs", href: "/blogs" },
];
const serviceLinks = [
  { label: "Explore all services", href: "/#services" },
  { label: "Corporate Cabs", href: "/corporate-cab-service" },
  { label: "Airport Transfers", href: "/airport-taxi" },
  { label: "Outstation Journeys", href: "/outstation-cab-service" },
  { label: "Local Cab Service", href: "/local-cab-service" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({
    phone: site.phone,
    whatsapp: site.whatsapp,
  });
  useEffect(() => {
    let active = true;
    fetch(`${getApiUrl()}/api/public/settings`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active && result?.item)
          setContact({
            phone: String(result.item.primaryPhone || site.phone),
            whatsapp: String(result.item.whatsappNumber || site.whatsapp),
          });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  const waHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Vistar Cabs, I would like to enquire about a cab booking.")}`
    : "/contact-us";

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15 text-white">
      <div className="container-wide flex min-h-[82px] items-center justify-between gap-4 py-3">
        <Link
          href="/"
          aria-label="Vistar Cabs home"
          className="flex shrink-0 items-center rounded-lg bg-white px-2 py-1.5 shadow-sm"
        >
          <Image
            src="/brand/vistar-cabs-logo.png"
            alt="Vistar Cabs"
            width={170}
            height={58}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              className="text-[13px] font-semibold text-white/85 transition hover:text-amber-300"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-[13px] font-semibold text-white/85 transition hover:text-amber-300">
              Services{" "}
              <ChevronDown
                size={14}
                className="transition group-open:rotate-180"
              />
            </summary>
            <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-slate-100 bg-white p-2 text-slate-800 shadow-xl">
              {serviceLinks.map((item) => (
                <Link
                  key={item.href}
                  className="block rounded-lg px-3 py-2.5 text-xs font-bold transition hover:bg-blue-50 hover:text-blue-800"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="flex items-center gap-2">
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              aria-label="Call Vistar Cabs"
              className="hidden items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-bold lg:flex"
            >
              <Phone size={14} />
              {contact.phone.replace(/\D/g, "").slice(-10)}
            </a>
          )}
          <a
            href={waHref}
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-2.5 text-[11px] sm:px-4 sm:py-3 sm:text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
          >
            <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">Quick Enquiry</span>{" "}
            <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/25 xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/15 bg-[#0b68e8] px-5 py-4 shadow-xl xl:hidden"
        >
          <div className="container-wide grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <details className="rounded-lg px-3 py-3 text-sm font-semibold text-white">
              <summary className="cursor-pointer list-none">Services</summary>
              <div className="mt-2 grid gap-1 border-l border-white/25 pl-3">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-xs text-white/90 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-white"
              >
                Call +91 {contact.phone.replace(/\D/g, "").slice(-10)}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
