import { prisma } from "@/lib/prisma";
import DomainCard from "./DomainCard";
import Link from "next/link";

export default async function FeaturedDomains() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let domains: any[] = [];

  try {
    if (prisma) {
      domains = await prisma.domain.findMany({
        where: { isFeatured: true, status: "AVAILABLE" },
        include: { category: true },
        take: 6,
        orderBy: { createdAt: "desc" },
      });
    }
  } catch {
    // Database unavailable
  }

  if (domains.length === 0) return null;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
              The Collection
            </span>
            <h2 className="text-3xl font-black text-navy">
              نطاقات <span className="text-accent">مميّزة</span>
            </h2>
          </div>
          <Link
            href="/domains"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-accent"
          >
            عرض الكل &larr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map(
            (domain: {
              id: string;
              name: string;
              tld: string;
              fullName: string;
              description: string | null;
              price: { toString(): string } | null;
              arabicName: string | null;
              views: number;
              status: string;
              category: { name: string } | null;
            }) => (
              <DomainCard
                key={domain.id}
                id={domain.id}
                name={domain.name}
                tld={domain.tld}
                fullName={domain.fullName}
                description={domain.description}
                price={domain.price?.toString() ?? null}
                arabicName={domain.arabicName}
                views={domain.views}
                status={domain.status}
                category={domain.category?.name}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
