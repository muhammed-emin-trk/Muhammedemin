"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Premium Kişisel Marka Sitesi",
    description: "Güven odaklı iletişim, güçlü CTA alanları ve premium görsel dil ile tasarlanan çok bölümlü personal branding web sitesi.",
    tags: ["Next.js", "Tailwind", "Branding"],
  },
  {
    title: "Kurumsal Tanıtım & Teklif Platformu",
    description: "Hizmet anlatımı, referans alanları, süreç adımları ve teklif toplama altyapısıyla kurumsal müşteri kazanımına odaklanan yapı.",
    tags: ["UX Writing", "Lead Form", "SEO"],
  },
  {
    title: "Performans Odaklı Landing Page",
    description: "Reklam trafiğini satışa dönüştürmek için optimize edilen hızlı açılan, mobil odaklı ve A/B testine uygun landing page mimarisi.",
    tags: ["Performance", "Conversion", "Analytics"],
  },
];

export default function Projects() {
  return (
    <section id="projeler" className="py-20">
      <div className="section-container">
        <h3 className="text-2xl font-bold sm:text-3xl">Projeler / Portfolyo Yaklaşımı</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card"
            >
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-300/70 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
