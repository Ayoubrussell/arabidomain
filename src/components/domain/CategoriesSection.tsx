import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryIcons: Record<string, string> = {
  "real-estate": "🏗️",
  tech: "💻",
  finance: "💰",
  health: "🏥",
  education: "📚",
  travel: "✈️",
  ecommerce: "🛒",
  media: "📺",
};

export default async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { domains: true } } },
    orderBy: { name: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section className="border-t border-white/5 bg-charcoal-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black md:text-4xl">
            تصفّح حسب <span className="text-gold">الفئة</span>
          </h2>
          <p className="text-sm text-white/40">
            اختر الفئة التي تناسب مجال عملك
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/domains?category=${cat.slug}`}
              className="group rounded-2xl border border-white/5 bg-charcoal p-6 transition-all duration-300 hover:border-gold/30 hover:bg-charcoal-light"
            >
              <span className="mb-3 block text-3xl">
                {categoryIcons[cat.slug] || "📁"}
              </span>
              <h3 className="mb-1 text-lg font-bold transition-colors group-hover:text-gold">
                {cat.name}
              </h3>
              <p className="text-sm text-white/40">
                {cat._count.domains} نطاق متاح
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
