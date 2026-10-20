import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Why } from "@/components/Why";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";
import { Contact } from "@/components/Contact";
import { ScrollFx } from "@/components/ScrollFx";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { faq } from "@/content/faq";
import { site } from "@/content/site";

// Sidfoten visar innevarande år – bygg om sidan i bakgrunden en gång i timmen.
export const revalidate = 3600;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: site.name, url: site.url, description: site.description },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
        })),
      },
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main">Hoppa till innehållet</a>
      <ScrollFx />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Industries />
        <Portfolio />
        <Pricing />
        <Process />
        <Why />
        <Faq />
        <ClosingCta />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
