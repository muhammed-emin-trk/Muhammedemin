import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { ProjectsPreview } from "@/components/site/projects-preview";
import { Testimonials } from "@/components/site/testimonials";
import { TrustMarquee } from "@/components/site/marquee";
import { BlogPreview } from "@/components/site/blog-preview";
import { Faq } from "@/components/site/faq";
import { ContactCta } from "@/components/site/contact-cta";


const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Emin Türkoğlu",
  alternateName: "Muhammed Emin",
  url: "https://www.muhammedeminturk.com.tr",
  jobTitle: ["Hemşire", "Yazılım Geliştirici"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bursa",
    addressCountry: "TR",
  },
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Hero />
      <Stats />
      <TrustMarquee />
      <About />
      <Skills />
      <Services />
      <Process />
      <ProjectsPreview />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <ContactCta />
    </main>
  );
}
