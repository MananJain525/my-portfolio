"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// High-density grid — more columns = more recognisable face detail
const COLS = 140;
// Most browser monospace fonts render chars ~2× taller than wide
const CHAR_ASPECT = 2.0;
// Classic ASCII density ramp: index 0 = darkest/densest, last = brightest/sparsest
const CHARS = "@#8$%&Boahkbdpwm0QLCJUYX zcvunxrjft/|()1?-_+~i!lI;:,. ";

function brightnessToChar(brightness: number): string {
  const i = Math.floor((1 - brightness) * (CHARS.length - 1));
  return CHARS[Math.max(0, Math.min(CHARS.length - 1, i))];
}

export default function AsciiAvatar() {
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
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
          const px = Math.min(Math.floor(col * blockW + blockW / 2), img.naturalWidth - 1);
          const py = Math.min(Math.floor(row * blockH + blockH / 2), img.naturalHeight - 1);
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

    img.src = "/profile2.png";
  }, []);

  if (rows.length === 0) return null;

  return (
    <motion.div
      className="relative select-none w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8 }}
    >
      <div className="font-mono text-[5.5px] leading-[1.15] text-gray-300 whitespace-pre bg-transparent">
        {rows.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </motion.div>
  );
}
