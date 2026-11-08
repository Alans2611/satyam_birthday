"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface BirthdayCakeProps {
  onNext: () => void;
}

function Flame({ blown, index }: { blown: boolean; index: number }) {
  return (
    <AnimatePresence>
      {!blown ? (
        <motion.div
          key="flame"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "100%", width: 10, height: 18 }}
          initial={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.35, delay: index * 0.05 } }}
          animate={{
            scaleX: [1, 0.85, 1.1, 0.9, 1],
            scaleY: [1, 1.1, 0.95, 1.05, 1],
            opacity: [1, 0.9, 1],
          }}
          transition={{ duration: 0.5, repeat: Infinity, delay: index * 0.07 }}
        >
          {/* Outer flame */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 50% 90%, #FFE066 0%, #FF8C00 50%, transparent 100%)",
              borderRadius: "50% 50% 30% 30%",
              bottom: 0,
            }}
          />
          {/* Inner flame core */}
          <div
            className="absolute"
            style={{
              width: 5,
              height: 10,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse at 50% 90%, #FFF5A0, #FFD700)",
              borderRadius: "50% 50% 30% 30%",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="smoke"
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{ bottom: "100%", width: 6, height: 6, background: "rgba(255,182,217,0.6)" }}
          initial={{ scale: 0.5, opacity: 0.8, y: 0 }}
          animate={{ scale: 2, opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        />
      )}
    </AnimatePresence>
  );
}

function Candle({ blown, index }: { blown: boolean; index: number }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 14 }}>
      <Flame blown={blown} index={index} />
      {/* Candle body */}
      <div
        style={{
          width: 10,
          height: 40,
          background: `linear-gradient(to bottom, ${
            ["#FF75B5", "#BCA7FF", "#FFB6D9", "#FF75B5", "#BCA7FF"][index % 5]
          }, ${["#C02065", "#7B5EBF", "#FF75B5", "#C02065", "#7B5EBF"][index % 5]})`,
          borderRadius: "3px 3px 0 0",
        }}
      />
      {/* Candle base */}
      <div style={{ width: 14, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: "0 0 2px 2px" }} />
    </div>
  );
}

