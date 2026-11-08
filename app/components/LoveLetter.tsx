"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface LoveLetterProps {
  onNext: () => void;
}

export default function LoveLetter({ onNext }: LoveLetterProps) {
  const [opened, setOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const letterText = config.letter.text;

  const openEnvelope = () => {
    setOpened(true);
    // Start typewriter after animation
    setTimeout(() => {
      let i = 0;
      typingRef.current = setInterval(() => {
        if (i < letterText.length) {
          setDisplayedText(letterText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingRef.current!);
          setTypingDone(true);
        }
      }, 18);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  // Allow tap to skip typewriter
  const skipTyping = () => {
    if (!typingDone) {
      clearInterval(typingRef.current!);
      setDisplayedText(letterText);
      setTypingDone(true);
    }
  };

  return (
    <div
      className="full-screen flex flex-col items-center justify-center relative py-10"
      style={{ background: "radial-gradient(ellipse at 50% 60%, #1f0d40 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={180} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 500, height: 300, background: "rgba(255,117,181,0.07)", top: "0", left: "0", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 350, height: 350, background: "rgba(188,167,255,0.07)", bottom: "0", right: "0", animationDelay: "5s" }} />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* Header */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {config.letter.heading}
        </motion.h2>
        <motion.p
          className="mb-10"
          style={{ fontFamily: "var(--font-dancing)", color: "#BCA7FF", fontSize: "1.15rem" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {config.letter.subtitle}
        </motion.p>

        {/* Envelope */}
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={openEnvelope}
              className="relative mx-auto block cursor-pointer focus:outline-none"
              aria-label="Open the letter"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              {/* Envelope body */}
              <div
                className="relative mx-auto"
                style={{
                  width: "min(320px, 85vw)",
                  paddingBottom: "70%",
                  background: "linear-gradient(135deg, #2D1B4E, #4B2065)",
                  borderRadius: 8,
                  boxShadow: "0 20px 60px rgba(255,117,181,0.25), 0 0 40px rgba(188,167,255,0.1)",
                  border: "1px solid rgba(255,182,217,0.25)",
                }}
              >
                {/* Envelope flap (top) */}
                <div
                  className="absolute left-0 top-0 w-full"
                  style={{
                    height: "55%",
                    background: "linear-gradient(170deg, #3D2060 0%, #2D1B4E 70%)",
                    clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                    borderRadius: "8px 8px 0 0",
                  }}
                />

                {/* Envelope bottom folds */}
                <div
                  className="absolute left-0 bottom-0 w-full"
                  style={{
                    height: "55%",
                    background: "linear-gradient(10deg, #2D1B4E 0%, #3D2060 100%)",
                    clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                    borderRadius: "0 0 8px 8px",
                  }}
                />
                <div
                  className="absolute left-0 bottom-0"
                  style={{
                    height: "55%",
                    width: "55%",
                    background: "linear-gradient(135deg, #342070 0%, #2D1B4E 100%)",
                    clipPath: "polygon(0 0, 0 100%, 100% 100%)",
                  }}
                />
                <div
                  className="absolute right-0 bottom-0"
                  style={{
                    height: "55%",
                    width: "55%",
                    background: "linear-gradient(225deg, #342070 0%, #2D1B4E 100%)",
                    clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                  }}
                />

                {/* Wax seal */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full z-10"
                  style={{
                    width: 56,
                    height: 56,
                    background: "radial-gradient(circle at 35% 35%, #FF9ED0, #C02065)",
                    boxShadow: "0 0 20px rgba(255,117,181,0.6), 0 0 40px rgba(255,117,181,0.3)",
                    border: "2px solid rgba(255,182,217,0.4)",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>♡</span>
                </div>

                {/* Floating sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-xs pointer-events-none"
                    style={{
                      color: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.3 }}
                  >
                    ✦
                  </motion.span>
                ))}
              </div>

              <p className="mt-5 text-sm" style={{ color: "#BCA7FF" }}>
                Tap to open ♡
              </p>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onClick={skipTyping}
              className="cursor-pointer"
            >
              {/* Letter paper */}
              <div
                className="relative mx-auto text-left p-6 sm:p-8 rounded-lg"
                style={{
                  maxWidth: 560,
                  background: "linear-gradient(135deg, rgba(255,247,255,0.04) 0%, rgba(188,167,255,0.03) 100%)",
                  border: "1px solid rgba(188,167,255,0.15)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Paper lines decoration */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full left-0"
                    style={{
                      top: `${12 + i * 12}%`,
                      height: 1,
                      background: "rgba(188,167,255,0.05)",
                    }}
                  />
                ))}

                <pre
                  className="whitespace-pre-wrap leading-8 relative z-10"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    color: "#FFF7FF",
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                  }}
                >
                  {displayedText}
                  {!typingDone && (
                    <span
                      style={{
                        borderRight: "2px solid #FFB6D9",
                        animation: "blink-cursor 0.7s step-end infinite",
                      }}
                    />
                  )}
                </pre>

                {!typingDone && (
                  <p className="text-xs mt-4 text-center" style={{ color: "rgba(188,167,255,0.5)" }}>
                    Tap to read all at once
                  </p>
                )}
              </div>

              {typingDone && (
                <motion.button
                  onClick={onNext}
                  className="btn-primary mt-8"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  One More Surprise ✨
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

