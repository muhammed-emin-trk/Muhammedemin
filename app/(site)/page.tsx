import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { TechStack } from "@/components/site/tech-stack";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { ProjectsPreview } from "@/components/site/projects-preview";
import { Achievements } from "@/components/site/achievements";
import { Journey } from "@/components/site/journey";
import { Testimonials } from "@/components/site/testimonials";
import { TrustMarquee } from "@/components/site/marquee";
import { BlogPreview } from "@/components/site/blog-preview";
import { Faq } from "@/components/site/faq";
import { ContactCta } from "@/components/site/contact-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <TrustMarquee />
      <About />
      <Skills />
      <TechStack />
      <Services />
      <Process />
      <ProjectsPreview />
      <Achievements />
      <Journey />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <ContactCta />
    </main>
  );
}
