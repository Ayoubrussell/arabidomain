"use client";

import { motion } from "framer-motion";

export default function VIPSection() {
  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-3 inline-block text-xs font-bold tracking-widest text-gold uppercase">
            VIP Access
          </span>
          <h2 className="mb-3 text-3xl font-black text-white">
            انضم لقائمة النخبة
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400">
            كن أول من يعلم عن النطاقات العربية الفاخرة والفرص الاستثمارية قبل
            طرحها للعامة.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm"
          >
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-gold px-6 text-sm font-bold text-navy transition-colors hover:bg-gold-light"
            >
              اشتراك
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-600">
            نعدك بعدم إرسال رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
