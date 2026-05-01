"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  { label: "العقارات", slug: "real-estate" },
  { label: "السيارات", slug: "automotive" },
  { label: "التقنية", slug: "tech" },
  { label: "المالية والأعمال", slug: "finance" },
  { label: "نمط الحياة", slug: "lifestyle" },
];

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/domains?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-navy pt-28 pb-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-accent">
            بوتيك النطاقات العربية الفاخرة
          </span>

          <h1 className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
            امتلك هويّتك
            <br />
            <span className="text-accent">الرقميّة</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-400">
            مجموعة مُختارة بعناية من النطاقات العربية النادرة، من كلمة واحدة،
            صُمّمت لتمنح علامتك التجارية حضوراً عالمياً يليق بطموحك.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-10 flex max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن نطاقك المثالي... (مثال: aqar)"
            className="flex-1 px-5 py-4 text-sm text-navy outline-none placeholder:text-gray-400"
            dir="rtl"
          />
          <button
            type="submit"
            className="bg-navy px-6 text-sm font-bold text-white transition-colors hover:bg-navy-light"
          >
            بحث
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "+150", label: "نطاق فاخر" },
            { value: "+40", label: "علامة تجارية" },
            { value: "100%", label: "نقل آمن" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black text-accent">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-gray-500">تصفّح حسب الفئة:</span>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => router.push(`/domains?category=${cat.slug}`)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
