"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainId: string;
  domainName: string;
}

export default function OfferModal({
  isOpen,
  onClose,
  domainId,
  domainName,
}: OfferModalProps) {
  const [form, setForm] = useState({
    buyerName: "",
    email: "",
    phone: "",
    offerAmount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domainId,
          buyerName: form.buyerName,
          email: form.email,
          phone: form.phone || undefined,
          offerAmount: form.offerAmount ? Number(form.offerAmount) : undefined,
          message: form.message || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "حدث خطأ");
      }

      setSuccess(true);
      setForm({ buyerName: "", email: "", phone: "", offerAmount: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-charcoal p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gold">
                قدّم عرضاً — {domainName}
              </h2>
              <button
                onClick={onClose}
                className="text-white/40 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-4xl">🎉</div>
                <h3 className="mb-2 text-lg font-bold text-gold">
                  تم إرسال عرضك بنجاح!
                </h3>
                <p className="text-sm text-white/50">
                  سنتواصل معك في أقرب وقت ممكن.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-gold px-6 py-2 text-sm font-medium text-background transition-colors hover:bg-gold-light"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <div>
                  <label className="mb-1 block text-sm text-white/60">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.buyerName}
                    onChange={(e) =>
                      setForm({ ...form, buyerName: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-3 text-white outline-none transition-colors focus:border-gold/50"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/60">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-3 text-white outline-none transition-colors focus:border-gold/50"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/60">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-3 text-white outline-none transition-colors focus:border-gold/50"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/60">
                    مبلغ العرض (بالدولار)
                  </label>
                  <input
                    type="number"
                    value={form.offerAmount}
                    onChange={(e) =>
                      setForm({ ...form, offerAmount: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-3 text-white outline-none transition-colors focus:border-gold/50"
                    dir="ltr"
                    min="0"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/60">
                    رسالتك
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-charcoal-dark px-4 py-3 text-white outline-none transition-colors focus:border-gold/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gold py-3 font-bold text-background transition-all hover:bg-gold-light disabled:opacity-50"
                >
                  {loading ? "جاري الإرسال..." : "إرسال العرض"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
