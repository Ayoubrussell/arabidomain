"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

interface DomainCardProps {
  fullName: string;
  name: string;
  tld: string;
  price: number | null;
  category?: string | null;
  isFeatured?: boolean;
}

export default function DomainCard({
  fullName,
  name,
  tld,
  price,
  category,
}: DomainCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/domain/${fullName}`}
        className="group block rounded-2xl border border-white/5 bg-charcoal p-6 transition-all duration-300 hover:border-gold/30 hover:bg-charcoal-light"
      >
        <div className="mb-4 flex items-start justify-between">
          {category && (
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
              {category}
            </span>
          )}
          <span className="text-xs text-white/30">{tld}</span>
        </div>

        <h3 className="mb-1 text-2xl font-bold tracking-wide text-white transition-colors group-hover:text-gold">
          {name}
          <span className="text-gold/60">{tld}</span>
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <span
            className={`text-lg font-bold ${price != null ? "text-gold" : "text-gold/60"}`}
          >
            {formatPrice(price)}
          </span>
          <span className="text-xs text-white/30 transition-colors group-hover:text-gold">
            عرض التفاصيل ←
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
