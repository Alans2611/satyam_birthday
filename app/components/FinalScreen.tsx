"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface FinalScreenProps {
  onReplay: () => void;
}

function SidePhoto({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: "left" | "right";
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="relative shrink-0 w-[42vw] max-w-[148px] h-[54vw] max-h-[190px] sm:w-[170px] sm:h-[220px] sm:max-w-none sm:max-h-none lg:w-[200px] lg:h-[260px]"
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: side === "left" ? 0.2 : 0.35 }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "0 0 40px rgba(255,117,181,0.35), 0 0 80px rgba(188,167,255,0.18)",
          transform: "scale(1.06)",
        }}
      />
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          border: "2px solid rgba(255,182,217,0.5)",
          boxShadow: "0 0 0 4px rgba(188,167,255,0.12)",
          background: "radial-gradient(circle at 40% 30%, #2D1B4E, #1B1038)",
        }}
      >
        {!imgError ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 42vw, 200px"
            className="object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center px-3 gap-2">
            <span style={{ color: "#FFB6D9", fontSize: "1.75rem" }}>♡</span>
            <p
              className="text-[10px] text-center leading-tight"
              style={{ color: "rgba(255,247,255,0.45)" }}
            >
              Add photo
              <br />
              <span style={{ opacity: 0.7 }}>{src}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function FinalScreen({ onReplay }: FinalScreenProps) {
  const [clicked, setClicked] = useState(false);

  const handleReplay = () => {
    setClicked(false);
    onReplay();
  };

  return (
    <div
      className="full-screen flex flex-col items-center justify-center relative py-6 sm:py-10 px-3 sm:px-4 screen-pad-top screen-pad-bottom"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #1f0a40 0%, #100B25 70%)",
      }}
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
            left: `${5 + i * 8}%`,
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
        style={{ top: "5%", right: "3%", width: "clamp(36px, 10vw, 80px)", aspectRatio: "1" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none">
          <defs>
            <radialGradient id="finalMoonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FF75B5" stopOpacity="0" />
            </radialGradient>
            <filter id="finalMoonBlur">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <ellipse cx="40" cy="40" rx="35" ry="35" fill="url(#finalMoonGlow)" filter="url(#finalMoonBlur)" opacity="0.6" />
          <path
            d="M53 17 C63 28 63 52 53 63 C43 74 25 68 18 57 C30 61 44 53 48 42 C52 31 50 18 42 13 C47 13 50 15 53 17Z"
            fill="#FFB6D9"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Layout: photo | content | photo */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-1 sm:px-2">
        {/* Photos row on mobile; left side on desktop */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 lg:contents w-full lg:w-auto order-1 lg:order-none">
          <SidePhoto
            src={config.finalScreen.leftPhoto}
            alt="Memory together"
            side="left"
          />
          {/* Right photo sits beside left on mobile only */}
          <div className="lg:hidden">
            <SidePhoto
              src={config.finalScreen.rightPhoto}
              alt="Another memory together"
              side="right"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="relative text-center px-2 sm:px-4 max-w-xl w-full order-2 lg:order-none">
          {/* Sparkle row */}
          <motion.div
            className="text-lg sm:text-xl mb-3 sm:mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: "#FFB6D9" }}
          >
            ✦ ✦ ✦
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl mb-3 sm:mb-6"
            style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {config.finalScreen.heading}
          </motion.h2>

          <motion.div
            className="mb-5 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <pre
              className="whitespace-pre-wrap leading-7 sm:leading-9"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "#FFB6D9",
                fontSize: "clamp(1rem, 3.5vw, 1.4rem)",
              }}
            >
              {config.finalScreen.message}
            </pre>
          </motion.div>

          <motion.div
            className="mb-6 sm:mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <pre
              className="whitespace-pre-wrap"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "#BCA7FF",
                fontSize: "clamp(0.95rem, 3vw, 1.25rem)",
              }}
            >
              {config.finalScreen.signature}
            </pre>
          </motion.div>

          {/* Forever & Always button */}
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {!clicked ? (
                <motion.button
                  key="forever"
                  onClick={() => setClicked(true)}
                  className="btn-primary text-sm sm:text-lg touch-manipulation"
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
                  className="mb-8 w-full"
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
                  className="flex items-center justify-center gap-2.5 text-sm sm:text-base font-medium cursor-pointer touch-manipulation"
                  style={{
                    padding: "12px 22px",
                    borderRadius: 999,
                    color: "#FFF7FF",
                    background: "linear-gradient(135deg, rgba(255,117,181,0.28), rgba(188,167,255,0.28))",
                    border: "1px solid rgba(255,182,217,0.4)",
                    boxShadow: "0 6px 24px rgba(255,117,181,0.22), inset 0 1px 0 rgba(255,255,255,0.14)",
                    backdropFilter: "blur(10px)",
                    maxWidth: "calc(100vw - 2.5rem)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 32px rgba(255,117,181,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Replay the experience"
                >
                  <RotateCcw size={16} strokeWidth={2.25} />
                  {config.finalScreen.replayText}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Final decorative text */}
          <motion.p
            className="mt-10 text-xs tracking-widest uppercase"
            style={{ color: "rgba(188,167,255,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            A little universe made just for Satyam
          </motion.p>
        </div>

        {/* Right photo — desktop only (mobile shows it in the top row) */}
        <div className="hidden lg:block order-3">
          <SidePhoto
            src={config.finalScreen.rightPhoto}
            alt="Another memory together"
            side="right"
          />
        </div>
      </div>
    </div>
  );
}
