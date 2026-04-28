"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TrustSection from "@/components/TrustSection";
import Packages from "@/components/Packages";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Process />
          <TrustSection />
          <Packages />
          <Projects />
          <Gallery />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
