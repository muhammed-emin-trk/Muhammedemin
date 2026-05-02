"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Timer, RotateCcw, Smartphone } from "lucide-react";

const DISCOUNT_CODE = "OYUN25";
const TOTAL_TIME = 60;
const BOARD_SIZE = 12;
const TARGET_LENGTH = 6;
const MOVE_INTERVAL_MS = 280; // daha yavaş
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Cell = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function keyOf(c: Cell) { return `${c.x}:${c.y}`; }
function rndSym() { return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; }
function makeTarget() { return Array.from({ length: TARGET_LENGTH }, rndSym).join(""); }
function nextHead(head: Cell, dir: Dir): Cell {
  if (dir === "UP") return { x: head.x, y: head.y - 1 };
  if (dir === "DOWN") return { x: head.x, y: head.y + 1 };
  if (dir === "LEFT") return { x: head.x - 1, y: head.y };
  return { x: head.x + 1, y: head.y };
}
function freeCell(forbidden: Set<string>): Cell {
  let c: Cell;
  do { c = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) }; }
  while (forbidden.has(keyOf(c)));
  return c;
}

const INIT_SNAKE: Cell[] = [{ x: 3, y: 6 }, { x: 2, y: 6 }, { x: 1, y: 6 }];

export function MiniGameDiscount() {
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [dir, setDir] = useState<Dir>("RIGHT");
  const [snake, setSnake] = useState<Cell[]>(INIT_SNAKE);
  const [target, setTarget] = useState(makeTarget);
  const [progress, setProgress] = useState("");
  const [food, setFood] = useState<{ pos: Cell; symbol: string }>({
    pos: { x: 8, y: 6 },
    symbol: rndSym(),
  });
  const [score, setScore] = useState(0);

  // Touch tracking
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const snakeSet = useMemo(() => new Set(snake.map(keyOf)), [snake]);

  function applyDir(next: Dir) {
    setDir((cur) => {
      if (cur === "UP" && next === "DOWN") return cur;
      if (cur === "DOWN" && next === "UP") return cur;
      if (cur === "LEFT" && next === "RIGHT") return cur;
      if (cur === "RIGHT" && next === "LEFT") return cur;
      return next;
    });
  }

  function reset() {
    setStarted(false); setWon(false); setLost(false);
    setTimeLeft(TOTAL_TIME); setDir("RIGHT");
    setSnake(INIT_SNAKE);
    const t = makeTarget(); setTarget(t); setProgress("");
    setFood({ pos: freeCell(new Set(INIT_SNAKE.map(keyOf))), symbol: rndSym() });
    setScore(0);
  }

  function start() { reset(); setTimeout(() => setStarted(true), 50); }

  // Keyboard
  useEffect(() => {
    if (!started || won || lost) return;
    const fn = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      };
      if (map[e.key]) { e.preventDefault(); applyDir(map[e.key]); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [started, won, lost]);

  // Touch / swipe on the board
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) applyDir(dx > 0 ? "RIGHT" : "LEFT");
    else applyDir(dy > 0 ? "DOWN" : "UP");
  }

  // Timer
  useEffect(() => {
    if (!started || won || lost) return;
    const id = window.setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { setLost(true); setStarted(false); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, won, lost]);

  // Move
  useEffect(() => {
    if (!started || won || lost) return;
    const id = window.setInterval(() => {
      setSnake((cur) => {
        const head = nextHead(cur[0], dir);
        if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE) {
          setLost(true); setStarted(false); return cur;
        }
        const bodySet = new Set(cur.map(keyOf));
        if (bodySet.has(keyOf(head))) { setLost(true); setStarted(false); return cur; }
        const ate = keyOf(head) === keyOf(food.pos);
        const next = ate ? [head, ...cur] : [head, ...cur.slice(0, -1)];
        if (ate) {
          const typed = progress + food.symbol;
          if (!target.startsWith(typed)) { setLost(true); setStarted(false); return cur; }
          setProgress(typed);
          setScore((s) => s + 10);
          if (typed.length >= TARGET_LENGTH) {
            setWon(true); setStarted(false);
            window.localStorage.setItem("discount_code", DISCOUNT_CODE);
            return next;
          }
          setFood({ pos: freeCell(new Set(next.map(keyOf))), symbol: rndSym() });
        }
        return next;
      });
    }, MOVE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [started, won, lost, dir, food, progress, target]);

  const timerPct = (timeLeft / TOTAL_TIME) * 100;

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-gold/30 bg-white/80 p-6 backdrop-blur dark:bg-white/[0.05] md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Mini Oyun</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-brand-ink dark:text-brand-cream">
            Alfanümerik Yılan 🐍
          </h2>
          <p className="mt-2 max-w-lg text-sm text-brand-mist dark:text-brand-cream/70">
            Yılanı yönet, doğru sıradaki karakterleri topla ve{" "}
            <span className="font-semibold text-brand-bronze">%25 indirim</span> kodunu kazan!
          </p>
        </div>
        {started && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl bg-brand-ink/5 px-3 py-1.5 text-sm font-semibold dark:bg-white/10">
              <Timer size={14} className={timeLeft <= 10 ? "text-rose-500 animate-pulse" : "text-brand-bronze"} />
              <span className={timeLeft <= 10 ? "text-rose-500" : "text-brand-ink dark:text-brand-cream"}>
                {timeLeft}s
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-brand-gold/10 px-3 py-1.5 text-sm font-semibold text-brand-bronze">
              ★ {score}
            </div>
          </div>
        )}
      </div>

      {/* Target progress */}
      {started && (
        <div className="mt-5 rounded-2xl border border-brand-gold/20 bg-black/5 px-5 py-3 dark:bg-black/20">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-brand-mist">Hedef sıra</p>
          <div className="flex flex-wrap gap-2">
            {target.split("").map((ch, i) => {
              const collected = progress[i];
              return (
                <span
                  key={i}
                  className={`grid h-9 w-9 place-items-center rounded-xl font-display text-lg font-bold transition-all ${
                    collected
                      ? "bg-emerald-500 text-white scale-110"
                      : i === progress.length
                      ? "border-2 border-brand-bronze bg-brand-gold/10 text-brand-bronze animate-pulse"
                      : "bg-white/70 text-brand-ink/40 dark:bg-white/10 dark:text-brand-cream/30"
                  }`}
                >
                  {collected || ch}
                </span>
              );
            })}
          </div>
          {/* Timer bar */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brand-gold/20">
            <motion.div
              className={`h-full rounded-full transition-colors ${
                timerPct > 50 ? "bg-emerald-500" : timerPct > 25 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${timerPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Game board */}
      {started && (
        <div
          className="mt-5 select-none touch-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Board grid */}
          <div
            className="mx-auto grid w-full rounded-2xl border border-brand-gold/20 bg-black/5 p-2 dark:bg-black/30"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gap: "2px",
              maxWidth: 460,
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
              const x = idx % BOARD_SIZE;
              const y = Math.floor(idx / BOARD_SIZE);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isBody = !isHead && snakeSet.has(`${x}:${y}`);
              const isFood = food.pos.x === x && food.pos.y === y;
              const isNext = !isHead && !isBody && !isFood;

              return (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center rounded-[4px] text-[10px] font-bold transition-all ${
                    isHead
                      ? "bg-brand-bronze text-white shadow-glow scale-110 z-10 relative rounded-lg"
                      : isBody
                      ? "bg-brand-gold/70 text-brand-ink dark:bg-brand-gold/50"
                      : isFood
                      ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md scale-105 relative z-10 rounded-lg"
                      : "bg-white/50 dark:bg-white/[0.03]"
                  }`}
                >
                  {isHead && "●"}
                  {isFood && food.symbol}
                </div>
              );
            })}
          </div>

          {/* D-pad controller */}
          <div className="mt-5 flex flex-col items-center gap-1.5">
            <p className="flex items-center gap-1.5 text-xs text-brand-mist dark:text-brand-cream/50 mb-1">
              <Smartphone size={11} /> Kaydırarak veya butonlarla oyna
            </p>
            <button
              onPointerDown={() => applyDir("UP")}
              className="grid h-12 w-12 place-items-center rounded-xl border-2 border-brand-gold/30 bg-white/80 text-xl text-brand-ink active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream shadow-sm"
            >↑</button>
            <div className="flex gap-1.5">
              <button
                onPointerDown={() => applyDir("LEFT")}
                className="grid h-12 w-12 place-items-center rounded-xl border-2 border-brand-gold/30 bg-white/80 text-xl text-brand-ink active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream shadow-sm"
              >←</button>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gold/10 text-brand-bronze">
                <span className="text-xs font-bold">ME</span>
              </div>
              <button
                onPointerDown={() => applyDir("RIGHT")}
                className="grid h-12 w-12 place-items-center rounded-xl border-2 border-brand-gold/30 bg-white/80 text-xl text-brand-ink active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream shadow-sm"
              >→</button>
            </div>
            <button
              onPointerDown={() => applyDir("DOWN")}
              className="grid h-12 w-12 place-items-center rounded-xl border-2 border-brand-gold/30 bg-white/80 text-xl text-brand-ink active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream shadow-sm"
            >↓</button>
          </div>
        </div>
      )}

      {/* Idle state */}
      {!started && !won && !lost && (
        <div className="mt-6 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-3 text-xs text-brand-mist dark:text-brand-cream/50">
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">⌨️ Ok tuşları / WASD</span>
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">👆 Ekrana kaydır</span>
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">🎮 D-pad butonlar</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={start}
            className="btn-primary px-8 py-4 text-base"
          >
            🎮 Oyunu Başlat
          </motion.button>
        </div>
      )}

      {/* Won */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-50 p-6 dark:bg-emerald-900/20"
          >
            <p className="flex items-center gap-2 font-display text-2xl text-emerald-700 dark:text-emerald-300">
              <Trophy size={22} /> Tebrikler! 🎉
            </p>
            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              Skor: <strong>{score}</strong> puan. İndirim kodun:
            </p>
            <div className="mt-3 inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-5 py-3 font-mono text-xl font-bold text-white shadow-lg">
              {DISCOUNT_CODE}
              <button
                onClick={() => navigator.clipboard?.writeText(DISCOUNT_CODE)}
                className="text-xs font-normal opacity-80 hover:opacity-100"
              >kopyala</button>
            </div>
            <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
              Bu kodu iletişim formundaki konu alanına yazarak %25 indirimden yararlan.
            </p>
            <button
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline dark:text-emerald-400"
            >
              <RotateCcw size={14} /> Tekrar Oyna
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lost */}
      <AnimatePresence>
        {lost && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-50 p-5 dark:bg-rose-900/20"
          >
            <p className="font-semibold text-rose-600 dark:text-rose-400">
              {timeLeft === 0 ? "⏱ Süre doldu!" : "💥 Çarpıştın veya yanlış karakter!"}
            </p>
            <p className="mt-1 text-sm text-rose-500 dark:text-rose-400/80">Skor: {score} puan</p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={start}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:text-rose-400 dark:hover:bg-rose-900/30"
            >
              <RotateCcw size={14} /> Yeniden Başlat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
