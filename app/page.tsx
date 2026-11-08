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

function ProgressDots({ current }: { current: Screen }) {
  const idx = SCREENS.indexOf(current);
  if (current === "welcome") return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex gap-2" aria-hidden="true">
      {SCREENS.slice(1).map((s, i) => (
        <div
          key={s}
          className="rounded-full transition-all duration-500"
          style={{
            width: idx - 1 === i ? 20 : 8,
            height: 8,
            background: idx - 1 === i ? "#FF75B5" : "rgba(188,167,255,0.3)",
          }}
        />
      ))}
    </div>
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
      <ProgressDots current={screen} />
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
