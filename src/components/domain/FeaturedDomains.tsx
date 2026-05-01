import { prisma } from "@/lib/prisma";
import DomainCard from "./DomainCard";

export default async function FeaturedDomains() {
  const domains = await prisma.domain.findMany({
    where: { isFeatured: true, status: "AVAILABLE" },
    include: { category: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  if (domains.length === 0) return null;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
            نطاقات <span className="text-accent-dark">مميزة</span>
          </h2>
          <p className="text-sm text-gray-500">
            مجموعة مختارة بعناية من أفضل النطاقات المتاحة
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <DomainCard
              key={domain.id}
              fullName={domain.fullName}
              name={domain.name}
              tld={domain.tld}
              price={domain.price ? Number(domain.price) : null}
              category={domain.category?.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
