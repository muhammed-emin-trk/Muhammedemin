"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Healthcare Storytelling Profile",
    description: "Hem sağlık profesyonelliğini hem de kişisel marka değerini tek bir premium web deneyiminde birleştiren kişisel site.",
    tags: ["Next.js", "Tailwind", "Branding"],
  },
  {
    title: "Volunteer Experience Showcase",
    description: "European Voluntary Service deneyimlerini etkili bir timeline ve güven veren bir anlatım yapısında sunan bölüm tasarımı.",
    tags: ["UX Writing", "Motion", "UI"],
  },
  {
    title: "Photo-First Portfolio Layout",
    description: "Fotoğrafları öne çıkaran, mobilde hızlı ve masaüstünde premium hissi veren canlı galeri sistemi.",
    tags: ["Portfolio", "Visual Design", "Performance"],
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
