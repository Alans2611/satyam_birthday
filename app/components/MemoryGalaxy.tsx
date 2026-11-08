"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(16,11,37,0.92)", backdropFilter: "blur(12px)" }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.7, y: 40 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid card */}
        <div className="polaroid mx-auto" style={{ maxWidth: 360 }}>
          {/* Photo area */}
          <div className="relative w-full" style={{ aspectRatio: "4/3", background: "#0D0920", borderRadius: 4, overflow: "hidden" }}>
            {!imgError ? (
              <Image
                src={memory.photo}
                alt={memory.title}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
                sizes="360px"
              />
            ) : (
              <PlaceholderPhoto memory={memory} />
            )}
          </div>

          {/* Caption area */}
          <div className="pt-3 pb-1 px-1 text-center">
            <p className="text-gray-800 text-sm" style={{ fontFamily: "var(--font-dancing)", fontSize: "1.1rem" }}>
              {memory.caption}
            </p>
            {memory.date && (
              <p className="text-gray-400 text-xs mt-1">{memory.date}</p>
            )}
          </div>
        </div>

        {/* Memory details */}
        <div className="glass-card p-6 mt-4 text-center">
          <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-playfair)", color: memory.color }}>
            {memory.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,247,255,0.7)" }}>
            {memory.description}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 mx-auto block text-sm px-6 py-2 rounded-full border transition-all"
          style={{ borderColor: "rgba(188,167,255,0.3)", color: "#BCA7FF" }}
          aria-label="Close memory"
        >
          Close ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

function PlanetNode({ memory, onClick }: { memory: Memory; onClick: () => void }) {
  const sizes = { large: 80, medium: 60, small: 46 };
  const size = sizes[memory.size as keyof typeof sizes] || 60;

  return (
    <motion.button
      onClick={onClick}
      className="group absolute rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
      style={{
        left: `${memory.position.x}%`,
        top: `${memory.position.y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
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
        className="absolute rounded-full"
        style={{
          width: "40%", height: "25%",
          background: "rgba(255,255,255,0.3)",
          top: "15%", left: "20%",
          filter: "blur(3px)",
        }}
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
  );
}

export default function MemoryGalaxy({ onNext }: MemoryGalaxyProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div
      className="full-screen relative"
      style={{ background: "radial-gradient(ellipse at 40% 60%, #1a0a3a 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={180} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 500, height: 300, background: "rgba(188,167,255,0.08)", top: "20%", left: "60%", animationDelay: "2s" }} />
      <div className="nebula" style={{ width: 350, height: 350, background: "rgba(255,117,181,0.06)", bottom: "10%", left: "10%", animationDelay: "0s" }} />

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
          Our Memory Galaxy
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base"
          style={{ color: "#BCA7FF", fontFamily: "var(--font-dancing)", fontSize: "1.1rem" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Tap a planet to relive a memory together
        </motion.p>
      </div>

      {/* Planet galaxy — takes up most of the screen */}
      <div className="relative z-10 mx-auto" style={{ maxWidth: 700, height: "55vh", minHeight: 350 }}>
        {config.memories.map((memory) => (
          <PlanetNode key={memory.id} memory={memory} onClick={() => setSelectedMemory(memory)} />
        ))}

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
      </div>

      {/* Next button */}
      <div className="relative z-10 text-center pb-16">
        <motion.button
          onClick={onNext}
          className="btn-primary"
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

