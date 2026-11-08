"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { config } from "../config/birthday";
import GalaxyCanvas from "./GalaxyCanvas";

interface BirthdayPlanetProps {
  onExplore: () => void;
}

function useCountdown() {
  const [status, setStatus] = useState<"before" | "today" | "after">("before");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const thisYear = now.getFullYear();
      const { day, month } = config.birthday;

      // Check if birthday is today
      if (now.getMonth() + 1 === month && now.getDate() === day) {
        setStatus("today");
        return;
      }

      // Next birthday
      const thisYearBirthday = new Date(thisYear, month - 1, day);
      if (now > thisYearBirthday) {
        // After this year's birthday
        const nextBirthday = new Date(thisYear + 1, month - 1, day);
        setStatus("after");
        const diff = Math.max(0, nextBirthday.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setStatus("before");
        const diff = Math.max(0, thisYearBirthday.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    compute();
    const interval = setInterval(compute, 1000);
    return () => clearInterval(interval);
  }, []);

  return { status, countdown };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="glass-card flex items-center justify-center rounded-2xl"
        style={{ width: 70, height: 70, fontSize: "2rem", fontFamily: "var(--font-playfair)", color: "#FFB6D9" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs mt-2 tracking-widest uppercase" style={{ color: "#BCA7FF" }}>{label}</span>
    </div>
  );
}

export default function BirthdayPlanet({ onExplore }: BirthdayPlanetProps) {
  const { status, countdown } = useCountdown();

  return (
    <div className="full-screen flex flex-col items-center justify-center relative py-16"
      style={{ background: "radial-gradient(ellipse at 60% 30%, #2a1050 0%, #100B25 70%)" }}>
      <GalaxyCanvas starCount={200} shootingStars={false} />

      {/* Nebulas */}
      <div className="nebula" style={{ width: 600, height: 300, background: "rgba(255,117,181,0.07)", top: "0%", right: "-10%", animationDelay: "1s" }} />
      <div className="nebula" style={{ width: 400, height: 400, background: "rgba(188,167,255,0.07)", bottom: "0%", left: "-5%", animationDelay: "5s" }} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

        {/* Planet */}
        <motion.div
          className="relative mb-10"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Planet glow */}
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,117,181,0.3) 0%, transparent 70%)", filter: "blur(30px)", transform: "scale(1.5)" }} />

          {/* Planet ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 240, height: 50, borderRadius: "50%", border: "3px solid rgba(255,182,217,0.4)", transform: "translate(-50%,-50%) rotateX(70deg) scaleX(1.4)" }} />

          {/* Planet sphere */}
          <div className="relative"
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #FF9ED0, #9B59B6 50%, #1B1038)",
              boxShadow: "0 0 60px rgba(255,117,181,0.4), inset -20px -10px 40px rgba(0,0,0,0.5)",
            }}>
            {/* Planet shine */}
            <div className="absolute rounded-full"
              style={{ width: 50, height: 30, background: "rgba(255,255,255,0.15)", top: 20, left: 25, filter: "blur(8px)" }} />

            {/* Orbiting stars */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 8, height: 8,
                  background: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
                  top: "50%", left: "50%",
                  boxShadow: `0 0 6px ${i % 2 === 0 ? "#FFB6D9" : "#BCA7FF"}`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
                transformTemplate={({ rotate }) =>
                  `translate(-50%, -50%) rotate(${rotate}) translateX(${90 + i * 20}px)`
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
                top: `${20 + Math.sin((i / 6) * Math.PI * 2) * 90}px`,
                left: `${80 + Math.cos((i / 6) * Math.PI * 2) * 90}px`,
                color: i % 2 === 0 ? "#FFB6D9" : "#BCA7FF",
              }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>

        {/* Text */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "var(--font-playfair)", color: "#FFF7FF" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {config.birthdayPlanet.heading}
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl mb-10"
          style={{ fontFamily: "var(--font-dancing)", color: "#FFB6D9", fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {config.birthdayPlanet.subheading}
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {status === "today" ? (
            <div className="text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-dancing)", color: "#FF75B5" }}>
              {config.birthdayPlanet.onBirthday}
            </div>
          ) : status === "after" ? (
            <div className="text-center">
              <p className="text-base mb-6" style={{ color: "#BCA7FF", fontFamily: "var(--font-dancing)", fontSize: "1.2rem" }}>
                {config.birthdayPlanet.afterBirthday}
              </p>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(188,167,255,0.6)" }}>
                Next celebration in
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center">
                <CountdownUnit value={countdown.days} label="Days" />
                <CountdownUnit value={countdown.hours} label="Hours" />
                <CountdownUnit value={countdown.minutes} label="Mins" />
                <CountdownUnit value={countdown.seconds} label="Secs" />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(188,167,255,0.6)" }}>
                {config.birthdayPlanet.countdownTitle}
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center">
                <CountdownUnit value={countdown.days} label="Days" />
                <CountdownUnit value={countdown.hours} label="Hours" />
                <CountdownUnit value={countdown.minutes} label="Mins" />
                <CountdownUnit value={countdown.seconds} label="Secs" />
              </div>
            </div>
          )}
        </motion.div>

        <motion.button
          onClick={onExplore}
          className="btn-primary text-base sm:text-lg"
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

