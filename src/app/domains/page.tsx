export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DomainCard from "@/components/domain/DomainCard";
import DomainFilters from "@/components/domain/DomainFilters";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tld?: string;
    length?: string;
    sort?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 12;

async function DomainsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.DomainWhereInput = {
    status: "AVAILABLE",
  };

  if (params.q) {
    where.OR = [
      { name: { contains: params.q, mode: "insensitive" } },
      { fullName: { contains: params.q, mode: "insensitive" } },
      { description: { contains: params.q, mode: "insensitive" } },
    ];
  }

  if (params.category) {
    where.category = { slug: params.category };
  }

  if (params.tld) {
    where.tld = params.tld;
  }

  // Length filtering is done post-query since Prisma lacks native string length filters

  let orderBy: Prisma.DomainOrderByWithRelationInput = { createdAt: "desc" };
  if (params.sort === "price_asc") orderBy = { price: "asc" };
  else if (params.sort === "price_desc") orderBy = { price: "desc" };
  else if (params.sort === "views") orderBy = { views: "desc" };

  const lengthFilter = params.length ? Number(params.length) : 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allDomains: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let categories: any[] = [];

  try {
    if (prisma) {
      [allDomains, categories] = await Promise.all([
        prisma.domain.findMany({
          where,
          include: { category: true },
          orderBy,
        }),
        prisma.category.findMany({ orderBy: { name: "asc" } }),
      ]);
    }
  } catch {
    // Database unavailable
  }

  const filtered = lengthFilter
    ? allDomains.filter((d) =>
        lengthFilter >= 6
          ? d.name.length >= 6
          : d.name.length === lengthFilter
      )
    : allDomains;

  const total = filtered.length;
  const domains = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-72">
        <Suspense>
          <DomainFilters categories={categories} />
        </Suspense>
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            النطاقات المتاحة{" "}
            <span className="text-sm font-normal text-gray-400">
              ({total} نطاق)
            </span>
          </h2>
        </div>

        {domains.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">
            <p className="text-lg text-gray-400">لا توجد نتائج</p>
            <p className="mt-2 text-sm text-gray-300">
              جرّب تغيير معايير البحث
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params2 = new URLSearchParams();
              if (params.q) params2.set("q", params.q);
              if (params.category) params2.set("category", params.category);
              if (params.tld) params2.set("tld", params.tld);
              if (params.length) params2.set("length", params.length);
              if (params.sort) params2.set("sort", params.sort);
              params2.set("page", String(p));

              return (
                <a
                  key={p}
                  href={`/domains?${params2.toString()}`}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                    p === page
                      ? "bg-accent text-navy font-bold"
                      : "bg-gray-100 text-gray-500 hover:text-foreground"
                  }`}
                >
                  {p}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DomainsPage(props: PageProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-black text-foreground md:text-4xl">
            جميع <span className="text-accent-dark">النطاقات</span>
          </h1>
          <p className="text-sm text-gray-500">
            تصفّح مجموعتنا الكاملة من النطاقات المميزة
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-20 text-center text-gray-400">
              جاري التحميل...
            </div>
          }
        >
          <DomainsContent searchParams={props.searchParams} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
