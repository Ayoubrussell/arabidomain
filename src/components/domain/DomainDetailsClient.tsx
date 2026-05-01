"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import OfferModal from "./OfferModal";

interface DomainDetails {
  id: string;
  name: string;
  tld: string;
  fullName: string;
  description: string | null;
  price: number | null;
  views: number;
  status: string;
  category: string | null;
}

export default function DomainDetailsClient({
  domain,
}: {
  domain: DomainDetails;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const highlights = [
    { icon: "✦", label: "قصير وسهل التذكر", desc: "اسم مختصر يعلق في الذهن" },
    {
      icon: "◆",
      label: "قابل للعلامة التجارية",
      desc: "مثالي لبناء هوية تجارية قوية",
    },
    {
      icon: "★",
      label: "نطاق بريميوم",
      desc: "من أفضل النطاقات في السوق",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back link */}
        <a
          href="/domains"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-gold"
        >
          → العودة إلى النطاقات
        </a>

        {/* Domain name display */}
        <div className="mb-12 rounded-3xl border border-white/5 bg-charcoal p-12 text-center">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-gold/10 blur-[60px]" />
            </div>
            <h1 className="relative mb-4 text-5xl font-black md:text-7xl">
              {domain.name}
              <span className="text-gold">{domain.tld}</span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-white/40">
            {domain.category && (
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold">
                {domain.category}
              </span>
            )}
            <span>{domain.views} مشاهدة</span>
            <span dir="ltr">{domain.tld}</span>
            <span>{domain.name.length} أحرف</span>
          </div>
        </div>

        {/* Price and CTAs */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-charcoal p-8">
            <p className="mb-2 text-sm text-white/40">السعر</p>
            <p className="mb-6 text-4xl font-black text-gold">
              {formatPrice(domain.price)}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full rounded-xl bg-gold py-4 text-lg font-bold text-background transition-all hover:bg-gold-light"
              >
                قدّم عرضاً
              </button>
              <a
                href={getWhatsAppLink(domain.fullName)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-4 text-lg font-bold text-green-400 transition-all hover:bg-green-500/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل عبر واتساب
              </a>
            </div>
          </div>

          {/* Trust section */}
          <div className="rounded-2xl border border-white/5 bg-charcoal p-8">
            <h3 className="mb-4 text-lg font-bold text-gold">
              لماذا هذا النطاق مميز؟
            </h3>
            <div className="space-y-4">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-start gap-3">
                  <span className="mt-1 text-gold">{h.icon}</span>
                  <div>
                    <p className="font-bold">{h.label}</p>
                    <p className="text-sm text-white/40">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/5 bg-charcoal-dark p-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔒</span>
                <div>
                  <p className="text-sm font-bold">نقل آمن عبر Escrow.com</p>
                  <p className="text-xs text-white/40">
                    ضمان حماية كاملة للبائع والمشتري
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {domain.description && (
          <div className="rounded-2xl border border-white/5 bg-charcoal p-8">
            <h3 className="mb-4 text-lg font-bold text-gold">عن هذا النطاق</h3>
            <p className="leading-relaxed text-white/60">{domain.description}</p>
          </div>
        )}
      </motion.div>

      <OfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        domainId={domain.id}
        domainName={domain.fullName}
      />
    </>
  );
}
