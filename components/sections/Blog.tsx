"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiArrowRight, HiClock, HiTag } from "react-icons/hi";
import SectionHeader from "@/components/ui/SectionHeader";
import GradientText from "@/components/ui/GradientText";

const posts = [
  {
    category: "Options",
    tag: "Derivatives",
    title: "Understanding the Greeks in Options Trading",
    excerpt:
      "A deep dive into Delta, Gamma, Theta, Vega, and Rho — how each Greek measures sensitivity to market forces, and how traders use them to hedge and structure positions.",
    readTime: "8 min read",
    date: "Apr 2025",
    color: "from-indigo-500 to-violet-500",
    tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
  {
    category: "Risk",
    tag: "Risk Management",
    title: "VaR: What It Doesn't Tell You",
    excerpt:
      "Value-at-Risk is the industry standard for risk reporting, yet it famously failed in 2008. This post explores tail risk, Expected Shortfall, and why CVaR is a better metric.",
    readTime: "6 min read",
    date: "Mar 2025",
    color: "from-violet-500 to-cyan-500",
    tagColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    category: "Fixed Income",
    tag: "Rates",
    title: "Building a Yield Curve from Scratch",
    excerpt:
      "Step-by-step walkthrough of bootstrapping a sovereign yield curve from on-the-run Treasuries, fitting the Nelson-Siegel model, and using it to price coupon bonds.",
    readTime: "10 min read",
    date: "Feb 2025",
    color: "from-cyan-500 to-indigo-500",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Blog() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="blog" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="06"
          title="My "
          highlight="Writing"
          subtitle="Thoughts on quantitative finance, risk, and the markets."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={shouldReduceMotion ? {} : cardVariants}
            >
              <div
                className="group h-full flex flex-col rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Gradient top bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${post.color}`}
                />

                <div className="p-6 flex flex-col flex-grow">
                  {/* Tag & read time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-dm font-medium px-3 py-1 rounded-full border ${post.tagColor}`}
                    >
                      {post.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-dm text-white/35">
                      <HiClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-syne text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-violet-400 group-hover:to-cyan-400 transition-all duration-300 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-dm text-sm text-white/55 leading-relaxed mb-5 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <span className="font-dm text-xs text-white/35">
                      {post.date}
                    </span>
                    <a
                      href="#"
                      className="flex items-center gap-1.5 font-dm text-sm font-medium text-indigo-400 hover:text-violet-400 transition-colors"
                      aria-label={`Read ${post.title}`}
                    >
                      Read More
                      <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
