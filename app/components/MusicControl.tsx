"use client";

import { useRef, useEffect, useState } from "react";
import { config } from "../config/birthday";

type MusicState = "idle" | "playing" | "paused";

export default function MusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicState>("idle");
  const [available, setAvailable] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!config.music.enabled) {
      setAvailable(false);
      return;
    }

    try {
      const audio = new Audio(config.music.src);
      audio.preload = "none";
      audio.loop = true;
      audio.volume = 0.4;
      audio.onerror = () => setAvailable(false);
      audioRef.current = audio;
    } catch {
      setAvailable(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  if (!available || !config.music.enabled) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === "playing") {
      audio.pause();
      setState("paused");
    } else {
      audio.play().catch(() => setAvailable(false));
      setState("playing");
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Music icon button */}
      <button
        onClick={toggle}
        aria-label={state === "playing" ? "Pause music" : "Play music"}
        className="glass-card p-3 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
        style={{ background: "rgba(27, 16, 56, 0.8)", border: "1px solid rgba(255,117,181,0.3)" }}
      >
        {state === "playing" ? (
          <div className="flex items-end gap-0.5 h-5 w-5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-1 rounded-full"
                style={{
                  background: "#FF75B5",
                  height: `${[60, 100, 80, 50][i - 1]}%`,
                  animation: `equalizerBar${i} 0.8s ease-in-out infinite`,
                  animationDelay: `${(i - 1) * 0.1}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5l12-2v13" stroke="#FF75B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="#FF75B5" strokeWidth="2"/>
            <circle cx="18" cy="16" r="3" stroke="#FF75B5" strokeWidth="2"/>
          </svg>
        )}
      </button>

      {/* Mute button (shown when playing) */}
      {state === "playing" && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="glass-card p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ background: "rgba(27, 16, 56, 0.8)", border: "1px solid rgba(255,117,181,0.3)" }}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#BCA7FF" strokeWidth="2" strokeLinejoin="round"/>
              <line x1="23" y1="9" x2="17" y2="15" stroke="#BCA7FF" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="9" x2="23" y2="15" stroke="#BCA7FF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="#BCA7FF" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#BCA7FF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      )}

      <style>{`
        @keyframes equalizerBar1 { 0%,100%{height:40%} 50%{height:90%} }
        @keyframes equalizerBar2 { 0%,100%{height:70%} 50%{height:30%} }
        @keyframes equalizerBar3 { 0%,100%{height:50%} 50%{height:100%} }
        @keyframes equalizerBar4 { 0%,100%{height:80%} 50%{height:40%} }
      `}</style>
    </div>
  );
}

