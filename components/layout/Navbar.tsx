"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HiDownload, HiMenuAlt4, HiX } from "react-icons/hi";
import GradientText from "@/components/ui/GradientText";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-xl bg-black/40 border-b border-white/5"
            : "bg-transparent"
        )}
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="font-syne text-xl font-black"
            aria-label="Go to top"
          >
            <GradientText className="text-2xl font-black">MJ</GradientText>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-dm text-sm text-white/60 hover:text-white transition-colors duration-200"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden lg:block">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-dm text-sm font-medium rounded-full px-5 py-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              aria-label="Download Resume"
            >
              <HiDownload className="w-4 h-4" />
              Resume
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenuAlt4 className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-2xl bg-dark-base/95 flex flex-col items-center justify-center"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-syne text-3xl font-bold text-white/80 hover:text-white transition-colors"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                className="mt-4 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-dm text-base font-medium rounded-full px-8 py-3"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.4 }}
                aria-label="Download Resume"
              >
                <HiDownload className="w-5 h-5" />
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
