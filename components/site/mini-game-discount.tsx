"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Timer, RotateCcw } from "lucide-react";

const DISCOUNT_CODE = "OYUN25";
const TOTAL_TIME = 40;
const BOARD_SIZE = 10;
const TARGET_LENGTH = 8;
const MOVE_INTERVAL_MS = 170;
const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Cell = { x: number; y: number };
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function keyOf(cell: Cell) {
  return `${cell.x}:${cell.y}`;
}

function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function makeInitialTarget() {
  return Array.from({ length: TARGET_LENGTH }, () => getRandomSymbol()).join("");
}

function nextHead(head: Cell, dir: Dir): Cell {
  if (dir === "UP") return { x: head.x, y: head.y - 1 };
  if (dir === "DOWN") return { x: head.x, y: head.y + 1 };
  if (dir === "LEFT") return { x: head.x - 1, y: head.y };
  return { x: head.x + 1, y: head.y };
}

function randomFreeCell(forbidden: Set<string>) {
  while (true) {
    const candidate = { x: Math.floor(Math.random() * BOARD_SIZE), y: Math.floor(Math.random() * BOARD_SIZE) };
    if (!forbidden.has(keyOf(candidate))) return candidate;
  }
}

export function MiniGameDiscount() {
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const [dir, setDir] = useState<Dir>("RIGHT");
  const [snake, setSnake] = useState<Cell[]>([{ x: 2, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 5 }]);

  const [target, setTarget] = useState(makeInitialTarget());
  const [progress, setProgress] = useState("");

  const [food, setFood] = useState<{ pos: Cell; symbol: string }>({
    pos: { x: 7, y: 5 },
    symbol: getRandomSymbol(),
  });

  const snakeSet = useMemo(() => new Set(snake.map(keyOf)), [snake]);

  function reset() {
    setStarted(false);
    setWon(false);
    setLost(false);
    setTimeLeft(TOTAL_TIME);
    setDir("RIGHT");
    const baseSnake = [{ x: 2, y: 5 }, { x: 1, y: 5 }, { x: 0, y: 5 }];
    setSnake(baseSnake);
    const freshTarget = makeInitialTarget();
    setTarget(freshTarget);
    setProgress("");
    const forbidden = new Set(baseSnake.map(keyOf));
    setFood({ pos: randomFreeCell(forbidden), symbol: getRandomSymbol() });
  }

  function start() {
    reset();
    setStarted(true);
  }

  useEffect(() => {
    if (!started || won || lost) return;

    const onKey = (e: KeyboardEvent) => {
      setDir((current) => {
        if (e.key === "ArrowUp" && current !== "DOWN") return "UP";
        if (e.key === "ArrowDown" && current !== "UP") return "DOWN";
        if (e.key === "ArrowLeft" && current !== "RIGHT") return "LEFT";
        if (e.key === "ArrowRight" && current !== "LEFT") return "RIGHT";
        return current;
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, won, lost]);

  useEffect(() => {
    if (!started || won || lost) return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setLost(true);
          setStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [started, won, lost]);

  useEffect(() => {
    if (!started || won || lost) return;

    const id = window.setInterval(() => {
      setSnake((currentSnake) => {
        const currentHead = currentSnake[0];
        const newHead = nextHead(currentHead, dir);

        const outside = newHead.x < 0 || newHead.y < 0 || newHead.x >= BOARD_SIZE || newHead.y >= BOARD_SIZE;
        if (outside) {
          setLost(true);
          setStarted(false);
          return currentSnake;
        }

        const bodySet = new Set(currentSnake.map(keyOf));
        if (bodySet.has(keyOf(newHead))) {
          setLost(true);
          setStarted(false);
          return currentSnake;
        }

        const ateFood = keyOf(newHead) === keyOf(food.pos);
        const nextSnake = ateFood ? [newHead, ...currentSnake] : [newHead, ...currentSnake.slice(0, -1)];

        if (ateFood) {
          const typed = `${progress}${food.symbol}`;
          if (!target.startsWith(typed)) {
            setLost(true);
            setStarted(false);
            return currentSnake;
          }

          setProgress(typed);
          if (typed.length >= TARGET_LENGTH) {
            setWon(true);
            setStarted(false);
            window.localStorage.setItem("discount_code", DISCOUNT_CODE);
            return nextSnake;
          }

          const forbidden = new Set(nextSnake.map(keyOf));
          setFood({ pos: randomFreeCell(forbidden), symbol: getRandomSymbol() });
        }

        return nextSnake;
      });
    }, MOVE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [started, won, lost, dir, food, progress, target]);

  function changeDir(next: Dir) {
    setDir((current) => {
      if (current === "UP" && next === "DOWN") return current;
      if (current === "DOWN" && next === "UP") return current;
      if (current === "LEFT" && next === "RIGHT") return current;
      if (current === "RIGHT" && next === "LEFT") return current;
      return next;
    });
  }

  return (
    <div className="glass-card p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-brand-bronze">Mini Oyun</p>
      <h2 className="mt-2 font-display text-3xl font-semibold text-brand-ink dark:text-brand-cream">Alfanümerik Yılan</h2>
      <p className="mt-3 text-sm text-brand-mist dark:text-brand-cream/70">
        Ok tuşlarıyla yılanı yönet. Doğru sıradaki karakterleri topla: <strong>{target}</strong>. Tamamlayana
        <strong> %25 indirim kodu</strong>!
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
              <span>İlerleme: {progress || "-"}</span>
              <span className="inline-flex items-center gap-1"><Timer size={15} /> {timeLeft}s</span>
            </div>

            <div className="grid w-fit grid-cols-10 gap-1 rounded-xl border border-brand-gold/20 bg-black/5 p-2 dark:bg-black/20">
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
                const x = idx % BOARD_SIZE;
                const y = Math.floor(idx / BOARD_SIZE);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isBody = !isHead && snakeSet.has(`${x}:${y}`);
                const isFood = food.pos.x === x && food.pos.y === y;

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-bold ${
                      isHead
                        ? "bg-brand-bronze text-white"
                        : isBody
                          ? "bg-brand-gold/70 text-brand-ink"
                          : isFood
                            ? "bg-emerald-500 text-white"
                            : "bg-white/70 text-brand-ink dark:bg-white/10 dark:text-brand-cream"
                    }`}
                  >
                    {isFood ? food.symbol : ""}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={() => changeDir("UP")} className="rounded-lg border px-3 py-1">↑</button>
              <button onClick={() => changeDir("LEFT")} className="rounded-lg border px-3 py-1">←</button>
              <button onClick={() => changeDir("DOWN")} className="rounded-lg border px-3 py-1">↓</button>
              <button onClick={() => changeDir("RIGHT")} className="rounded-lg border px-3 py-1">→</button>
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
            <p className="font-semibold text-rose-600 dark:text-rose-400">Yanlış karakter, çarpışma veya süre bitimi. Tekrar dene.</p>
            <button onClick={start} className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand-gold/40 px-4 py-2 text-brand-ink dark:text-brand-cream"><RotateCcw size={15} /> Yeniden Başlat</button>
          </div>
        )}
      </div>
    </div>
  );
}
