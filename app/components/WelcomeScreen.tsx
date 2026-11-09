"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [burst, setBurst] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setBurst(true);
    setExiting(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <motion.div
      className="full-screen flex flex-col items-center justify-center relative"
      style={{ background: "radial-gradient(ellipse at center, #1B1038 0%, #100B25 70%)" }}
      animate={exiting ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      {/* Galaxy canvas */}
      <GalaxyCanvas starCount={300} shootingStars />

      {/* Nebula clouds */}
      <div className="nebula" style={{ width: 500, height: 500, background: "rgba(188,167,255,0.08)", top: "-10%", left: "-10%", animationDelay: "0s" }} />
      <div className="nebula" style={{ width: 400, height: 400, background: "rgba(255,117,181,0.07)", bottom: "10%", right: "-5%", animationDelay: "4s" }} />
      <div className="nebula" style={{ width: 350, height: 350, background: "rgba(188,167,255,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animationDelay: "2s" }} />

      {/* Central pink glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(255,117,181,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Crescent Moon */}
      <motion.div
        className="absolute"
        style={{ top: "5%", right: "4%", width: "clamp(40px, 11vw, 90px)", aspectRatio: "1" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB6D9" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#FF75B5" stopOpacity="0.1"/>
            </radialGradient>
            <filter id="moonBlur">
              <feGaussianBlur stdDeviation="6"/>
            </filter>
          </defs>
          {/* Glow behind moon */}
          <ellipse cx="45" cy="45" rx="38" ry="38" fill="url(#moonGlow)" filter="url(#moonBlur)" opacity="0.6"/>
          {/* Crescent shape */}
          <path
            d="M60 20 C72 32 72 58 60 70 C48 82 28 76 20 64 C34 68 50 60 54 48 C58 36 56 22 46 16 C52 16 56 18 60 20Z"
            fill="#FFB6D9"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Starburst on enter */}
      <AnimatePresence>
        {burst && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: Math.cos((i / 16) * Math.PI * 2) * 300,
                  y: Math.sin((i / 16) * Math.PI * 2) * 300,
                  opacity: [1, 0],
                  scale: [1, 0.3],
                }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              />
            ))}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 100, height: 100, background: "rgba(255,117,181,0.3)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              animate={{ scale: [1, 8], opacity: [0.8, 0] }}
              transition={{ duration: 1.0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-2xl mx-auto w-full py-8 sm:py-10 screen-pad-bottom"
        style={{ gap: "clamp(1rem, 3vh, 1.75rem)" }}
      >
        {/* Girlfriend portrait — large, centered */}
        <motion.div
          className="relative shrink-0"
          style={{
            width: "min(380px, 68vw, 52vh)",
            height: "min(380px, 68vw, 52vh)",
          }}
          initial={mounted ? { opacity: 0, scale: 0.85 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9 }}
        >
          {/* Soft pink glow ring */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: "0 0 64px rgba(255,117,181,0.55), 0 0 120px rgba(188,167,255,0.3)",
              background: "radial-gradient(circle, rgba(255,117,181,0.22) 0%, transparent 70%)",
              transform: "scale(1.12)",
            }}
          />
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              border: "3px solid rgba(255,182,217,0.65)",
              boxShadow: "0 0 0 6px rgba(188,167,255,0.14)",
              background: "radial-gradient(circle at 40% 35%, #2D1B4E, #1B1038)",
            }}
          >
            {!photoError ? (
              <Image
                src={config.welcome.photo}
                alt={config.her.name}
                fill
                sizes="380px"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                onError={() => setPhotoError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center px-4">
                <span style={{ color: "#FFB6D9", fontSize: "2.5rem" }}>♡</span>
                <p className="text-xs mt-2 leading-tight" style={{ color: "rgba(255,247,255,0.45)" }}>
                  Add her photo
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Text + CTA block */}
        <div className="flex flex-col items-center w-full">
        <motion.p
          className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-6"
          style={{ color: "#BCA7FF", fontFamily: "var(--font-inter)" }}
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {config.welcome.dateLabel}
        </motion.p>

        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-6 leading-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0 }}
        >
          {config.welcome.heading}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-12 leading-relaxed px-1"
          style={{ color: "#FFB6D9", fontFamily: "var(--font-dancing)", fontSize: "clamp(0.95rem, 3.5vw, 1.4rem)" }}
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {config.welcome.subtitle}
        </motion.p>

        <motion.button
          onClick={handleEnter}
          className="btn-primary text-sm sm:text-lg px-6 py-3.5 sm:px-10 sm:py-4 touch-manipulation"
          initial={mounted ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Enter your birthday universe"
        >
          {config.welcome.buttonText}
        </motion.button>
        </div>
      </div>

      {/* Floating sparkles */}
      {mounted && Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs pointer-events-none select-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            color: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Scroll hint — hide on very short screens */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest hidden sm:block"
        style={{ color: "rgba(188,167,255,0.5)" }}
        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓
      </motion.div>
    </motion.div>
  );
}

