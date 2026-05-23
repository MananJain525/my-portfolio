"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLS = 72;
// Monospace chars are roughly 1.8× taller than wide — compensate so pixels stay square
const CHAR_ASPECT = 1.8;

function brightnessToChar(brightness: number): string {
  if (brightness <= 0.3) return "0";
  if (brightness <= 0.6) return "1";
  return ".";
}

export default function AsciiAvatar() {
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      // Create the canvas programmatically — avoids the circular dependency
      // where the ref-based canvas never mounts because the component returns
      // null until rows are populated.
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      const numCols = COLS;
      const numRows = Math.round(
        (numCols * img.naturalHeight) / img.naturalWidth / CHAR_ASPECT
      );
      const blockW = img.naturalWidth / numCols;
      const blockH = img.naturalHeight / numRows;
      const { data } = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

      const result: string[] = [];

      for (let row = 0; row < numRows; row++) {
        let line = "";
        for (let col = 0; col < numCols; col++) {
          const px = Math.min(
            Math.floor(col * blockW + blockW / 2),
            img.naturalWidth - 1
          );
          const py = Math.min(
            Math.floor(row * blockH + blockH / 2),
            img.naturalHeight - 1
          );
          const idx = (py * img.naturalWidth + px) * 4;

          const alpha = data[idx + 3];
          if (alpha < 10) {
            line += " ";
            continue;
          }

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          line += brightnessToChar(brightness);
        }
        result.push(line);
      }

      setRows(result);
    };

    img.src = "/profile.png";
  }, []);

  if (rows.length === 0) return null;

  return (
    <motion.div
      className="relative select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.9 }}
    >
      <div
        className="font-mono text-[7px] leading-[1.1] text-blue-200/50 whitespace-pre bg-transparent"
        style={{
          maskImage: "radial-gradient(circle, black 40%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)",
        }}
      >
        {rows.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </motion.div>
  );
}
