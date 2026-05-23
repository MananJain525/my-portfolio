"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiPython,
  SiR,
  SiPostgresql,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiGit,
} from "react-icons/si";
import {
  HiChartBar,
  HiCalculator,
  HiTrendingUp,
  HiDocumentText,
  HiBeaker,
  HiCurrencyDollar,
  HiTable,
  HiViewGrid,
} from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const techSkills = [
  { label: "Python", icon: <SiPython className="w-5 h-5" />, level: 92 },
  { label: "R", icon: <SiR className="w-5 h-5" />, level: 80 },
  { label: "Excel / VBA", icon: <HiTable className="w-5 h-5" />, level: 88 },
  { label: "SQL", icon: <SiPostgresql className="w-5 h-5" />, level: 75 },
  { label: "MATLAB", icon: <HiViewGrid className="w-5 h-5" />, level: 70 },
  { label: "NumPy / SciPy", icon: <SiNumpy className="w-5 h-5" />, level: 90 },
  { label: "Pandas", icon: <SiPandas className="w-5 h-5" />, level: 90 },
  { label: "scikit-learn", icon: <SiScikitlearn className="w-5 h-5" />, level: 78 },
  { label: "Jupyter", icon: <SiJupyter className="w-5 h-5" />, level: 95 },
  { label: "Bloomberg Terminal", icon: <HiChartBar className="w-5 h-5" />, level: 82 },
  { label: "QuantLib", icon: <HiCalculator className="w-5 h-5" />, level: 68 },
  { label: "Git", icon: <SiGit className="w-5 h-5" />, level: 80 },
];

const financeSkills = [
  { label: "Derivatives Pricing", icon: <HiCalculator className="w-4 h-4" />, color: "from-indigo-500 to-violet-500" },
  { label: "Risk Management", icon: <HiChartBar className="w-4 h-4" />, color: "from-violet-500 to-purple-500" },
  { label: "Fixed Income", icon: <HiDocumentText className="w-4 h-4" />, color: "from-cyan-500 to-blue-500" },
  { label: "Portfolio Theory", icon: <HiTrendingUp className="w-4 h-4" />, color: "from-emerald-500 to-teal-500" },
  { label: "Stochastic Calculus", icon: <HiBeaker className="w-4 h-4" />, color: "from-indigo-500 to-cyan-500" },
  { label: "Financial Econometrics", icon: <HiChartBar className="w-4 h-4" />, color: "from-violet-500 to-indigo-500" },
  { label: "Options & Volatility", icon: <HiCalculator className="w-4 h-4" />, color: "from-amber-500 to-orange-500" },
  { label: "Credit Risk", icon: <HiCurrencyDollar className="w-4 h-4" />, color: "from-rose-500 to-pink-500" },
  { label: "Monte Carlo Methods", icon: <HiBeaker className="w-4 h-4" />, color: "from-indigo-500 to-violet-500" },
  { label: "Yield Curve Modeling", icon: <HiTrendingUp className="w-4 h-4" />, color: "from-cyan-500 to-indigo-500" },
  { label: "Basel III / IFRS 9", icon: <HiDocumentText className="w-4 h-4" />, color: "from-violet-500 to-cyan-500" },
  { label: "VaR & CVaR", icon: <HiChartBar className="w-4 h-4" />, color: "from-indigo-500 to-violet-500" },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="04"
          title="My "
          highlight="Skills"
          subtitle="Technical toolkit and domain expertise I've developed."
        />

        <div className="space-y-12">
          {/* Technical Skills */}
          <div>
            <motion.h3
              className="font-syne text-lg font-bold text-white/80 mb-6 flex items-center gap-3"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
              Technical Skills
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {techSkills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <div
                    className="group flex flex-col items-center gap-3 p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div className="text-white/60 group-hover:text-indigo-400 transition-colors duration-300">
                      {skill.icon}
                    </div>
                    <span className="font-dm text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300 text-center leading-tight">
                      {skill.label}
                    </span>
                    {/* Skill bar */}
                    <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Finance Skills */}
          <div>
            <motion.h3
              className="font-syne text-lg font-bold text-white/80 mb-6 flex items-center gap-3"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
              Finance Skills
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {financeSkills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <div
                    className="group flex items-center gap-2.5 px-4 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/8 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                    style={{
                      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {skill.icon}
                    </div>
                    <span className="font-dm text-sm text-white/65 group-hover:text-white/90 transition-colors duration-300 whitespace-nowrap">
                      {skill.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
