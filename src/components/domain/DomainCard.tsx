"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface DomainCardProps {
  id: string;
  name: string;
  tld: string;
  fullName: string;
  description?: string | null;
  price?: number | string | null;
  arabicName?: string | null;
  views?: number;
  category?: string | null;
  status?: string;
}

export default function DomainCard({
  name,
  tld,
  fullName,
  description,
  price,
  arabicName,
  views = 0,
  category,
  status = "AVAILABLE",
}: DomainCardProps) {
  const formattedPrice =
    price && Number(price) > 0
      ? `$${Number(price).toLocaleString("en-US")}`
      : null;

  const formattedViews = views.toLocaleString("ar-EG");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Premium Domain
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
            status === "AVAILABLE"
              ? "bg-emerald-50 text-emerald-600"
              : status === "PENDING"
              ? "bg-amber-50 text-amber-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {status === "AVAILABLE" ? "متاح" : status === "PENDING" ? "محجوز" : "مُباع"}
        </span>
      </div>

      <Link href={`/domain/${fullName}`} className="block">
        <div className="mb-1">
          <span className="text-3xl font-black text-navy">{name}</span>
          <span className="text-3xl font-black text-accent">.{tld}</span>
        </div>

        {arabicName && (
          <p className="mb-3 text-sm text-gray-500">({arabicName})</p>
        )}

        {description && (
          <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-gray-400">
            {description}
          </p>
        )}
      </Link>

      <div className="flex items-end justify-between border-t border-gray-100 pt-4">
        <div>
          <div className="mb-0.5 text-[10px] text-gray-400">السعر</div>
          <div className="text-lg font-black text-navy">
            {formattedPrice || "قدّم عرضك"}
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-xs">{formattedViews}</span>
        </div>
      </div>

      {category && (
        <div className="absolute top-6 left-6">
          <span className="text-[10px] font-medium text-accent">{category}</span>
        </div>
      )}
    </motion.div>
  );
}
