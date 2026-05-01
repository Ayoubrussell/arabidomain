"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "نطاق متاح" },
  { value: "150+", label: "عميل سعيد" },
  { value: "100%", label: "ضمان النقل الآمن" },
  { value: "24/7", label: "دعم فني" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-white/5 bg-charcoal-dark py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="text-center"
          >
            <div className="mb-2 text-3xl font-black text-gold md:text-4xl">
              {stat.value}
            </div>
            <div className="text-sm text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