export default function BirthdayCake({ onNext }: BirthdayCakeProps) {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);
  const [wishRevealed, setWishRevealed] = useState(false);

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);

    // Generate confetti
    setConfetti(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ["#FF75B5", "#BCA7FF", "#FFB6D9", "#FFD6A5", "#FFF7FF"][Math.floor(Math.random() * 5)],
        delay: Math.random() * 1,
        size: Math.random() * 8 + 4,
      }))
    );

    // Generate floating hearts
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        delay: Math.random() * 1.5,
      }))
    );

    setTimeout(() => setWishRevealed(true), 1200);
  };

  return (
    <div
      className="full-screen flex flex-col items-center justify-center relative py-10"
      style={{ background: blown ? "radial-gradient(ellipse at 50% 60%, #0a0620 0%, #100B25 70%)" : "radial-gradient(ellipse at 50% 60%, #1a0a3a 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={blown ? 300 : 150} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 400, height: 400, background: "rgba(255,117,181,0.07)", top: "0", right: "0", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 300, height: 300, background: "rgba(188,167,255,0.07)", bottom: "0", left: "0", animationDelay: "3s" }} />

      {/* Starburst on candles blown */}
      <AnimatePresence>
        {blown && !wishRevealed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 5,
                  height: 5,
                  background: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
                  left: "50%",
                  top: "45%",
                }}
                animate={{
                  x: Math.cos((i / 20) * Math.PI * 2) * 280,
                  y: Math.sin((i / 20) * Math.PI * 2) * 280,
                  opacity: [1, 0],
                  scale: [1.5, 0.2],
                }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            ))}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 120,
                height: 120,
                background: "radial-gradient(circle, rgba(255,182,217,0.5) 0%, transparent 70%)",
                left: "50%",
                top: "45%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 6], opacity: [0.9, 0] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="fixed pointer-events-none z-30"
          style={{ left: `${c.x}%`, top: "-20px", width: c.size, height: c.size, background: c.color, borderRadius: 2 }}
          animate={{ y: "110vh", rotate: 720, opacity: [1, 1, 0] }}
          transition={{ duration: 2.5 + Math.random(), delay: c.delay, ease: "easeIn" }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="fixed pointer-events-none z-30 text-2xl"
          style={{ left: `${h.x}%`, bottom: "10%" }}
          animate={{ y: "-100vh", opacity: [0.8, 0.8, 0], scale: [1, 0.6] }}
          transition={{ duration: 3, delay: h.delay }}
        >
          <span style={{ color: ["#FF75B5", "#FFB6D9", "#BCA7FF"][h.id % 3] }}>♡</span>
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto">

        {/* Pre-blow text */}
        <AnimatePresence>
          {!wishRevealed && (
            <motion.div
              key="pre"
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl mb-3" style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}>
                {config.cake.preHeading}
              </h2>
              <p style={{ fontFamily: "var(--font-dancing)", color: "#FFB6D9", fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)" }}>
                {config.cake.heading}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake */}
        <motion.div
          className="relative mb-8"
          animate={blown ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Cake glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,117,181,0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(1.5)",
            }}
          />

          {/* Candles row */}
          <div className="flex items-end justify-center gap-3 mb-1 relative z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <Candle key={i} blown={blown} index={i} />
            ))}
          </div>

          {/* Cake top tier */}
          <div
            style={{
              width: 220,
              height: 50,
              background: "linear-gradient(135deg, #FF9ED0, #FF75B5)",
              borderRadius: "10px 10px 0 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Frosting drips */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${5 + i * 12}%`,
                  width: 12,
                  height: 20,
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "0 0 8px 8px",
                }}
              />
            ))}
            {/* Hearts on cake */}
            <div className="absolute inset-0 flex items-center justify-around px-4" style={{ fontSize: "0.9rem" }}>
              {["♡", "✦", "♡"].map((s, i) => (
                <span key={i} style={{ color: "rgba(255,255,255,0.7)" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Cake bottom tier */}
          <div
            style={{
              width: 260,
              height: 65,
              background: "linear-gradient(135deg, #BCA7FF, #9B59B6)",
              borderRadius: "0 0 10px 10px",
              position: "relative",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            {/* Frosting drips on bottom */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${i * 10}%`,
                  width: 10,
                  height: 15,
                  background: "rgba(255,117,181,0.5)",
                  borderRadius: "0 0 6px 6px",
                }}
              />
            ))}
            {/* Cake decoration text */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontFamily: "var(--font-dancing)", fontSize: "1rem", color: "rgba(255,255,255,0.8)" }}
            >
              Happy Birthday, Satyam ♡
            </div>
          </div>

          {/* Plate */}
          <div
            style={{
              width: 290,
              height: 12,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(188,167,255,0.2))",
              borderRadius: "0 0 20px 20px",
              margin: "0 auto",
              border: "1px solid rgba(188,167,255,0.2)",
            }}
          />
        </motion.div>

        {/* Blow button */}
        {!blown && (
          <motion.button
            onClick={blowCandles}
            className="btn-primary text-base sm:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {config.cake.buttonText}
          </motion.button>
        )}

        {/* Post-blow message */}
        <AnimatePresence>
          {wishRevealed && (
            <motion.div
              key="wish"
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-3xl sm:text-4xl mb-3"
                style={{ fontFamily: "var(--font-playfair)", color: "#FF75B5" }}
              >
                {config.cake.postHeading}
              </h2>
              <p
                className="text-lg mb-8"
                style={{ fontFamily: "var(--font-dancing)", color: "#BCA7FF", fontSize: "1.3rem" }}
              >
                {config.cake.postSubheading}
              </p>
              <motion.button
                onClick={onNext}
                className="btn-primary text-base sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                See Your Surprise ♡
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

