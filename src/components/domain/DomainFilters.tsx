"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function DomainFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/domains?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push("/domains");
  }, [router]);

  const activeCategory = searchParams.get("category") || "";
  const activeTld = searchParams.get("tld") || "";
  const activeLength = searchParams.get("length") || "";
  const query = searchParams.get("q") || searchParams.get("search") || "";

  const hasFilters = activeCategory || activeTld || activeLength || query;

  const tlds = [".com", ".net", ".org", ".io", ".co"];
  const maxLengths = [
    { label: "12 حرف", value: "" },
    { label: "3 أحرف", value: "3" },
    { label: "4 أحرف", value: "4" },
    { label: "5 أحرف", value: "5" },
    { label: "6+ أحرف", value: "6" },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div>
        <label className="mb-2 block text-xs font-bold text-navy">بحث</label>
        <input
          type="text"
          defaultValue={query}
          placeholder="اسم النطاق..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilter("q", (e.target as HTMLInputElement).value);
            }
          }}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none transition-colors placeholder:text-gray-400 focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-navy">الفئة</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateFilter("category", "")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
              !activeCategory
                ? "bg-navy font-bold text-white"
                : "bg-gray-100 text-gray-500 hover:text-navy"
            }`}
          >
            الكل
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter("category", cat.slug)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                activeCategory === cat.slug
                  ? "bg-navy font-bold text-white"
                  : "bg-gray-100 text-gray-500 hover:text-navy"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-navy">
          الامتداد (TLD)
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateFilter("tld", "")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
              !activeTld
                ? "bg-navy font-bold text-white"
                : "bg-gray-100 text-gray-500 hover:text-navy"
            }`}
          >
            الكل
          </button>
          {tlds.map((tld) => (
            <button
              key={tld}
              onClick={() => updateFilter("tld", tld)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                activeTld === tld
                  ? "bg-navy font-bold text-white"
                  : "bg-gray-100 text-gray-500 hover:text-navy"
              }`}
              dir="ltr"
            >
              {tld}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold text-navy">
          الطول الأقصى
        </label>
        <div className="flex flex-wrap gap-1.5">
          {maxLengths.map((len) => (
            <button
              key={len.value}
              onClick={() => updateFilter("length", len.value)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                activeLength === len.value
                  ? "bg-navy font-bold text-white"
                  : "bg-gray-100 text-gray-500 hover:text-navy"
              }`}
            >
              {len.label}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-gray-200 py-2 text-xs text-gray-500 transition-colors hover:border-red-300 hover:text-red-500"
        >
          مسح الفلاتر
        </button>
      )}
    </div>
  );
}
