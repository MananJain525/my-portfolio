"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/lib/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useSpring(0, { stiffness: 300, damping: 28 });
  const dotY = useSpring(0, { stiffness: 300, damping: 28 });
  const ringX = useSpring(0, { stiffness: 100, damping: 20 });
  const ringY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    dotX.set(x);
    dotY.set(y);
    ringX.set(x);
    ringY.set(y);
  }, [x, y, dotX, dotY, ringX, ringY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        (target as HTMLElement).style?.cursor === "pointer";
      setIsHovering(isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          zIndex: 9999,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-indigo-500"
          animate={{
            width: isHovering ? 20 : 12,
            height: isHovering ? 20 : 12,
            opacity: isHovering ? 0.6 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4)",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          zIndex: 9998,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: isHovering ? 50 : 40,
            height: isHovering ? 50 : 40,
            borderColor: isHovering
              ? "rgba(99, 102, 241, 0.5)"
              : "rgba(255, 255, 255, 0.2)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
