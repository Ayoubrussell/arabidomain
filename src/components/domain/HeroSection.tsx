"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold">
            بوتيك النطاقات الفاخرة
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl"
        >
          امتلك{" "}
          <span className="bg-gradient-to-l from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
            هويتك الرقمية
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg text-white/50"
        >
          نطاقات عربية مميزة وحصرية — قصيرة، لا تُنسى، جاهزة لبناء علامتك
          التجارية الراقية.
        </motion.p>

        <SearchBar large />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-6 text-xs text-white/30"
        >
          <span>aqar.com</span>
          <span className="text-gold/30">◆</span>
          <span>seha.com</span>
          <span className="text-gold/30">◆</span>
          <span>tamweel.com</span>
          <span className="text-gold/30">◆</span>
          <span>safar.com</span>
        </motion.div>
      </div>
    </section>
  );
}
