"use client";

import { motion, useReducedMotion } from "framer-motion";
import GradientText from "./GradientText";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  number,
  title,
  highlight,
  subtitle,
  className,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      className={cn("relative mb-16 text-center", className)}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[160px] font-syne font-black text-white/[0.03] select-none pointer-events-none whitespace-nowrap leading-none"
        aria-hidden="true"
      >
        {number}
      </span>

      <div className="relative z-10">
        <p className="text-indigo-400 font-dm text-sm font-medium tracking-widest uppercase mb-3">
          {number}
        </p>
        <h2 className="font-syne text-4xl md:text-5xl font-bold text-white leading-tight">
          {titleParts[0]}
          {highlight && <GradientText>{highlight}</GradientText>}
          {titleParts[1]}
        </h2>
        {subtitle && (
          <p className="mt-4 text-white/50 font-dm text-lg max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
