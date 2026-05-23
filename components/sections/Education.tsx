"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiAcademicCap, HiCalendar, HiLocationMarker } from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

const educationData = [
  {
    institution: "Narsee Monjee Institute of Management Studies",
    degree: "B.B.A. (Hons.) in Finance & Risk Management",
    period: "2022 – 2026",
    location: "Mumbai, India",
    gpa: "3.9 / 4.0",
    color: "from-indigo-500 to-violet-500",
    courses: [
      "Financial Derivatives",
      "Fixed Income Securities",
      "Portfolio Management",
      "Financial Econometrics",
      "Stochastic Processes",
      "Credit Risk Modeling",
      "Options Pricing Theory",
      "Corporate Finance",
      "Quantitative Methods",
      "Risk Analytics & Regulation",
    ],
  },
  {
    institution: "CFA Institute",
    degree: "CFA Level I Candidate",
    period: "Exam: Jun 2025",
    location: "Self-Study",
    gpa: null,
    color: "from-violet-500 to-cyan-500",
    courses: [
      "Ethical & Professional Standards",
      "Fixed Income",
      "Equity Valuation",
      "Derivatives",
      "Portfolio Management",
      "Alternative Investments",
      "Financial Reporting Analysis",
      "Economics",
    ],
  },
];

export default function Education() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="05"
          title="My "
          highlight="Education"
          subtitle="Academic foundation in finance, mathematics, and risk."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <GlassCard hover className="p-8 h-full flex flex-col" delay={0}>
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-6 flex-shrink-0`}
                >
                  <HiAcademicCap className="w-7 h-7 text-white" />
                </div>

                {/* Institution */}
                <div
                  className={`text-xs font-dm font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}
                >
                  {edu.institution}
                </div>

                {/* Degree */}
                <h3 className="font-syne text-xl font-bold text-white mb-3">
                  {edu.degree}
                </h3>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="flex items-center gap-1.5 font-dm text-sm text-white/45">
                    <HiCalendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1.5 font-dm text-sm text-white/45">
                    <HiLocationMarker className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                  {edu.gpa && (
                    <span className="font-dm text-sm text-white/45">
                      GPA:{" "}
                      <GradientText className="font-semibold text-sm">
                        {edu.gpa}
                      </GradientText>
                    </span>
                  )}
                </div>

                <div className="w-full h-px bg-white/8 mb-6" />

                {/* Courses */}
                <div className="flex-grow">
                  <p className="font-dm text-xs text-white/35 uppercase tracking-widest mb-3">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, j) => (
                      <motion.span
                        key={course}
                        className="text-xs font-dm text-white/60 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
                        initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.05, duration: 0.3 }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
