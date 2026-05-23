"use client";

/* PHOTO SETUP:
   Place your photo at /public/profile.jpg
   Best results with:
   - Portrait orientation (taller than wide)
   - Face centered horizontally in frame
   - Head occupying top 50–60% of the photo height
   - High contrast lighting
   The default crop props isolate face + hair + neck + top-of-shoulders
   from a standard portrait. Fine-tune via cropTop/Bottom/Left/Right. */

import { useEffect, useRef } from "react";

interface BinaryPortraitProps {
  imageSrc: string;
  width?: number;
  height?: number;
  cellSize?: number;
  cropTop?: number;    // fraction 0–1, default 0.05
  cropBottom?: number; // fraction 0–1, default 0.55
  cropLeft?: number;   // fraction 0–1, default 0.15
  cropRight?: number;  // fraction 0–1, default 0.85
  className?: string;
}

interface Cell {
  col: number;
  row: number;
  char: "1" | "0";
  opacity: number;
}

function luminanceToOpacity(L: number): number {
  if (L < 40)  return 0.92; // deep shadows: eyes, brows, hair
  if (L < 80)  return 0.68; // mid shadows: nose, jaw contour
  if (L < 130) return 0.38; // mid tones: cheeks, forehead
  if (L < 180) return 0.14; // highlights: fade toward bg
  return 0;                  // near-white / background — skip
}

