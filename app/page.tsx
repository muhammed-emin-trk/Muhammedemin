import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { ProjectsPreview } from "@/components/site/projects-preview";
import { ContactCta } from "@/components/site/contact-cta";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="space-y-20 pb-20">
        <Hero />
        <About />
        <Services />
        <ProjectsPreview />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
