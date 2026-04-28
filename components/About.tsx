"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="hakkimda" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold sm:text-3xl">Hakkımda</h3>
          <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
            Uludağ Üniversitesi Hemşirelik Bölümü mezunu olarak sağlık sektöründe güçlü bir insan odaklı bakış açısı
            kazandım. Bursa Şehir Hastanesi&apos;nde hemşire olarak görev yaparken empati, dikkat ve kriz yönetimi gibi
            becerilerimi her gün aktif olarak kullanıyorum.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
            Bununla birlikte yazılım ve programlama alanına duyduğum tutku sayesinde web geliştirme, kullanıcı
            deneyimi ve dijital pazarlama konularında kendimi sürekli geliştiriyorum. Sağlık ve teknolojiyi bir araya
            getirerek daha erişilebilir, etkili ve yenilikçi dijital çözümler üretmeyi hedefliyorum.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
