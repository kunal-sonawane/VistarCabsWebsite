import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import FloatingContact from "@/components/FloatingContact";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Vistar Cabs | Cab Service in Nashik & Maharashtra",
    template: "%s | Vistar Cabs",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Vistar Cabs | Your journey, our priority",
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
