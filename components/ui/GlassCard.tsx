"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  delay = 0,
}: GlassCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      };

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10",
        "group",
        className
      )}
      style={{
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileHover={hover ? hoverAnimation : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {hover && !shouldReduceMotion && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)",
            transition: "opacity 0.3s ease",
          }}
        >
          <div
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent"
            style={{
              animation: "shimmer 1.5s ease-in-out",
              transform: "translateX(-100%) skewX(-12deg)",
            }}
          />
        </div>
      )}

      {hover && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.3 }}
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(99,102,241,0.2)",
          }}
        />
      )}

      {children}
    </motion.div>
  );
}
