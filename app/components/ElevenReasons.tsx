"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface ReasonsProps {
  onNext: () => void;
}

const STAR_POSITIONS = [
  { x: 50, y: 20 },
  { x: 20, y: 32 },
  { x: 78, y: 30 },
  { x: 12, y: 55 },
  { x: 85, y: 52 },
  { x: 35, y: 60 },
  { x: 65, y: 62 },
  { x: 22, y: 78 },
  { x: 76, y: 76 },
  { x: 50, y: 78 },
  { x: 50, y: 46 },
];

const STAR_COLORS = [
  "#FF75B5", "#BCA7FF", "#FFB6D9", "#FF75B5", "#BCA7FF",
  "#FFD6A5", "#BCA7FF", "#FFB6D9", "#FF75B5", "#BCA7FF", "#FF75B5",
];

export default function ElevenReasons({ onNext }: ReasonsProps) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [allDone, setAllDone] = useState(false);

  const handleStar = (i: number) => {
    setActive(i);
    if (!revealed.includes(i)) {
      const next = [...revealed, i];
      setRevealed(next);
      if (next.length === config.reasons.length) {
        setTimeout(() => setAllDone(true), 800);
      }
    }
  };

  const closeCard = () => setActive(null);

  return (
    <div
      className="full-screen relative"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #1a0a3a 0%, #100B25 80%)" }}
    >
      <GalaxyCanvas starCount={150} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 400, height: 400, background: "rgba(255,117,181,0.07)", top: "0", right: "0", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 300, height: 300, background: "rgba(188,167,255,0.07)", bottom: "0", left: "0", animationDelay: "3s" }} />

      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-6 px-6">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {config.reasonsHeading}
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base mb-4"
          style={{ fontFamily: "var(--font-dancing)", color: "#BCA7FF", fontSize: "1.1rem" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {config.reasonsSubtitle}
        </motion.p>
        <motion.p
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(188,167,255,0.5)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {revealed.length} / {config.reasons.length} discovered
        </motion.p>
      </div>

      {/* Star field */}
      <div className="relative z-10 mx-auto" style={{ maxWidth: 700, height: "55vh", minHeight: 350 }}>
        {config.reasons.map((reason, i) => {
          const isRevealed = revealed.includes(i);
          const color = STAR_COLORS[i % STAR_COLORS.length];

          return (
            <motion.button
              key={i}
              onClick={() => handleStar(i)}
              className="absolute cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{
                left: `${STAR_POSITIONS[i].x}%`,
                top: `${STAR_POSITIONS[i].y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={`Star ${i + 1}: ${isRevealed ? reason : "Undiscovered"}`}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                style={{
                  color: color,
                  fontSize: isRevealed ? "2rem" : "1.6rem",
                  filter: isRevealed
                    ? `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 24px ${color})`
                    : `drop-shadow(0 0 4px ${color})`,
                  opacity: isRevealed ? 1 : 0.5,
                }}
                animate={
                  allDone
                    ? { scale: [1, 1.4, 1], opacity: [1, 1, 1] }
                    : isRevealed
                    ? { scale: [1, 1.1, 1], opacity: 1 }
                    : {
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.05, 1],
                      }
                }
                transition={{
                  duration: allDone ? 0.6 : 2,
                  repeat: allDone ? 3 : Infinity,
                  delay: allDone ? i * 0.1 : i * 0.2,
                }}
              >
                {isRevealed ? "★" : "☆"}
              </motion.div>

              {/* Number label */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs"
                style={{ color: "rgba(188,167,255,0.6)", whiteSpace: "nowrap" }}
              >
                {i + 1}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* All done celebration */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            className="relative z-10 text-center px-6 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xl sm:text-2xl"
              style={{ fontFamily: "var(--font-dancing)", color: "#FF75B5", fontSize: "clamp(1.2rem, 4vw, 1.8rem)" }}
            >
              {config.reasonsCompletionMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active reason card */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCard}
          >
            <div className="absolute inset-0" style={{ background: "rgba(16,11,37,0.7)", backdropFilter: "blur(8px)" }} />
            <motion.div
              className="relative z-10 glass-card p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.6, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.6, y: 20 }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-4" style={{ color: STAR_COLORS[active % STAR_COLORS.length] }}>★</div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(188,167,255,0.6)" }}>
                Reason #{active + 1}
              </p>
              <p
                className="text-lg sm:text-xl leading-relaxed"
                style={{ fontFamily: "var(--font-dancing)", color: "#FFF7FF", fontSize: "clamp(1.1rem, 4vw, 1.5rem)" }}
              >
                {config.reasons[active]}
              </p>
              <button
                onClick={closeCard}
                className="mt-6 text-sm px-5 py-2 rounded-full border"
                style={{ borderColor: "rgba(188,167,255,0.3)", color: "#BCA7FF" }}
                aria-label="Close"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <div className="relative z-10 text-center pb-14">
        <motion.button
          onClick={onNext}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Read My Letter ♡
        </motion.button>
      </div>
    </div>
  );
}

