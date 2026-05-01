"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-black text-navy md:text-4xl">
            علامتك التجارية تستحق الأفضل
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            اكتشف النطاق المثالي لمشروعك القادم، واحجز اسمك في العالم الرقمي
            اليوم.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/domains"
              className="rounded-xl bg-navy px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-navy-light"
            >
              تصفّح النطاقات
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-gray-300 px-8 py-3.5 text-sm font-bold text-navy transition-all hover:border-accent hover:text-accent"
            >
              تواصل معنا
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
