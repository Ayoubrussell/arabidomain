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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: any[] = [];

  try {
    if (prisma) {
      categories = await prisma.category.findMany({
        include: { _count: { select: { domains: true } } },
        orderBy: { name: "asc" },
      });
    }
  } catch {
    // Database unavailable — show empty state
  }

  if (categories.length === 0) return null;

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
            تصفّح حسب <span className="text-accent-dark">الفئة</span>
          </h2>
          <p className="text-sm text-gray-500">
            اختر الفئة التي تناسب مجال عملك
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/domains?category=${cat.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md"
            >
              <span className="mb-3 block text-3xl">
                {categoryIcons[cat.slug] || "📁"}
              </span>
              <h3 className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-accent-dark">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500">
                {cat._count.domains} نطاق متاح
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
