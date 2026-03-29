"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAccent: boolean;
  alpha: number;
}

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let logoImg: HTMLImageElement | null = null;

    // Load logo for ghost background
    const img = new Image();
    img.src = "/logo.png";
    img.onload = () => {
      logoImg = img;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initParticles(w, h);
    };

    const initParticles = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 7000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.5,
        isAccent: Math.random() < 0.12,
        alpha: Math.random() * 0.4 + 0.25,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Ghost logo — centered, very faint
      if (logoImg) {
        const size = Math.min(w, h) * 0.7;
        const lx = (w - size) / 2;
        const ly = (h - size) / 2;
        ctx.globalAlpha = 0.045;
        ctx.drawImage(logoImg, lx, ly, size, size);
        ctx.globalAlpha = 1;
      }

      // Move + bounce particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;
          if (dist < maxDist) {
            const t = 1 - dist / maxDist;
            const isAccentLine =
              particles[i].isAccent || particles[j].isAccent;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isAccentLine ? "#f97316" : "#3a3a3a";
            ctx.globalAlpha = t * (isAccentLine ? 0.35 : 0.25);
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw particles on top
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isAccent ? "#f97316" : "#525252";
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Subtle glow on accent particles
        if (p.isAccent) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius * 3
          );
          grad.addColorStop(0, "rgba(249,115,22,0.15)");
          grad.addColorStop(1, "rgba(249,115,22,0)");
          ctx.fillStyle = grad;
          ctx.globalAlpha = 1;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
