"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/lib/hooks/useCountUp";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

function CounterInner({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const count = useCountUp({ end, duration });

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {end}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {isInView ? (
        <CounterInner
          end={end}
          suffix={suffix}
          prefix={prefix}
          duration={duration}
          className={className}
        />
      ) : (
        <span className={className}>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}
