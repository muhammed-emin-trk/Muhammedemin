"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Timer, RotateCcw, Smartphone, Info } from "lucide-react";

const TOTAL_TIME = 90;
const BOARD_SIZE = 14;
const TARGET_LENGTH = 6;
const MOVE_INTERVAL_MS = 300;
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Cell = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function keyOf(c: Cell) { return `${c.x}:${c.y}`; }
function rndSym() { return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; }
function makeTarget() { return Array.from({ length: TARGET_LENGTH }, rndSym).join(""); }

function nextHead(head: Cell, dir: Dir): Cell {
  if (dir === "UP")    return { x: head.x,     y: head.y - 1 };
  if (dir === "DOWN")  return { x: head.x,     y: head.y + 1 };
  if (dir === "LEFT")  return { x: head.x - 1, y: head.y     };
                       return { x: head.x + 1, y: head.y     };
}

function freeCell(forbidden: Set<string>): Cell {
  let c: Cell;
  do {
    c = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (forbidden.has(keyOf(c)));
  return c;
}

function generateCode(score: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  const yr = new Date().getFullYear().toString().slice(-2);
  return `OYUN-${rand}-${yr}${score}`;
}

const INIT_SNAKE: Cell[] = [
  { x: 3, y: 7 },
  { x: 2, y: 7 },
  { x: 1, y: 7 },
];

export function MiniGameDiscount() {
  const [started, setStarted] = useState(false);
  const [won,     setWon]     = useState(false);
  const [lost,    setLost]    = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [dir,      setDir]     = useState<Dir>("RIGHT");
  const [snake,    setSnake]   = useState<Cell[]>(INIT_SNAKE);
  const [target,   setTarget]  = useState(makeTarget);
  const [progress, setProgress] = useState("");
  const [score,    setScore]   = useState(0);
  const [winCode,  setWinCode] = useState("");

  // Food always shows the NEXT needed letter
  const nextChar = target[progress.length] ?? "";
  const [foodPos, setFoodPos] = useState<Cell>({ x: 9, y: 7 });

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const snakeSet   = useMemo(() => new Set(snake.map(keyOf)), [snake]);

  /* ── helpers ─────────────────────────────── */
  function applyDir(next: Dir) {
    setDir(cur => {
      if (cur === "UP"    && next === "DOWN")  return cur;
      if (cur === "DOWN"  && next === "UP")    return cur;
      if (cur === "LEFT"  && next === "RIGHT") return cur;
      if (cur === "RIGHT" && next === "LEFT")  return cur;
      return next;
    });
  }

  function reset() {
    setStarted(false); setWon(false); setLost(false);
    setTimeLeft(TOTAL_TIME); setDir("RIGHT");
    setSnake(INIT_SNAKE);
    const t = makeTarget();
    setTarget(t); setProgress(""); setScore(0);
    setWinCode("");
    setFoodPos(freeCell(new Set(INIT_SNAKE.map(keyOf))));
  }

  function start() { reset(); setTimeout(() => setStarted(true), 50); }

  /* ── keyboard ────────────────────────────── */
  useEffect(() => {
    if (!started || won || lost) return;
    const map: Record<string, Dir> = {
      ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
      w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
    };
    const fn = (e: KeyboardEvent) => {
      if (map[e.key]) { e.preventDefault(); applyDir(map[e.key]); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [started, won, lost]);

  /* ── touch / swipe ───────────────────────── */
  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
    if (Math.abs(dx) > Math.abs(dy)) applyDir(dx > 0 ? "RIGHT" : "LEFT");
    else applyDir(dy > 0 ? "DOWN" : "UP");
  }

  /* ── timer ───────────────────────────────── */
  useEffect(() => {
    if (!started || won || lost) return;
    const id = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { setLost(true); setStarted(false); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, won, lost]);

  /* ── movement loop ───────────────────────── */
  useEffect(() => {
    if (!started || won || lost) return;
    const id = setInterval(() => {
      setSnake(cur => {
        const head = nextHead(cur[0], dir);

        // wall collision
        if (head.x < 0 || head.y < 0 || head.x >= BOARD_SIZE || head.y >= BOARD_SIZE) {
          setLost(true); setStarted(false); return cur;
        }
        // self collision
        if (new Set(cur.map(keyOf)).has(keyOf(head))) {
          setLost(true); setStarted(false); return cur;
        }

        const ate  = keyOf(head) === keyOf(foodPos);
        const next = ate ? [head, ...cur] : [head, ...cur.slice(0, -1)];

        if (ate) {
          const newProgress = progress + nextChar;
          setProgress(newProgress);
          setScore(s => s + 15);

          if (newProgress.length >= TARGET_LENGTH) {
            setWon(true); setStarted(false);
            const code = generateCode(score + 15);
            setWinCode(code);
            window.localStorage.setItem("discount_code", code);
            window.localStorage.setItem("discount_code_at", Date.now().toString());
            return next;
          }
          // place food away from new snake
          setFoodPos(freeCell(new Set(next.map(keyOf))));
        }

        return next;
      });
    }, MOVE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [started, won, lost, dir, foodPos, progress, nextChar]);

  /* ── derived ─────────────────────────────── */
  const timerPct = (timeLeft / TOTAL_TIME) * 100;

  /* ── render ──────────────────────────────── */
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
            Yılanı sürerek yiyeceği topla. Her turda ekranda sıradaki harf gösterilir — sadece o harfi topla!
            Tüm harfleri tamamla ve <span className="font-semibold text-brand-bronze">%25 indirim</span> kodunu kazan.
          </p>
        </div>
        {started && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl bg-brand-ink/5 px-3 py-1.5 dark:bg-white/10">
              <Timer size={14} className={timeLeft <= 15 ? "animate-pulse text-rose-500" : "text-brand-bronze"} />
              <span className={`text-sm font-bold tabular-nums ${timeLeft <= 15 ? "text-rose-500" : "text-brand-ink dark:text-brand-cream"}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="rounded-xl bg-brand-gold/15 px-3 py-1.5 text-sm font-bold text-brand-bronze">
              ★ {score}
            </div>
          </div>
        )}
      </div>

      {/* ── Target progress strip ── */}
      {started && (
        <div className="mt-5 rounded-2xl border border-brand-gold/20 bg-brand-ink/5 px-5 py-4 dark:bg-white/5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-mist dark:text-brand-cream/50">
              Hedef sıra
            </p>
            <div className="flex items-center gap-1.5 text-xs text-brand-mist dark:text-brand-cream/50">
              <Info size={11} />
              Sonraki: <span className="ml-1 text-base font-black text-brand-bronze">{nextChar}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {target.split("").map((ch, i) => {
              const isCollected = i < progress.length;
              const isNext = i === progress.length;
              return (
                <motion.span
                  key={i}
                  animate={isNext ? { scale: [1, 1.15, 1] } : {}}
                  transition={isNext ? { duration: 1.2, repeat: Infinity } : {}}
                  className={`grid h-11 w-11 place-items-center rounded-xl font-display text-xl font-black transition-all ${
                    isCollected
                      ? "bg-emerald-500 text-white shadow-md"
                      : isNext
                      ? "border-2 border-brand-bronze bg-brand-gold/15 text-brand-bronze shadow-[0_0_16px_rgba(184,150,98,0.4)]"
                      : "bg-white/60 text-brand-ink/30 dark:bg-white/10 dark:text-brand-cream/20"
                  }`}
                >
                  {isCollected ? "✓" : ch}
                </motion.span>
              );
            })}
          </div>
          {/* Timer bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/30 dark:bg-white/10">
            <motion.div
              className={`h-full rounded-full ${
                timerPct > 50 ? "bg-emerald-500" : timerPct > 25 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${timerPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      )}

      {/* ── Game Board ── */}
      <div className="min-h-[600px]">
        {started && (
          <div
            className="mt-5 select-none touch-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
          {/* Board */}
          <div
            className="mx-auto overflow-hidden rounded-2xl border-2 border-brand-gold/30 bg-brand-ink/8 dark:bg-black/40"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
              gap: "1px",
              width: 476,
              height: 476,
              padding: "6px",
              background: "rgba(0,0,0,0.06)",
            }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
              const x   = idx % BOARD_SIZE;
              const y   = Math.floor(idx / BOARD_SIZE);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isBody = !isHead && snakeSet.has(`${x}:${y}`);
              const isFood = foodPos.x === x && foodPos.y === y;

              return (
                <div
                  key={idx}
                  className={`flex aspect-square items-center justify-center font-display font-black transition-all ${
                    isHead
                      ? "rounded-lg bg-brand-bronze text-white z-10"
                      : isBody
                      ? "rounded bg-brand-gold/60 dark:bg-brand-gold/40"
                      : isFood
                      ? "rounded-xl z-10 animate-pulse"
                      : "rounded bg-white/40 dark:bg-white/[0.03]"
                  }`}
                  style={
                    isFood
                      ? {
                          background: "linear-gradient(135deg, #10b981, #059669)",
                          boxShadow: "0 0 12px rgba(16,185,129,0.7), 0 0 24px rgba(16,185,129,0.3)",
                          fontSize: 16,
                          color: "#fff",
                        }
                      : isHead
                      ? { fontSize: 12 }
                      : {}
                  }
                >
                  {isHead ? "▶" : isFood ? nextChar : ""}
                </div>
              );
            })}
          </div>

          {/* D-pad */}
          <div className="mt-5 flex flex-col items-center gap-1">
            <p className="mb-1 flex items-center gap-1.5 text-xs text-brand-mist dark:text-brand-cream/50">
              <Smartphone size={11} />
              Kaydırarak veya butonlarla oyna · Klavye: Ok tuşları / WASD
            </p>
            <button
              onPointerDown={() => applyDir("UP")}
              className="grid h-13 w-13 place-items-center rounded-2xl border-2 border-brand-gold/35 bg-white/80 text-2xl text-brand-ink shadow active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream"
              style={{ height: 52, width: 52 }}
            >↑</button>
            <div className="flex gap-1">
              {(["←", "↓", "→"] as const).map((arrow, i) => {
                const dirs: Dir[] = ["LEFT", "DOWN", "RIGHT"];
                return (
                  <button
                    key={arrow}
                    onPointerDown={() => applyDir(dirs[i])}
                    className="grid h-13 w-13 place-items-center rounded-2xl border-2 border-brand-gold/35 bg-white/80 text-2xl text-brand-ink shadow active:scale-90 active:bg-brand-gold/20 dark:bg-white/10 dark:text-brand-cream"
                    style={{ height: 52, width: 52 }}
                  >{arrow}</button>
                );
              })}
            </div>
          </div>
          </div>
        )}

      {/* ── Idle state ── */}
      {!started && !won && !lost && (
        <div className="mt-6 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2 text-xs text-brand-mist dark:text-brand-cream/50">
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">⌨️ Ok tuşları / WASD</span>
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">👆 Ekrana kaydır</span>
            <span className="flex items-center gap-1.5 rounded-full border border-brand-gold/30 px-3 py-1.5">🎮 D-pad butonlar</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={start}
            className="btn-primary px-8 py-4 text-base"
          >
            🎮 Oyunu Başlat
          </motion.button>
        </div>
      )}
      </div>

      {/* ── Won ── */}
      <AnimatePresence>
        {won && winCode !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-6 overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-50 p-6 dark:bg-emerald-900/20"
          >
            <p className="flex items-center gap-2 font-display text-2xl text-emerald-700 dark:text-emerald-300">
              <Trophy size={22} /> Tebrikler! 🎉
            </p>
            <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">
              {score} puan topladın! İşte indirim kodun:
            </p>
            <div className="mt-3 inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-5 py-3 font-mono text-2xl font-black tracking-widest text-white shadow-lg">
              {winCode}
            </div>
            <p className="mt-3 text-xs text-emerald-600 dark:text-emerald-400">
              İletişim formuna bu kodu yazarak %25 indirimden yararlan.
            </p>
            <button onClick={reset} className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-700 hover:underline dark:text-emerald-400">
              <RotateCcw size={14} /> Tekrar Oyna
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lost ── */}
      <AnimatePresence>
        {lost && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-50 p-5 dark:bg-rose-900/20"
          >
            <p className="font-semibold text-rose-600 dark:text-rose-400">
              {timeLeft === 0 ? "⏱ Süre doldu!" : "💥 Duvara veya kendine çarptın!"}
            </p>
            <p className="mt-1 text-sm text-rose-500/80">Skor: {score} puan</p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={start}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rose-400/40 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-100 dark:text-rose-400"
            >
              <RotateCcw size={14} /> Yeniden Başlat
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
