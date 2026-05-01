"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Timer, RotateCcw } from "lucide-react";

const DISCOUNT_CODE = "OYUN25";
const TOTAL_QUESTIONS = 5;
const TOTAL_TIME = 25;

function randomQuestion() {
  const a = Math.floor(Math.random() * 31) + 10;
  const b = Math.floor(Math.random() * 31) + 10;
  return { a, b, answer: a + b };
}

export function MiniGameDiscount() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [current, setCurrent] = useState(randomQuestion());
  const [input, setInput] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    if (!started || won || lost) return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setLost(true);
          setStarted(false);
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [started, won, lost]);

  function reset() {
    setStarted(false);
    setQuestionIndex(0);
    setTimeLeft(TOTAL_TIME);
    setCurrent(randomQuestion());
    setInput("");
    setWon(false);
    setLost(false);
  }

  function start() {
    reset();
    setStarted(true);
  }

  function checkAnswer() {
    if (Number(input) !== current.answer) {
      setLost(true);
      setStarted(false);
      return;
    }

    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setWon(true);
      setStarted(false);
      window.localStorage.setItem("discount_code", DISCOUNT_CODE);
      return;
    }

    setQuestionIndex((p) => p + 1);
    setCurrent(randomQuestion());
    setInput("");
  }

  return (
    <div className="glass-card p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Mini Oyun</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-brand-ink dark:text-brand-cream">Matematik Sprinti</h2>
      <p className="mt-3 text-sm text-brand-mist dark:text-brand-cream/70">
        25 saniyede 5 doğru işlem çöz. Başaranlara <strong>%25 indirim kodu</strong> veriyoruz.
      </p>

      <div className="mt-5 rounded-2xl border border-brand-gold/30 bg-white/70 p-4 dark:bg-white/5">
        {!started && !won && !lost && (
          <button onClick={start} className="btn-primary rounded-full px-6 py-3 text-sm font-semibold text-white">
            Oyunu Başlat
          </button>
        )}

        {started && (
          <div className="grid gap-4">
            <div className="flex items-center justify-between text-sm text-brand-ink dark:text-brand-cream">
              <span>Soru: {questionIndex + 1}/{TOTAL_QUESTIONS}</span>
              <span className="inline-flex items-center gap-1"><Timer size={15} /> {timeLeft}s</span>
            </div>
            <p className="text-2xl font-semibold text-brand-ink dark:text-brand-cream">{current.a} + {current.b} = ?</p>
            <div className="flex gap-3">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-xl border border-brand-gold/35 bg-white px-4 py-2.5 text-brand-ink outline-none dark:bg-white/10 dark:text-brand-cream"
                placeholder="Cevap"
              />
              <button onClick={checkAnswer} className="rounded-xl bg-brand-bronze px-5 py-2.5 text-white">Kontrol</button>
            </div>
          </div>
        )}

        {won && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 text-sm">
            <p className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400"><Trophy size={16} /> Tebrikler! Kodu kazandın:</p>
            <p className="w-fit rounded-lg bg-emerald-500 px-4 py-2 font-mono text-lg text-white">{DISCOUNT_CODE}</p>
            <p className="text-brand-mist dark:text-brand-cream/70">Kodu aşağıdaki iletişim formunda <strong>İndirim Kodu</strong> alanına yazıp gönder.</p>
            <button onClick={reset} className="inline-flex w-fit items-center gap-2 text-brand-bronze"><RotateCcw size={15} /> Tekrar Dene</button>
          </motion.div>
        )}

        {lost && (
          <div className="grid gap-2 text-sm">
            <p className="font-semibold text-rose-600 dark:text-rose-400">Bu turu geçemedin. Daha zoru için tekrar dene.</p>
            <button onClick={start} className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand-gold/40 px-4 py-2 text-brand-ink dark:text-brand-cream"><RotateCcw size={15} /> Yeniden Başlat</button>
          </div>
        )}
      </div>
    </div>
  );
}
