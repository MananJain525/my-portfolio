"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HiArrowDown, HiArrowRight, HiMail } from "react-icons/hi";
import GradientText from "@/components/ui/GradientText";
import BinaryPortrait from "@/components/ui/BinaryPortrait";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-20%"]
  );
  const subtextY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-10%"]
  );
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const handleScrollToWork = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            filter: "blur(80px)",
            scale: blobScale,
          }}
        >
          <div className="w-full h-full animate-blob-1" />
        </motion.div>
        <motion.div
          className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            filter: "blur(80px)",
            scale: blobScale,
          }}
        >
          <div className="w-full h-full animate-blob-2" />
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-[30%] w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(80px)",
            scale: blobScale,
          }}
        >
          <div className="w-full h-full animate-blob-3" />
        </motion.div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left column — text */}
          <div className="text-center lg:text-left">

            {/* Availability Badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 mb-8"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-dm text-sm text-white/70">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div style={{ y: nameY }}>
              <motion.h1
                className="font-syne text-[72px] md:text-[96px] font-black leading-[0.9] tracking-tight text-white mb-4"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Manan
                <br />
                <GradientText>Jain</GradientText>
              </motion.h1>
            </motion.div>

            {/* Role */}
            <motion.div style={{ y: subtextY }}>
              <motion.p
                className="font-syne text-xl md:text-2xl font-semibold mb-4"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              >
                <GradientText from="from-violet-400" via="via-cyan-400" to="to-indigo-400">
                  Finance &amp; Risk Management Student
                </GradientText>
              </motion.p>

              {/* Tagline */}
              <motion.p
                className="font-dm text-lg text-white/50 max-w-xl mb-10 lg:mb-12"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              >
                Building quantitative models that transform complex financial risk
                into clear, actionable insight.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
              >
                <button
                  onClick={handleScrollToWork}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-dm font-medium rounded-full px-8 py-4 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300"
                  aria-label="View my work"
                >
                  View My Work
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleScrollToContact}
                  className="flex items-center justify-center gap-2 rounded-full px-8 py-4 font-dm font-medium text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
                  aria-label="Get in touch"
                >
                  <HiMail className="w-4 h-4" />
                  Get In Touch
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column — binary portrait (desktop only) */}
          <div className="hidden lg:flex items-center justify-center">
            <BinaryPortrait imageSrc="/profile.png" />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <span className="font-dm text-xs text-white/30 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiArrowDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
