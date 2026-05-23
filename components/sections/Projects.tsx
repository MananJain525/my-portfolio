"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiArrowRight, HiExternalLink } from "react-icons/hi";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

const categoryColors: Record<string, string> = {
  "Quant Modeling": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "Risk Analysis": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Derivatives Pricing": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Portfolio Mgmt": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Fixed Income": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Credit Risk": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const projects = [
  {
    category: "Derivatives Pricing",
    title: "Black-Scholes Options Pricer",
    description:
      "A real-time options pricing engine implementing the Black-Scholes model with Greeks computation, implied volatility surface visualization, and P&L scenario analysis.",
    tech: ["Python", "NumPy", "SciPy", "Plotly", "Streamlit"],
    href: "#",
  },
  {
    category: "Risk Analysis",
    title: "VaR & CVaR Risk Model",
    description:
      "Comprehensive Value-at-Risk and Conditional VaR engine supporting Historical, Parametric, and Monte Carlo simulation methodologies with backtesting capabilities.",
    tech: ["Python", "Pandas", "Monte Carlo", "statsmodels"],
    href: "#",
  },
  {
    category: "Fixed Income",
    title: "Fixed Income Yield Curve Builder",
    description:
      "Bootstrap yield curves from Treasury instruments, build Nelson-Siegel fits, and compute key rate durations and convexity metrics across the full term structure.",
    tech: ["Python", "QuantLib", "NumPy", "Matplotlib"],
    href: "#",
  },
  {
    category: "Portfolio Mgmt",
    title: "Monte Carlo Portfolio Simulator",
    description:
      "Stochastic portfolio simulation with correlated asset returns, efficient frontier optimization, Sharpe ratio maximization, and tail-risk stress testing scenarios.",
    tech: ["Python", "NumPy", "SciPy", "cvxpy", "Plotly"],
    href: "#",
  },
  {
    category: "Quant Modeling",
    title: "Interest Rate Derivatives Analyzer",
    description:
      "Pricing and hedging of interest rate swaps, caps, and floors using short-rate models (Vasicek, Hull-White) with sensitivity analysis and cash flow decomposition.",
    tech: ["Python", "QuantLib", "NumPy", "pandas"],
    href: "#",
  },
  {
    category: "Credit Risk",
    title: "Credit Risk Scoring Model",
    description:
      "Machine-learning credit scorecard combining logistic regression and gradient boosting with SHAP-based explainability, PD/LGD estimation, and IFRS 9 staging logic.",
    tech: ["Python", "sklearn", "XGBoost", "SHAP", "SQL"],
    href: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="02"
          title="My "
          highlight="Projects"
          subtitle="Quantitative models and financial tools I've built from scratch."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={shouldReduceMotion ? {} : cardVariants}
            >
              <div
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 h-full flex flex-col p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                    style={{
                      transform: "translateX(-100%) skewX(-12deg)",
                      animation: "shimmer 0.8s ease-in-out",
                    }}
                  />
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(99,102,241,0.3), 0 16px 48px rgba(0,0,0,0.5)",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Category badge */}
                  <span
                    className={`self-start text-xs font-dm font-medium px-3 py-1 rounded-full border mb-4 ${
                      categoryColors[project.category] ??
                      "bg-white/10 text-white/60 border-white/20"
                    }`}
                  >
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-syne text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-violet-400 group-hover:to-cyan-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-dm text-sm text-white/55 leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-dm text-white/40 bg-white/5 border border-white/8 rounded-md px-2 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* View link */}
                  <a
                    href={project.href}
                    className="flex items-center gap-2 text-sm font-dm font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0"
                    aria-label={`View ${project.title}`}
                  >
                    View Project
                    <HiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
