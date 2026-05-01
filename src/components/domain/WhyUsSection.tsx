"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🛡️",
    title: "ضمان Escrow.com",
    description:
      "كل عملية شراء تتم بأمان عبر منصة الضمان العالمية، حماية كاملة للطرفين.",
  },
  {
    icon: "⚡",
    title: "نقل ملكية فوري",
    description:
      "ننقل ملكية النطاق إلى حسابك خلال 24-72 ساعة بعد إتمام الدفع.",
  },
  {
    icon: "✦",
    title: "استشارة مجانية",
    description:
      "فريقنا يساعدك في اختيار النطاق المناسب لرؤية علامتك التجارية.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-navy">
            لماذا <span className="text-accent">نِطاقات</span>؟
          </h2>
          <p className="text-sm text-gray-500">
            نوفّر تجربة متكاملة لامتلاك نطاقك الفاخر بأمان واحترافية عالية.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 text-center"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-navy">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
