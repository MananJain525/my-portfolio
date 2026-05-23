"use client";

import { motion, useReducedMotion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";
import { HiOfficeBuilding, HiCalendar, HiLocationMarker } from "react-icons/hi";

const experiences = [
  {
    company: "Meridian Capital Partners",
    role: "Quantitative Risk Analyst Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Mumbai, India",
    color: "from-indigo-500 to-violet-500",
    achievements: [
      "Developed a Python-based Monte Carlo simulation engine to stress-test a ₹2.3B equity derivatives portfolio under 500+ tail scenarios, reducing risk assessment time by 40%.",
      "Built and backtested a parametric VaR model using GARCH(1,1) for volatility estimation across 15 equity indices, achieving 97.4% coverage ratio on 250-day rolling windows.",
      "Automated daily risk reporting via Bloomberg API integration, consolidating Greeks, DV01, and scenario P&L into a single dashboard used by 3 senior portfolio managers.",
    ],
  },
  {
    company: "Apex Structured Finance",
    role: "Fixed Income Research Intern",
    period: "May 2023 – Jul 2023",
    location: "Delhi, India",
    color: "from-violet-500 to-cyan-500",
    achievements: [
      "Constructed a Nelson-Siegel-Svensson yield curve model bootstrapped from G-sec instruments, reducing pricing error on off-the-run bonds by 18 basis points on average.",
      "Conducted relative value analysis on 40+ corporate bonds using OAS and Z-spread metrics, identifying 6 mispricings that informed ₹180M in client trade recommendations.",
      "Assisted in building an interest rate sensitivity dashboard (DV01, convexity, KRDs) that improved portfolio rebalancing speed by 30%.",
    ],
  },
  {
    company: "FinEdge Analytics",
    role: "Data & Risk Research Intern",
    period: "Dec 2022 – Feb 2023",
    location: "Remote",
    color: "from-cyan-500 to-indigo-500",
    achievements: [
      "Designed a credit scorecard using logistic regression on a 50,000-sample retail loan dataset, achieving AUC of 0.83 and Gini coefficient of 0.66 on holdout set.",
      "Implemented IFRS 9 Expected Credit Loss staging logic in Python, classifying exposures into Stage 1/2/3 and computing 12-month vs. lifetime PD-LGD-EAD estimates.",
      "Produced a 20-page research report on CDS spreads as leading indicators of sovereign credit stress, cited by two senior analysts in client presentations.",
    ],
  },
];

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="03"
          title="Work "
          highlight="Experience"
          subtitle="Where I've applied quantitative finance in the real world."
        />

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 opacity-30 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={exp.company}
                  className={`relative flex flex-col md:flex-row ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-start md:items-center`}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, x: isLeft ? -40 : 40 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute hidden md:flex items-center justify-center left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${exp.color} z-10`}
                    style={{
                      boxShadow: "0 0 0 4px rgba(10,10,15,1), 0 0 0 5px rgba(99,102,241,0.3)",
                    }}
                  />

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                    <GlassCard hover className="p-6 md:p-8" delay={i * 0.12}>
                      {/* Company & Role */}
                      <div className="mb-5">
                        <div
                          className={`inline-block text-xs font-dm font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                        >
                          {exp.company}
                        </div>
                        <h3 className="font-syne text-xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-white/40 font-dm text-sm">
                          <span className="flex items-center gap-1">
                            <HiCalendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiLocationMarker className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-white/8 mb-5" />

                      {/* Achievements */}
                      <ul className="space-y-3">
                        {exp.achievements.map((ach, j) => (
                          <li key={j} className="flex gap-3 items-start">
                            <span
                              className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color}`}
                            />
                            <p className="font-dm text-sm text-white/60 leading-relaxed">
                              {ach}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
