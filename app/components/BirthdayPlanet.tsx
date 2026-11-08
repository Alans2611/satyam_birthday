"use client";

import { motion } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface BirthdayPlanetProps {
  onExplore: () => void;
}

export default function BirthdayPlanet({ onExplore }: BirthdayPlanetProps) {
  return (
    <div
      className="full-screen flex flex-col items-center justify-center relative py-12 px-4 overflow-y-auto"
      style={{ background: "radial-gradient(ellipse at 60% 30%, #2a1050 0%, #100B25 70%)" }}
    >
      <GalaxyCanvas starCount={220} shootingStars={false} />

      {/* Nebulas */}
      <div
        className="nebula"
        style={{
          width: 600,
          height: 320,
          background: "rgba(255,117,181,0.08)",
          top: "0%",
          right: "-10%",
          animationDelay: "1s",
        }}
      />
      <div
        className="nebula"
        style={{
          width: 450,
          height: 450,
          background: "rgba(188,167,255,0.08)",
          bottom: "0%",
          left: "-5%",
          animationDelay: "5s",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
        {/* Planet */}
        <motion.div
          className="relative mb-6 sm:mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Planet glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,117,181,0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: "scale(1.5)",
            }}
          />

          {/* Planet ring */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 220,
              height: 46,
              borderRadius: "50%",
              border: "3px solid rgba(255,182,217,0.45)",
              transform: "translate(-50%,-50%) rotateX(70deg) scaleX(1.4)",
            }}
          />

          {/* Planet sphere */}
          <div
            className="relative"
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #FF9ED0, #9B59B6 50%, #1B1038)",
              boxShadow:
                "0 0 50px rgba(255,117,181,0.45), inset -18px -8px 35px rgba(0,0,0,0.55)",
            }}
          >
            {/* Planet shine */}
            <div
              className="absolute rounded-full"
              style={{
                width: 45,
                height: 25,
                background: "rgba(255,255,255,0.2)",
                top: 18,
                left: 20,
                filter: "blur(6px)",
              }}
            />

            {/* Orbiting stars */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 7,
                  height: 7,
                  background: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
                  top: "50%",
                  left: "50%",
                  boxShadow: `0 0 8px ${i % 2 === 0 ? "#FFB6D9" : "#BCA7FF"}`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4.5 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.2,
                }}
                transformTemplate={({ rotate }) =>
                  `translate(-50%, -50%) rotate(${rotate}) translateX(${78 + i * 18}px)`
                }
              />
            ))}
          </div>

          {/* Floating sparkles around planet */}
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-xs"
              style={{
                top: `${15 + Math.sin((i / 6) * Math.PI * 2) * 75}px`,
                left: `${65 + Math.cos((i / 6) * Math.PI * 2) * 75}px`,
                color: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
              }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 glass-card"
          style={{
            borderColor: "rgba(255,182,217,0.3)",
            background: "rgba(255,117,181,0.08)",
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-[0.25em] uppercase" style={{ color: "#FFB6D9" }}>
            {config.birthdayPlanet.badge}
          </span>
        </motion.div>

        {/* Text */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {config.birthdayPlanet.heading}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl mb-8"
          style={{
            fontFamily: "var(--font-dancing)",
            color: "#FFB6D9",
            fontSize: "clamp(1.15rem, 3.2vw, 1.6rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {config.birthdayPlanet.subheading}
        </motion.p>

        {/* Cosmic Milestones replacing the countdown */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-2xl mb-8"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          viewport={{ once: true }}
        >
          {config.birthdayPlanet.milestones.map((m, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300"
              style={{
                background: "rgba(27, 16, 56, 0.75)",
                border: "1px solid rgba(255, 182, 217, 0.2)",
              }}
              whileHover={{ y: -4, borderColor: "rgba(255, 117, 181, 0.5)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,117,181,0.15) 0%, transparent 70%)",
                }}
              />
              <span className="text-2xl mb-1.5">{m.icon}</span>
              <span
                className="text-xl sm:text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#FFF7FF",
                }}
              >
                {m.value}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#BCA7FF", fontFamily: "var(--font-inter)" }}
              >
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Romantic Note */}
        <motion.p
          className="text-sm sm:text-base max-w-lg mb-8 leading-relaxed"
          style={{
            fontFamily: "var(--font-dancing)",
            color: "rgba(255, 247, 255, 0.85)",
            fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          &ldquo;{config.birthdayPlanet.note}&rdquo;
        </motion.p>

        {/* Button */}
        <motion.button
          onClick={onExplore}
          className="btn-primary text-base sm:text-lg px-8 py-3.5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {config.birthdayPlanet.exploreButton}
        </motion.button>
      </div>
    </div>
  );
}
