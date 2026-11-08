"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface FinalScreenProps {
  onReplay: () => void;
}

export default function FinalScreen({ onReplay }: FinalScreenProps) {
  const [clicked, setClicked] = useState(false);

  const handleReplay = () => {
    setClicked(false);
    onReplay();
  };

  return (
    <div
      className="full-screen flex flex-col items-center justify-center relative py-10"
      style={{ background: "radial-gradient(ellipse at 50% 40%, #1f0a40 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={350} shootingStars />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 600, height: 400, background: "rgba(255,117,181,0.09)", top: "-10%", left: "-10%", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 500, height: 400, background: "rgba(188,167,255,0.08)", bottom: "-10%", right: "-10%", animationDelay: "4s" }} />
      <div className="nebula" style={{ width: 350, height: 350, background: "rgba(255,117,181,0.06)", top: "50%", left: "50%", animationDelay: "2s", transform: "translate(-50%,-50%)" }} />

      {/* Floating hearts background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${5 + (i * 8)}%`,
            top: `${10 + (i % 4) * 25}%`,
            color: i % 3 === 0 ? "#FF75B5" : i % 3 === 1 ? "#FFB6D9" : "#BCA7FF",
            opacity: 0.3,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          ♡
        </motion.div>
      ))}

      {/* Crescent moon */}
      <motion.div
        className="absolute"
        style={{ top: "6%", right: "8%" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <defs>
            <radialGradient id="finalMoonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#FF75B5" stopOpacity="0"/>
            </radialGradient>
            <filter id="finalMoonBlur">
              <feGaussianBlur stdDeviation="5"/>
            </filter>
          </defs>
          <ellipse cx="40" cy="40" rx="35" ry="35" fill="url(#finalMoonGlow)" filter="url(#finalMoonBlur)" opacity="0.6"/>
          <path
            d="M53 17 C63 28 63 52 53 63 C43 74 25 68 18 57 C30 61 44 53 48 42 C52 31 50 18 42 13 C47 13 50 15 53 17Z"
            fill="#FFB6D9"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

        {/* Sparkle row */}
        <motion.div
          className="text-xl mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: "#FFB6D9" }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-6"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          {config.finalScreen.heading}
        </motion.h2>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <pre
            className="whitespace-pre-wrap leading-9"
            style={{
              fontFamily: "var(--font-dancing)",
              color: "#FFB6D9",
              fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
            }}
          >
            {config.finalScreen.message}
          </pre>
        </motion.div>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <pre
            className="whitespace-pre-wrap"
            style={{
              fontFamily: "var(--font-dancing)",
              color: "#BCA7FF",
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
            }}
          >
            {config.finalScreen.signature}
          </pre>
        </motion.div>

        {/* Forever & Always button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!clicked ? (
              <motion.button
                key="forever"
                onClick={() => setClicked(true)}
                className="btn-primary text-base sm:text-lg mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {config.finalScreen.buttonText}
              </motion.button>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6"
              >
                <pre
                  className="whitespace-pre-wrap text-center leading-8"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    color: "#FF75B5",
                    fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
                  }}
                >
                  {config.finalScreen.afterClick}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay button */}
          <AnimatePresence>
            {clicked && (
              <motion.button
                onClick={handleReplay}
                className="mt-4 text-sm px-6 py-3 rounded-full border block mx-auto transition-all cursor-pointer"
                style={{ borderColor: "rgba(188,167,255,0.4)", color: "#BCA7FF" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: "#BCA7FF" }}
                aria-label="Replay the experience"
              >
                ↺ {config.finalScreen.replayText}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Final decorative text */}
        <motion.p
          className="mt-10 text-xs tracking-widest uppercase"
          style={{ color: "rgba(188,167,255,0.3)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
        >
          A little universe made just for Satyam
        </motion.p>
      </div>
    </div>
  );
}

