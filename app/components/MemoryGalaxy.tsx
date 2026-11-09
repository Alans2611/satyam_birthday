"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Gift, X } from "lucide-react";
import { config, Memory } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface MemoryGalaxyProps {
  onNext: () => void;
}

function PlaceholderPhoto({ memory }: { memory: Memory }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center rounded-lg"
      style={{
        background: `radial-gradient(circle at 40% 40%, ${memory.color}33, #1B1038)`,
        border: `1px solid ${memory.color}44`,
        minHeight: 200,
      }}
    >
      <div className="text-5xl mb-3" style={{ color: memory.color }}>✦</div>
      <p className="text-xs text-center px-4" style={{ color: "rgba(255,247,255,0.5)" }}>
        Add your photo here
        <br />
        <span className="opacity-60">({memory.photo})</span>
      </p>
    </div>
  );
}

function MemoryModal({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(16,11,37,0.92)", backdropFilter: "blur(12px)" }} />

      <motion.div
        className="relative z-10 w-full max-w-md max-h-[min(92svh,900px)] overflow-y-auto overscroll-contain"
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid card */}
        <div className="polaroid mx-auto">
          {/* Photo area */}
          <div className="relative w-full" style={{ aspectRatio: "4/3", background: "#0D0920", borderRadius: 4, overflow: "hidden" }}>
            {!imgError ? (
              <Image
                src={memory.photo}
                alt={memory.title}
                fill
                className="object-contain"
                onError={() => setImgError(true)}
                sizes="(max-width: 640px) 90vw, 360px"
              />
            ) : (
              <PlaceholderPhoto memory={memory} />
            )}
          </div>

          {/* Caption area */}
          <div className="pt-2 sm:pt-3 pb-1 px-1 text-center">
            <p className="text-gray-800 text-sm" style={{ fontFamily: "var(--font-dancing)", fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)" }}>
              {memory.caption}
            </p>
            {memory.date && (
              <p className="text-gray-400 text-xs mt-1">{memory.date}</p>
            )}
          </div>
        </div>

        {/* Memory details */}
        <div className="glass-card p-4 sm:p-6 mt-3 sm:mt-4 text-center">
          <h3 className="text-lg sm:text-xl mb-2" style={{ fontFamily: "var(--font-playfair)", color: memory.color }}>
            {memory.title}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,247,255,0.7)" }}>
            {memory.description}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 sm:mt-5 mx-auto flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            color: "#FFF7FF",
            background: "linear-gradient(135deg, rgba(255,117,181,0.25), rgba(188,167,255,0.22))",
            border: "1px solid rgba(255,182,217,0.35)",
            boxShadow: "0 4px 18px rgba(255,117,181,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Close memory"
        >
          Close
          <X size={14} strokeWidth={2.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}

function PlanetNode({ memory, onClick }: { memory: Memory; onClick: () => void }) {
  const sizes = { large: 80, medium: 64, small: 50 };
  const size = sizes[memory.size as keyof typeof sizes] || 64;
  const giftSize = Math.round(size * 0.38);

  return (
    <div
      className="absolute"
      style={{
        left: `${memory.position.x}%`,
        top: `${memory.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.button
        onClick={onClick}
        className="group relative rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, ${memory.color}, ${memory.color}88)`,
          boxShadow: `0 0 20px ${memory.glowColor}, 0 0 40px ${memory.glowColor}`,
        }}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            `0 0 20px ${memory.glowColor}, 0 0 40px ${memory.glowColor}`,
            `0 0 35px ${memory.glowColor}, 0 0 60px ${memory.glowColor}`,
            `0 0 20px ${memory.glowColor}, 0 0 40px ${memory.glowColor}`,
          ],
        }}
        transition={{
          duration: 3 + memory.id * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: memory.id * 0.4,
        }}
        aria-label={`Open memory: ${memory.title}`}
      >
        {/* Inner shine */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "40%", height: "25%",
            background: "rgba(255,255,255,0.3)",
            top: "15%", left: "20%",
            filter: "blur(3px)",
          }}
        />

        {/* Gift at planet center */}
        <Gift
          size={giftSize}
          strokeWidth={2}
          className="relative z-10 drop-shadow-sm"
          style={{ color: "rgba(255,247,255,0.95)" }}
          aria-hidden="true"
        />

        {/* Label on hover or touch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            bottom: "calc(100% + 8px)",
            background: "rgba(16,11,37,0.9)",
            border: `1px solid ${memory.color}66`,
            color: memory.color,
            backdropFilter: "blur(4px)",
          }}
        >
          {memory.title}
        </div>
      </motion.button>
    </div>
  );
}

export default function MemoryGalaxy({ onNext }: MemoryGalaxyProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div
      className="full-screen relative flex flex-col screen-pad-top"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #1a0a3a 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={180} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 500, height: 300, background: "rgba(188,167,255,0.08)", top: "20%", left: "60%", animationDelay: "2s" }} />
      <div className="nebula" style={{ width: 350, height: 350, background: "rgba(255,117,181,0.06)", bottom: "10%", left: "10%", animationDelay: "0s" }} />

      {/* Header — sits below the fixed navigation indicator dots */}
      <div className="relative z-50 text-center pb-2 px-4 sm:px-6 shrink-0">
        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl mb-1"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Princess&apos;s Gallery
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base px-2"
          style={{ color: "#BCA7FF", fontFamily: "var(--font-dancing)", fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tap a planet to relive a memory together
        </motion.p>
      </div>

      {/* Planet galaxy — centered in the remaining viewport */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-2 sm:px-4 min-h-0">
        <div
          className="relative w-full"
          style={{ maxWidth: 560, aspectRatio: "1", maxHeight: "min(560px, 58svh)", width: "min(560px, 96vw)" }}
        >
          {/* Connection lines (decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {config.memories.slice(0, -1).map((m, i) => {
              const next = config.memories[i + 1];
              return (
                <line
                  key={i}
                  x1={`${m.position.x}%`} y1={`${m.position.y}%`}
                  x2={`${next.position.x}%`} y2={`${next.position.y}%`}
                  stroke="rgba(188,167,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
              );
            })}
          </svg>

          {config.memories.map((memory) => (
            <PlanetNode key={memory.id} memory={memory} onClick={() => setSelectedMemory(memory)} />
          ))}
        </div>
      </div>

      {/* Next button — above music control + home indicator */}
      <div className="relative z-20 flex justify-center px-4 screen-pad-bottom shrink-0">
        <motion.button
          onClick={onNext}
          className="btn-primary touch-manipulation text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue the Journey ✦
        </motion.button>
      </div>

      {/* Memory modal */}
      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
