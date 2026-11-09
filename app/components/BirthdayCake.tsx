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
          style={{ width: 12, height: 20, position: "relative" }}
          initial={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0, y: -10, transition: { duration: 0.35, delay: index * 0.05 } }}
          animate={{
            scaleX: [1, 0.85, 1.1, 0.9, 1],
            scaleY: [1, 1.15, 0.95, 1.08, 1],
            opacity: [1, 0.85, 1],
          }}
          transition={{ duration: 0.45, repeat: Infinity, delay: index * 0.07 }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: -2,
              width: 24,
              height: 24,
              background: "radial-gradient(circle, rgba(255,200,80,0.55) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 90%, #FFE066 0%, #FF8C00 55%, #FF4500 100%)",
              borderRadius: "50% 50% 40% 40%",
              boxShadow: "0 0 12px rgba(255,160,40,0.8)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              width: 5,
              height: 10,
              bottom: 2,
              background: "radial-gradient(ellipse at 50% 90%, #FFFCE8, #FFD700)",
              borderRadius: "50% 50% 40% 40%",
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="smoke"
          className="rounded-full"
          style={{ width: 8, height: 8, background: "rgba(255,182,217,0.55)" }}
          initial={{ scale: 0.5, opacity: 0.8, y: 0 }}
          animate={{ scale: 2.4, opacity: 0, y: -28 }}
          transition={{ duration: 0.9, delay: index * 0.05 }}
        />
      )}
    </AnimatePresence>
  );
}

