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
        className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md"
      >
        <div className="mb-4 flex items-start justify-between">
          {category && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent-dark">
              {category}
            </span>
          )}
          <span className="text-xs text-gray-400">{tld}</span>
        </div>

        <h3 className="mb-1 text-2xl font-bold tracking-wide text-foreground transition-colors group-hover:text-accent-dark">
          {name}
          <span className="text-accent">{tld}</span>
        </h3>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <span
            className={`text-lg font-bold ${price != null ? "text-accent-dark" : "text-accent"}`}
          >
            {formatPrice(price)}
          </span>
          <span className="text-xs text-gray-400 transition-colors group-hover:text-accent-dark">
            عرض التفاصيل ←
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
