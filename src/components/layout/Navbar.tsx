"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-navy/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent">◆</span>
          <span className="text-lg font-bold tracking-wide text-white">
            بريميوم
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm text-white/70 transition-colors hover:text-accent"
          >
            الرئيسية
          </Link>
          <Link
            href="/domains"
            className="text-sm text-white/70 transition-colors hover:text-accent"
          >
            النطاقات
          </Link>
          <Link
            href="/domains"
            className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-navy"
          >
            تصفّح النطاقات
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/70 md:hidden"
          aria-label="القائمة"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-4 bg-navy px-6 py-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/70 transition-colors hover:text-accent"
              >
                الرئيسية
              </Link>
              <Link
                href="/domains"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-white/70 transition-colors hover:text-accent"
              >
                النطاقات
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
