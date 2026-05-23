"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  HiMail,
  HiCheckCircle,
  HiExternalLink,
} from "react-icons/hi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const contactLinks = [
  {
    icon: <HiMail className="w-5 h-5" />,
    label: "Email",
    value: "mananjaingadiya@gmail.com",
    href: "mailto:mananjaingadiya@gmail.com",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: <FiLinkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "/in/manan-jain",
    href: "https://linkedin.com/in/manan-jain",
    color: "from-violet-500 to-cyan-500",
  },
  {
    icon: <FiGithub className="w-5 h-5" />,
    label: "GitHub",
    value: "/manan-jain",
    href: "https://github.com/manan-jain",
    color: "from-cyan-500 to-indigo-500",
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="section-padding px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          number="07"
          title="Get In "
          highlight="Touch"
          subtitle="Have a project in mind or just want to connect? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            className="space-y-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <h3 className="font-syne text-2xl font-bold text-white mb-3">
                Let's build something together.
              </h3>
              <p className="font-dm text-white/55 leading-relaxed">
                Whether you're looking for a quant research intern, want to
                collaborate on a project, or just want to talk derivatives and
                risk — drop me a message and I'll get back to you within 24
                hours.
              </p>
            </div>

            <div className="space-y-3">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-4 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  aria-label={`Contact via ${link.label}: ${link.value}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="font-dm text-xs text-white/35 uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className="font-dm text-sm text-white/80 group-hover:text-white transition-colors">
                      {link.value}
                    </p>
                  </div>
                  <HiExternalLink className="ml-auto w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <GlassCard className="p-8" delay={0}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      initial={shouldReduceMotion ? {} : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <HiCheckCircle className="w-20 h-20 text-emerald-400 mb-4" />
                    </motion.div>
                    <h4 className="font-syne text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="font-dm text-white/55">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-dm text-xs text-white/40 uppercase tracking-wider mb-2"
                        >
                          Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="glow-input"
                          aria-label="Your name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 font-dm text-xs text-rose-400">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-dm text-xs text-white/40 uppercase tracking-wider mb-2"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="glow-input"
                          aria-label="Your email address"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 font-dm text-xs text-rose-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block font-dm text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="What's this about?"
                        className="glow-input"
                        aria-label="Message subject"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 font-dm text-xs text-rose-400">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-dm text-xs text-white/40 uppercase tracking-wider mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me about your project, opportunity, or just say hi..."
                        className="glow-input resize-none"
                        aria-label="Your message"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="mt-1.5 font-dm text-xs text-rose-400">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-dm font-medium rounded-xl py-3.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      aria-label={isSubmitting ? "Sending message..." : "Send message"}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <HiMail className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
