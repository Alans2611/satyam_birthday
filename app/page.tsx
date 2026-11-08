"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import BirthdayPlanet from "./components/BirthdayPlanet";
import MemoryGalaxy from "./components/MemoryGalaxy";
import ElevenReasons from "./components/ElevenReasons";
import LoveLetter from "./components/LoveLetter";
import BirthdayCake from "./components/BirthdayCake";
import FinalScreen from "./components/FinalScreen";
import MusicControl from "./components/MusicControl";

type Screen =
  | "welcome"
  | "birthday"
  | "memories"
  | "reasons"
  | "letter"
  | "cake"
  | "final";

const SCREENS: Screen[] = ["welcome", "birthday", "memories", "reasons", "letter", "cake", "final"];

const SCREEN_LABELS: Record<Screen, string> = {
  welcome: "Welcome",
  birthday: "Celebration",
  memories: "Our Memories",
  reasons: "11 Reasons",
  letter: "Love Letter",
  cake: "Make a Wish",
  final: "Forever",
};

function ProgressDots({ current, onSelect }: { current: Screen; onSelect: (s: Screen) => void }) {
  const idx = SCREENS.indexOf(current);
  if (current === "welcome") return null;
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2" aria-label="Universe journey navigation">
      {SCREENS.slice(1).map((s, i) => {
        const isActive = idx - 1 === i;
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
            aria-label={`Go to ${SCREEN_LABELS[s]}`}
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: isActive ? 22 : 8,
                height: 8,
                background: isActive ? "#FF75B5" : "rgba(188,167,255,0.35)",
                boxShadow: isActive ? "0 0 10px rgba(255,117,181,0.7)" : "none",
              }}
            />
            {/* Tooltip on hover */}
            <span
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                background: "rgba(16, 11, 37, 0.9)",
                border: "1px solid rgba(255, 182, 217, 0.25)",
                color: "#FFB6D9",
                backdropFilter: "blur(6px)",
              }}
            >
              {SCREEN_LABELS[s]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

const screenVariants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen bg-midnight" aria-label="A Little Universe for Satyam">
      <ProgressDots current={screen} onSelect={goTo} />
      <MusicControl />

      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <motion.div
            key="welcome"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <WelcomeScreen onEnter={() => goTo("birthday")} />
          </motion.div>
        )}

        {screen === "birthday" && (
          <motion.div
            key="birthday"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <BirthdayPlanet onExplore={() => goTo("memories")} />
          </motion.div>
        )}

        {screen === "memories" && (
          <motion.div
            key="memories"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <MemoryGalaxy onNext={() => goTo("reasons")} />
          </motion.div>
        )}

        {screen === "reasons" && (
          <motion.div
            key="reasons"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <ElevenReasons onNext={() => goTo("letter")} />
          </motion.div>
        )}

        {screen === "letter" && (
          <motion.div
            key="letter"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <LoveLetter onNext={() => goTo("cake")} />
          </motion.div>
        )}

        {screen === "cake" && (
          <motion.div
            key="cake"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <BirthdayCake onNext={() => goTo("final")} />
          </motion.div>
        )}

        {screen === "final" && (
          <motion.div
            key="final"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <FinalScreen onReplay={() => goTo("welcome")} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
