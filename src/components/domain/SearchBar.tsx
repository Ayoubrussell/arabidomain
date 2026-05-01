"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/domains?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={`relative w-full max-w-2xl ${large ? "mx-auto" : ""}`}
    >
      <div className="relative flex items-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-colors focus-within:border-accent/60">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن نطاقك المثالي..."
          className={`w-full bg-transparent pr-5 pl-32 text-white placeholder-white/50 outline-none ${large ? "py-5 text-lg" : "py-3 text-base"}`}
        />
        <button
          type="submit"
          className={`absolute left-2 rounded-xl bg-accent font-medium text-navy transition-all hover:bg-accent-light ${large ? "px-6 py-3" : "px-4 py-2 text-sm"}`}
        >
          بحث
        </button>
      </div>
    </motion.form>
  );
}
