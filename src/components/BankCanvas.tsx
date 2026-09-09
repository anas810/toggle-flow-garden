import { useEffect, useRef } from "react";

type State = "expansion" | "contraction";

type Particle = {
  a: number;
  r: number;
  speed: number;
  size: number;
  phase: number;
};

const GREEN: [number, number, number] = [74, 124, 89];
const RED: [number, number, number] = [168, 58, 46];

function mix(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(
    a[1] + (b[1] - a[1]) * t,
  )}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

export function BankCanvas({ state }: { state: State }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef(0);

  targetRef.current = state === "contraction" ? 1 : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const maxR = () => Math.min(width, height) * 0.52;
    const coreR = 46;

    const particles: Particle[] = Array.from({ length: 220 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: coreR + Math.random() * 260,
      speed: 0.25 + Math.random() * 0.65,
      size: 0.9 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = targetRef.current;
    let raf = 0;

    const drawBank = (cx: number, cy: number, color: string, glow: number, fill: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = "rgba(40,36,30,0.85)";

      // glow
      const g = ctx.createRadialGradient(0, 0, 8, 0, 0, 120);
      g.addColorStop(0, color.replace("rgb", "rgba").replace(")", `, ${0.22 * glow})`));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.fill();

      const w = 92;
      const bodyTop = -18;
      const bodyBottom = 46;

      // reserve fill inside the body
      const fillH = (bodyBottom - bodyTop) * fill;
      ctx.save();
      ctx.beginPath();
      ctx.rect(-w / 2, bodyBottom - fillH, w, fillH);
      ctx.clip();
      ctx.fillStyle = color.replace("rgb", "rgba").replace(")", ", 0.16)");
      ctx.fillRect(-w / 2, bodyTop, w, bodyBottom - bodyTop);
      ctx.restore();

      // pediment
      ctx.beginPath();
      ctx.moveTo(-w / 2 - 10, bodyTop);
      ctx.lineTo(0, -52);
      ctx.lineTo(w / 2 + 10, bodyTop);
      ctx.closePath();
      ctx.stroke();

      // architrave
      ctx.beginPath();
      ctx.rect(-w / 2 - 6, bodyTop, w + 12, 8);
      ctx.stroke();

      // columns
      for (let i = 0; i < 5; i++) {
        const x = -w / 2 + 8 + i * ((w - 16) / 4);
        ctx.beginPath();
        ctx.moveTo(x, bodyTop + 12);
        ctx.lineTo(x, bodyBottom - 6);
        ctx.stroke();
      }

      // base
      ctx.beginPath();
      ctx.rect(-w / 2 - 12, bodyBottom - 6, w + 24, 8);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      const target = targetRef.current;
      t += (target - t) * 0.045;

      const color = mix(GREEN, RED, t);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const outward = t;
      const dir = 1 - 2 * outward; // +1 inward, -1 outward
      const R = maxR();

      for (const p of particles) {
        if (!reduced) {
          p.r += -dir * p.speed * 1.5;
          p.a += 0.0016 * (1 - outward * 2);
          if (p.r < coreR + 4) p.r = R + Math.random() * 60;
          if (p.r > R + 70) p.r = coreR + 6 + Math.random() * 10;
        }
        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r * 0.62;
        const fade = Math.max(0, Math.min(1, 1 - (p.r - coreR) / (R * 0.95)));
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color
          .replace("rgb", "rgba")
          .replace(")", `, ${0.18 + fade * 0.62})`);
        ctx.fill();
      }

      drawBank(cx, cy, color, 1, 0.72 - t * 0.42);

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-[380px] w-full sm:h-[460px]"
    />
  );
}
