import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts, getBlogPost } from "@/lib/blogs";
import { site } from "@/lib/site";
import { metadataWithSeoOverride } from "@/lib/cms";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const path = `/blogs/${post.slug}`;
  return metadataWithSeoOverride(path, {
    title: post.title,
    description: post.summary,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  });
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const message = `Hello Vistar Cabs, I read your guide "${post.title}" and would like to enquire about a trip.`;
  const enquiry = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
    : "/contact-us";
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071a2f]/95 via-[#071a2f]/75 to-[#071a2f]/30" />
        <Header />
        <div className="container-wide pb-16 pt-36 sm:pb-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white"
          >
            <ArrowLeft size={14} /> All travel guides
          </Link>
          <p className="eyebrow mt-8 text-amber-300">{post.publishedLabel}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/85">
            {post.summary}
          </p>
        </div>
      </section>
      <article className="container-wide grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <div className="max-w-3xl">
          {post.sections.map((section, index) => (
            <section
              key={section.heading}
              className={index ? "mt-9 border-t border-slate-100 pt-8" : ""}
            >
              <h2 className="text-2xl font-black tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-sm leading-7 text-slate-600"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <section className="mt-10 rounded-2xl bg-[#f4f7fb] p-5 sm:p-7">
            <p className="eyebrow text-amber-700">Common questions</p>
            <div className="mt-4 divide-y divide-slate-200">
              {post.faqs.map((faq) => (
                <details key={faq.question} className="py-4">
                  <summary className="cursor-pointer text-sm font-black text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-2xl bg-[#071a2f] p-5 text-white sm:p-6">
          <p className="eyebrow text-amber-300">Need a cab?</p>
          <h2 className="mt-3 text-xl font-black">Send a trip enquiry</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Tell Vistar Cabs your pickup, destination, date and time. The team
            will contact you to discuss availability and terms.
          </p>
          <a
            href={enquiry}
            target={site.whatsapp ? "_blank" : undefined}
            rel={site.whatsapp ? "noreferrer" : undefined}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-black text-slate-950"
          >
            Enquire about a trip <MessageCircle size={15} />
          </a>
          <Link
            href="/#book"
            className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-white/80 hover:text-white"
          >
            Open website enquiry form <ArrowRight size={14} />
          </Link>
        </aside>
      </article>
      <SiteFooter />
    </main>
  );
}
