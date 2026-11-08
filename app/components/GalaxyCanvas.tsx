"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  timer: number;
}

interface GalaxyCanvasProps {
  className?: string;
  starCount?: number;
  shootingStars?: boolean;
}

export default function GalaxyCanvas({
  className = "",
  starCount = 250,
  shootingStars = true,
}: GalaxyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    function initStars() {
      const w = canvas!.width;
      const h = canvas!.height;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }));

      if (shootingStars) {
        shootRef.current = Array.from({ length: 5 }, () => createShootingStar(w, h));
      }
    }

    function createShootingStar(w: number, h: number): ShootingStar {
      return {
        x: Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 0,
        active: false,
        timer: Math.random() * 300 + 100,
      };
    }

    let t = 0;
    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      // Stars
      starsRef.current.forEach((s) => {
        const a = (Math.sin(t * s.speed + s.phase) + 1) / 2;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 247, 255, ${a * 0.8 + 0.1})`;
        ctx!.fill();
      });

      // Shooting stars
      if (shootingStars) {
        shootRef.current.forEach((s, i) => {
          if (!s.active) {
            s.timer--;
            if (s.timer <= 0) {
              s.active = true;
              s.opacity = 1;
              const fresh = createShootingStar(w, h);
              s.x = fresh.x;
              s.y = fresh.y;
              s.len = fresh.len;
              s.speed = fresh.speed;
              s.angle = fresh.angle;
            }
            return;
          }

          const dx = Math.cos(s.angle) * s.speed;
          const dy = Math.sin(s.angle) * s.speed;

          const grad = ctx!.createLinearGradient(
            s.x, s.y,
            s.x - dx * s.len / s.speed,
            s.y - dy * s.len / s.speed
          );
          grad.addColorStop(0, `rgba(255, 182, 217, ${s.opacity})`);
          grad.addColorStop(1, "transparent");

          ctx!.beginPath();
          ctx!.moveTo(s.x, s.y);
          ctx!.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();

          s.x += dx;
          s.y += dy;
          s.opacity -= 0.02;

          if (s.opacity <= 0 || s.x > w || s.y > h) {
            s.active = false;
            s.timer = Math.random() * 300 + 150;
          }

          shootRef.current[i] = s;
        });
      }

      t += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [starCount, shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

