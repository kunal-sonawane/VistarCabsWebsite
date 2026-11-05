"use client";
import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { getApiUrl, site } from "@/lib/site";

function WhatsAppMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="25"
      height="25"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M16 3.2A12.5 12.5 0 0 0 5.25 22.1L3.5 28.5l6.55-1.7A12.5 12.5 0 1 0 16 3.2Zm0 22.7c-1.9 0-3.75-.52-5.37-1.5l-.38-.23-3.9 1.01 1.04-3.8-.25-.4A10.2 10.2 0 1 1 16 25.9Zm5.6-7.65c-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.95 1.2-.18.2-.35.22-.65.08-.3-.15-1.28-.48-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.65-.93-2.27-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.48 1.07 2.92 1.22 3.12.15.2 2.1 3.2 5.08 4.48.71.3 1.27.48 1.7.61.71.23 1.35.2 1.86.12.57-.08 1.8-.73 2.05-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export default function FloatingContact() {
  const [contact, setContact] = useState({
    phone: site.phone,
    whatsapp: site.whatsapp,
  });
  useEffect(() => {
    let active = true;
    fetch(`${getApiUrl()}/api/public/settings`)
      .then((r) => (r.ok ? r.json() : null))
      .then((x) => {
        if (active && x?.item)
          setContact({
            phone: String(x.item.primaryPhone || site.phone),
            whatsapp: String(x.item.whatsappNumber || site.whatsapp),
          });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  if (!contact.whatsapp && !contact.phone) return null;
  return (
    <nav
      aria-label="Contact Vistar Cabs"
      className="floating-contact-nav flex items-end justify-between"
    >
      {contact.whatsapp ? (
        <a
          aria-label="WhatsApp Vistar Cabs"
          title="Chat on WhatsApp"
          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="floating-contact-link grid h-14 w-14 place-items-center rounded-full bg-[#20b86a] text-white shadow-xl sm:h-16 sm:w-16"
        >
          <WhatsAppMark />
        </a>
      ) : (
        <span />
      )}
      {contact.phone && (
        <a
          aria-label="Call Vistar Cabs"
          title="Call Vistar Cabs"
          href={`tel:${contact.phone}`}
          className="floating-contact-link grid h-14 w-14 place-items-center rounded-full bg-[#ff8a00] text-white shadow-xl sm:h-16 sm:w-16"
        >
          <PhoneCall size={22} />
        </a>
      )}
    </nav>
  );
}