function Candle({ blown, index }: { blown: boolean; index: number }) {
  const colors = [
    ["#FF9ED0", "#FF75B5", "#C02065"],
    ["#D4C4FF", "#BCA7FF", "#7B5EBF"],
    ["#FFE0F0", "#FFB6D9", "#FF75B5"],
    ["#FF9ED0", "#FF75B5", "#C02065"],
    ["#D4C4FF", "#BCA7FF", "#7B5EBF"],
  ];
  const [light, mid, dark] = colors[index % colors.length];

  return (
    <div className="flex flex-col items-center" style={{ width: 16 }}>
      <Flame blown={blown} index={index} />
      <div style={{ width: 2, height: 5, background: "#3a2a1a", borderRadius: 1 }} />
      <div
        style={{
          width: 11,
          height: 42,
          background: `linear-gradient(90deg, ${dark} 0%, ${light} 35%, ${mid} 55%, ${dark} 100%)`,
          borderRadius: "3px 3px 2px 2px",
          boxShadow: "2px 0 6px rgba(0,0,0,0.2), inset -2px 0 4px rgba(255,255,255,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "28%",
            top: 0,
            bottom: 0,
            width: 2.5,
            background: "rgba(255,255,255,0.28)",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}

function CakeTier({
  width,
  height,
  bodyGradient,
  frostingGradient,
  dripColor,
  pearlColor,
  dripCount,
  pearlCount,
  children,
}: {
  width: number;
  height: number;
  bodyGradient: string;
  frostingGradient: string;
  dripColor: string;
  pearlColor: string;
  dripCount: number;
  pearlCount: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: bodyGradient,
        borderRadius: "10px 10px 6px 6px",
        boxShadow: "0 8px 18px rgba(0,0,0,0.28), inset 0 2px 6px rgba(255,255,255,0.3)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Frosting top strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 14,
          background: frostingGradient,
          borderRadius: "10px 10px 0 0",
        }}
      />

      {/* Frosting drips — clipped inside the tier */}
      {Array.from({ length: dripCount }).map((_, i) => {
        const h = 16 - (i % 3) * 4 + (i % 2) * 2;
        const w = 10 + (i % 3);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 10,
              left: `${6 + i * ((88) / dripCount)}%`,
              width: w,
              height: h,
              background: dripColor,
              borderRadius: "0 0 50% 50%",
              boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.08)",
            }}
          />
        );
      })}

      {/* Pearls */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 10,
          right: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {Array.from({ length: pearlCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, #fff 0%, ${pearlColor} 60%, ${pearlColor}aa 100%)`,
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {children}
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

    setConfetti(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ["#FF75B5", "#BCA7FF", "#FFB6D9", "#FFD6A5", "#FFF7FF"][Math.floor(Math.random() * 5)],
        delay: Math.random() * 1,
        size: Math.random() * 8 + 4,
      }))
    );

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
      className="full-screen relative flex items-center justify-center screen-pad-top screen-pad-bottom"
      style={{
        background: blown
          ? "radial-gradient(ellipse at 50% 55%, #0a0620 0%, #100B25 70%)"
          : "radial-gradient(ellipse at 50% 55%, #1a0a3a 0%, #100B25 70%)",
      }}
    >
      <GalaxyCanvas starCount={blown ? 300 : 150} shootingStars={false} />

      <div className="nebula" style={{ width: 400, height: 400, background: "rgba(255,117,181,0.07)", top: "0", right: "0", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 300, height: 300, background: "rgba(188,167,255,0.07)", bottom: "0", left: "0", animationDelay: "3s" }} />

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

      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="fixed pointer-events-none z-30"
          style={{ left: `${c.x}%`, top: "-20px", width: c.size, height: c.size, background: c.color, borderRadius: 2 }}
          animate={{ y: "110vh", rotate: 720, opacity: [1, 1, 0] }}
          transition={{ duration: 2.5 + Math.random(), delay: c.delay, ease: "easeIn" }}
        />
      ))}

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

      {/* Main column — heading / cake / button with explicit gaps */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6"
        style={{ width: "100%", maxWidth: 420, gap: "clamp(1.5rem, 5vh, 3.5rem)" }}
      >
        {/* Heading */}
        <AnimatePresence>
          {!wishRevealed && (
            <motion.div
              key="pre"
              exit={{ opacity: 0, y: -20 }}
              style={{ width: "100%" }}
            >
              <h2
                className="text-2xl sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF", marginBottom: 10 }}
              >
                {config.cake.preHeading}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "#FFB6D9",
                  fontSize: "clamp(1.05rem, 3.5vw, 1.55rem)",
                  margin: 0,
                }}
              >
                {config.cake.heading}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cake — scales down on narrow phones so it never overflows */}
        <div className="mobile-scale-wrap">
        <div className="mobile-scale-inner">
        <motion.div
          animate={blown ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.5 }}
          style={{
            width: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none"
            style={{
              position: "absolute",
              left: "50%",
              bottom: 10,
              transform: "translateX(-50%)",
              width: 300,
              height: 70,
              background: "radial-gradient(ellipse, rgba(255,117,181,0.35) 0%, rgba(188,167,255,0.12) 50%, transparent 70%)",
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />

          {/* Candles — centered on top tier */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: 14,
              marginBottom: 4,
              position: "relative",
              zIndex: 2,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Candle key={i} blown={blown} index={i} />
            ))}
          </div>

          {/* Top tier */}
          <CakeTier
            width={150}
            height={52}
            bodyGradient="linear-gradient(180deg, #FFC4E0 0%, #FF75B5 45%, #E85A9A 100%)"
            frostingGradient="linear-gradient(180deg, #FFE8F3, #FFB6D9)"
            dripColor="#FFB6D9"
            pearlColor="#FFE0F0"
            dripCount={6}
            pearlCount={5}
          />

          {/* Middle tier */}
          <CakeTier
            width={210}
            height={60}
            bodyGradient="linear-gradient(180deg, #E8DEFF 0%, #BCA7FF 42%, #9B7FE8 100%)"
            frostingGradient="linear-gradient(180deg, #F2EBFF, #D4C4FF)"
            dripColor="#D4C4FF"
            pearlColor="#E8DEFF"
            dripCount={8}
            pearlCount={7}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                top: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 22,
                pointerEvents: "none",
              }}
            >
              {["♡", "✦", "♡"].map((s, i) => (
                <span
                  key={i}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "0.9rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </CakeTier>

          {/* Bottom tier */}
          <CakeTier
            width={280}
            height={72}
            bodyGradient="linear-gradient(180deg, #FFD0E8 0%, #FF9ECD 40%, #E878B0 100%)"
            frostingGradient="linear-gradient(180deg, #FFE8F3, #FFB6D9)"
            dripColor="#FFB6D9"
            pearlColor="#FFE0F0"
            dripCount={10}
            pearlCount={9}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                top: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                fontFamily: "var(--font-dancing)",
                fontSize: "clamp(0.95rem, 2.8vw, 1.1rem)",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 1px 3px rgba(120,40,80,0.35)",
              }}
            >
              Happy Birthday, Satyam ♡
            </div>
          </CakeTier>

          {/* Plate */}
          <div style={{ width: 310, marginTop: 2, position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: "100%",
                height: 12,
                background: "linear-gradient(180deg, rgba(255,247,255,0.35), rgba(188,167,255,0.22))",
                borderRadius: "2px 2px 40% 40%",
                border: "1px solid rgba(188,167,255,0.3)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              }}
            />
            <div
              style={{
                width: "40%",
                height: 14,
                margin: "0 auto",
                background: "linear-gradient(180deg, rgba(188,167,255,0.28), rgba(100,70,160,0.35))",
                borderRadius: "0 0 6px 6px",
                border: "1px solid rgba(188,167,255,0.2)",
                borderTop: "none",
              }}
            />
            <div
              style={{
                width: "52%",
                height: 7,
                margin: "0 auto",
                background: "linear-gradient(180deg, rgba(255,247,255,0.25), rgba(188,167,255,0.2))",
                borderRadius: "40%",
                border: "1px solid rgba(188,167,255,0.25)",
              }}
            />
          </div>
        </motion.div>
        </div>
        </div>

        {/* Blow button */}
        {!blown && (
          <motion.button
            onClick={blowCandles}
            className="btn-primary text-sm sm:text-lg touch-manipulation"
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
              className="text-center px-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
            >
              <h2
                className="text-2xl sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair)", color: "#FF75B5", margin: 0 }}
              >
                {config.cake.postHeading}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "#BCA7FF",
                  fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
                  margin: 0,
                }}
              >
                {config.cake.postSubheading}
              </p>
              <motion.button
                onClick={onNext}
                className="btn-primary text-sm sm:text-lg touch-manipulation"
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
