"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiAcademicCap,
  HiChartBar,
  HiLightBulb,
  HiCode,
} from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GradientText from "@/components/ui/GradientText";

const stats = [
  {
    end: 12,
    suffix: "+",
    label: "Projects Built",
    icon: <HiCode className="w-6 h-6" />,
    color: "from-indigo-500 to-violet-500",
  },
  {
    end: 3,
    suffix: "",
    label: "Internships",
    icon: <HiChartBar className="w-6 h-6" />,
    color: "from-violet-500 to-cyan-500",
  },
  {
    end: 8,
    suffix: "+",
    label: "Courses Completed",
    icon: <HiAcademicCap className="w-6 h-6" />,
    color: "from-cyan-500 to-indigo-500",
  },
];

const currentlyItems = [
  "Learning Stochastic Calculus",
  "Building a VaR Engine",
  "Exploring Fixed Income Markets",
  "Studying CFA Level I",
  "Open Source Contributing",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="01"
          title="About "
          highlight="Me"
          subtitle="A bit about who I am and what drives me forward."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <motion.div
            variants={shouldReduceMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.p
              variants={shouldReduceMotion ? {} : itemVariants}
              className="font-dm text-white/70 text-lg leading-relaxed"
            >
              I'm a{" "}
              <GradientText className="font-semibold">
                Finance &amp; Risk Management
              </GradientText>{" "}
              student with a deep passion for quantitative methods and their
              application in modern financial markets. My academic journey has
              taken me through the intricacies of derivatives pricing, portfolio
              optimization, and statistical risk modeling.
            </motion.p>
            <motion.p
              variants={shouldReduceMotion ? {} : itemVariants}
              className="font-dm text-white/70 text-lg leading-relaxed"
            >
              What drives me is the intersection of{" "}
              <span className="text-cyan-400 font-medium">mathematics</span>,{" "}
              <span className="text-violet-400 font-medium">technology</span>,
              and{" "}
              <span className="text-indigo-400 font-medium">finance</span>. I
              enjoy building tools that translate complex stochastic models into
              actionable risk intelligence — from Monte Carlo simulations to
              real-time VaR engines.
            </motion.p>
            <motion.p
              variants={shouldReduceMotion ? {} : itemVariants}
              className="font-dm text-white/70 text-lg leading-relaxed"
            >
              Outside the classroom, I contribute to open-source financial
              libraries, write about quantitative finance concepts, and
              constantly explore how machine learning can augment traditional
              risk frameworks.
            </motion.p>

            {/* Currently strip */}
            <motion.div
              variants={shouldReduceMotion ? {} : itemVariants}
              className="pt-4"
            >
              <p className="font-dm text-sm text-white/40 uppercase tracking-widest mb-3">
                Currently
              </p>
              <div className="flex flex-wrap gap-2">
                {currentlyItems.map((item, i) => (
                  <motion.span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-dm text-sm text-white/70"
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.4, type: "spring" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <GlassCard key={stat.label} hover className="p-6" delay={i * 0.1}>
                <div className="flex items-center gap-5">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-syne text-4xl font-black text-white">
                      <AnimatedCounter
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </div>
                    <p className="font-dm text-sm text-white/50 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Extra insight card */}
            <GlassCard hover className="p-6" delay={0.35}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
                  <HiLightBulb className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-syne font-bold text-white text-lg mb-1">
                    Research Focus
                  </p>
                  <p className="font-dm text-sm text-white/50">
                    Tail risk modeling, exotic derivatives pricing, and
                    machine-learning applications in credit risk.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