export default function BinaryPortrait({
  imageSrc,
  width     = 460,
  height    = 520,
  cellSize  = 9,
  cropTop   = 0.05,
  cropBottom = 0.55,
  cropLeft  = 0.15,
  cropRight = 0.85,
  className = "",
}: BinaryPortraitProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glitchRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    canvas.width  = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cells: Cell[] = [];
    let cleanupParallax: (() => void) | undefined;
    let cleanupHover:    (() => void) | undefined;
    let isMounted = true;

    // ── Shared redraw ─────────────────────────────────────────────────
    function drawBase() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.font = "10px monospace";
      ctx!.textBaseline = "top";
      ctx!.globalCompositeOperation = "source-over";

      for (const cell of cells) {
        ctx!.globalAlpha = cell.opacity;
        ctx!.fillStyle   = "#e2e8f0";
        ctx!.fillText(cell.char, cell.col * cellSize, cell.row * cellSize);
      }

      ctx!.globalAlpha = 1;
    }

    // ── Stage 1: percentage-based portrait crop ────────────────────────
    function step1_cropToSubject(img: HTMLImageElement): HTMLCanvasElement {
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const srcX = Math.floor(cropLeft   * iw);
      const srcY = Math.floor(cropTop    * ih);
      const srcW = Math.floor((cropRight  - cropLeft)   * iw);
      const srcH = Math.floor((cropBottom - cropTop)    * ih);

      const off    = document.createElement("canvas");
      off.width    = width;
      off.height   = height;
      const offCtx = off.getContext("2d")!;

      // Contrast boost deepens shadows → denser char clusters at
      // eyes, nose bridge, jawline, hair before pixel sampling
      offCtx.filter = "contrast(1.4) brightness(0.8)";
      offCtx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, width, height);
      offCtx.filter = "none";

      return off;
    }

    // ── Stage 2: soft elliptical alpha mask ───────────────────────────
    function step2_applyEllipseMask(off: HTMLCanvasElement) {
      const offCtx  = off.getContext("2d")!;
      const cx      = width  / 2;
      const cy      = height / 2;
      const hRadius = width  * 0.48;
      const vRadius = height * 0.50;

      offCtx.save();
      offCtx.globalCompositeOperation = "destination-in";

      // Scale so a unit-circle gradient becomes our ellipse
      offCtx.translate(cx, cy);
      offCtx.scale(hRadius, vRadius);

      const grd = offCtx.createRadialGradient(0, 0, 0, 0, 0, 1);
      grd.addColorStop(0,    "rgba(0,0,0,1)");
      grd.addColorStop(0.82, "rgba(0,0,0,0.9)");
      grd.addColorStop(1,    "rgba(0,0,0,0)");

      offCtx.fillStyle = grd;
      // fillRect must cover the full canvas in scaled (unit) coordinates
      offCtx.fillRect(
        -cx      / hRadius,
        -cy      / vRadius,
        width    / hRadius,
        height   / vRadius
      );
      offCtx.restore();
    }

    // ── Stage 3: luminance → binary character rendering ───────────────
    function step3_renderBinary(off: HTMLCanvasElement) {
      const { data } = off.getContext("2d")!.getImageData(0, 0, width, height);
      const gridCols = Math.ceil(width  / cellSize);
      const gridRows = Math.ceil(height / cellSize);
      cells = [];

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const x0 = col * cellSize;
          const y0 = row * cellSize;
          const x1 = Math.min(x0 + cellSize, width);
          const y1 = Math.min(y0 + cellSize, height);

          let sumL = 0, sumA = 0, n = 0;
          for (let py = y0; py < y1; py++) {
            for (let px = x0; px < x1; px++) {
              const i = (py * width + px) * 4;
              sumA += data[i + 3];
              sumL += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
              n++;
            }
          }
          if (!n) continue;

          const avgA = sumA / n;
          const avgL = sumL / n;

          const lumOpacity = luminanceToOpacity(avgL);
          // Skip background (high lum) and fully masked-out cells (low alpha)
          if (lumOpacity === 0 || avgA < 15) continue;

          // Ellipse edge fade: alpha from destination-in mask → smooth dissolve
          const finalOpacity = lumOpacity * Math.min(1, avgA / 220);
          if (finalOpacity < 0.04) continue;

          cells.push({
            col,
            row,
            // Stable deterministic checkerboard — no flicker between renders
            char: (col * 31 + row * 17) % 2 === 0 ? "1" : "0",
            opacity: finalOpacity,
          });
        }
      }

      drawBase();
    }

    // ── Stage 4: glitch stream ────────────────────────────────────────
    function step4_startGlitch() {
      if (glitchRef.current) clearInterval(glitchRef.current);

      glitchRef.current = setInterval(() => {
        const count     = Math.floor(cells.length * 0.06);
        const indices: number[]            = [];
        const origChars: Array<"1" | "0"> = [];

        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * cells.length);
          indices.push(idx);
          origChars.push(cells[idx].char);
          cells[idx].char = cells[idx].char === "1" ? "0" : "1";
        }
        drawBase();

        setTimeout(() => {
          for (let i = 0; i < indices.length; i++) {
            cells[indices[i]].char = origChars[i];
          }
          drawBase();
        }, 180);
      }, 2800);
    }

    // ── Stage 5: mouse parallax on rAF ───────────────────────────────
    function step5_startParallax(): () => void {
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

      const onMouseMove = (e: MouseEvent) => {
        targetX = Math.max(-18, Math.min(18, (e.clientX - window.innerWidth  / 2) * 0.05));
        targetY = Math.max(-12, Math.min(12, (e.clientY - window.innerHeight / 2) * 0.05));
      };

      const tick = () => {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        if (wrapperRef.current) {
          wrapperRef.current.style.transform =
            `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
        }
        rafRef.current = requestAnimationFrame(tick);
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      rafRef.current = requestAnimationFrame(tick);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafRef.current);
      };
    }

    // ── Stage 6: hover scan glow ──────────────────────────────────────
    function step6_startHoverGlow(): () => void {
      const onMouseMove = (e: MouseEvent) => {
        const rect = canvas!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || x > width || y < 0 || y > height) return;

        drawBase();
        const grd = ctx!.createRadialGradient(x, y, 0, x, y, 130);
        grd.addColorStop(0, "rgba(99,102,241,0.10)");
        grd.addColorStop(1, "rgba(99,102,241,0)");
        ctx!.globalAlpha = 1;
        ctx!.globalCompositeOperation = "source-atop";
        ctx!.fillStyle = grd;
        ctx!.fillRect(0, 0, width, height);
        ctx!.globalCompositeOperation = "source-over";
      };

      const onMouseLeave = () => drawBase();

      canvas!.addEventListener("mousemove", onMouseMove, { passive: true });
      canvas!.addEventListener("mouseleave", onMouseLeave);

      return () => {
        canvas!.removeEventListener("mousemove", onMouseMove);
        canvas!.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    // ── Boot ──────────────────────────────────────────────────────────
    const img = new Image();

    img.onerror = () => {
      console.error(`[BinaryPortrait] Failed to load image: ${imageSrc}`);
    };

    img.onload = () => {
      if (!isMounted) return;

      function runPipeline() {
        const off = step1_cropToSubject(img);
        step2_applyEllipseMask(off);
        step3_renderBinary(off);
        step4_startGlitch();
        cleanupParallax = step5_startParallax();
        cleanupHover    = step6_startHoverGlow();
      }

      runPipeline();
    };

    img.src = imageSrc;

    return () => {
      isMounted = false;
      if (glitchRef.current) clearInterval(glitchRef.current);
      cancelAnimationFrame(rafRef.current);
      cleanupParallax?.();
      cleanupHover?.();
    };
  }, [imageSrc, width, height, cellSize, cropTop, cropBottom, cropLeft, cropRight]);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block select-none ${className}`}
      style={{
        // Subtle indigo atmosphere behind the portrait — the only visible "glow"
        background:
          "radial-gradient(ellipse 55% 65% at 50% 45%, rgba(99,102,241,0.07) 0%, transparent 65%)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          background:   "transparent",
          mixBlendMode: "normal",
          display:      "block",
          letterSpacing: "-1px",
        }}
      />
    </div>
  );
}
