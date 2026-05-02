import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { About } from "@/components/site/about";
import { Skills } from "@/components/site/skills";
import { TechStack } from "@/components/site/tech-stack";
import { Services } from "@/components/site/services";
import { Pricing } from "@/components/site/pricing";
import { Process } from "@/components/site/process";
import { ProjectsPreview } from "@/components/site/projects-preview";
import { Achievements } from "@/components/site/achievements";
import { Journey } from "@/components/site/journey";
import { Testimonials } from "@/components/site/testimonials";
import { TrustMarquee } from "@/components/site/marquee";
import { BlogPreview } from "@/components/site/blog-preview";
import { Faq } from "@/components/site/faq";
import { ContactCta } from "@/components/site/contact-cta";
import { MiniGameDiscount } from "@/components/site/mini-game-discount";
import { getProjects, getPosts, getTestimonials, getFaqs, getSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [projects, posts, testimonials, faqs, settings] = await Promise.all([
    getProjects(),
    getPosts(),
    getTestimonials(),
    getFaqs(),
    getSettings(),
  ]);

  return (
    <main>
      <Hero settings={settings} />
      <Stats />
      <TrustMarquee />
      <About />
      <Skills />
      <TechStack />
      <Services />
      <Pricing />
      <Process />
      <ProjectsPreview projects={projects} />
      <Achievements />
      <Journey />
      <Testimonials items={testimonials} />
      <BlogPreview posts={posts} />

      {/* Mini Oyun */}
      <section className="section-container section-block">
        <MiniGameDiscount />
      </section>

      <Faq items={faqs} />
      <ContactCta />
    </main>
  );
}
