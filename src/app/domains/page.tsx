export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DomainCard from "@/components/domain/DomainCard";
import DomainFilters from "@/components/domain/DomainFilters";
import SortDropdown from "@/components/domain/SortDropdown";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    search?: string;
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
  const searchQuery = params.q || params.search || "";

  const where: Prisma.DomainWhereInput = {
    status: "AVAILABLE",
  };

  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery, mode: "insensitive" } },
      { fullName: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  if (params.category) {
    where.category = { slug: params.category };
  }

  if (params.tld) {
    where.tld = params.tld;
  }

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
          <p className="text-sm text-gray-500">
            {total} نطاق متاح
          </p>
          <SortDropdown currentSort={params.sort || ""} />
        </div>

        {domains.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center">
            <p className="text-lg text-gray-400">لا توجد نتائج</p>
            <p className="mt-2 text-sm text-gray-300">
              جرّب تغيير معايير البحث
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {domains.map((domain) => (
              <DomainCard
                key={domain.id}
                id={domain.id}
                fullName={domain.fullName}
                name={domain.name}
                tld={domain.tld}
                description={domain.description}
                price={domain.price ? domain.price.toString() : null}
                arabicName={domain.arabicName}
                views={domain.views}
                status={domain.status}
                category={domain.category?.name}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params2 = new URLSearchParams();
              if (searchQuery) params2.set("q", searchQuery);
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
                      ? "bg-navy font-bold text-white"
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
      <main className="pt-20">
        <section className="bg-navy py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
              The Catalogue
            </span>
            <h1 className="mb-3 text-3xl font-black text-white">
              جميع النطاقات
            </h1>
            <p className="text-sm text-gray-400">
              استكشف مجموعتنا الكاملة من النطاقات العربية الفاخرة. استخدم الفلاتر
              لتجد ما يناسب رؤيتك.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <Suspense
            fallback={
              <div className="py-20 text-center text-gray-400">
                جاري التحميل...
              </div>
            }
          >
            <DomainsContent searchParams={props.searchParams} />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
