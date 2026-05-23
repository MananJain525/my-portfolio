"use client";

import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import GradientText from "@/components/ui/GradientText";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-dm text-sm text-white/40">
          <GradientText className="font-semibold">Manan Jain</GradientText>
          <span className="mx-2">·</span>
          {new Date().getFullYear()}
          <span className="mx-2">·</span>
          Built with Next.js &amp; ♥
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-200"
            aria-label="Twitter"
          >
            <FiTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
