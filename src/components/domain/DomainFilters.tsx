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

  const activeCategory = searchParams.get("category") || "";
  const activeTld = searchParams.get("tld") || "";
  const activeSort = searchParams.get("sort") || "";
  const activeLength = searchParams.get("length") || "";
  const query = searchParams.get("q") || "";

  const tlds = [".com", ".net", ".sa", ".io", ".ai", ".org"];
  const lengths = [
    { label: "الكل", value: "" },
    { label: "3 أحرف", value: "3" },
    { label: "4 أحرف", value: "4" },
    { label: "5 أحرف", value: "5" },
    { label: "6+ أحرف", value: "6" },
  ];
  const sorts = [
    { label: "الأحدث", value: "" },
    { label: "السعر: من الأقل", value: "price_asc" },
    { label: "السعر: من الأعلى", value: "price_desc" },
    { label: "الأكثر مشاهدة", value: "views" },
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-white/5 bg-charcoal p-6">
      {/* Search */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/60">
          بحث
        </label>
        <input
          type="text"
          defaultValue={query}
          placeholder="اسم النطاق..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateFilter("q", (e.target as HTMLInputElement).value);
            }
          }}
          className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/50"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/60">
          الفئة
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("category", "")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
              !activeCategory
                ? "bg-gold text-background"
                : "bg-charcoal-dark text-white/50 hover:text-white"
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
                  ? "bg-gold text-background"
                  : "bg-charcoal-dark text-white/50 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* TLD */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/60">
          الامتداد
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("tld", "")}
            className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
              !activeTld
                ? "bg-gold text-background"
                : "bg-charcoal-dark text-white/50 hover:text-white"
            }`}
          >
            الكل
          </button>
          {tlds.map((tld) => (
            <button
              key={tld}
              onClick={() => updateFilter("tld", tld)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
                activeTld === tld
                  ? "bg-gold text-background"
                  : "bg-charcoal-dark text-white/50 hover:text-white"
              }`}
              dir="ltr"
            >
              {tld}
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/60">
          عدد الأحرف
        </label>
        <div className="flex flex-wrap gap-2">
          {lengths.map((len) => (
            <button
              key={len.value}
              onClick={() => updateFilter("length", len.value)}
              className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                activeLength === len.value
                  ? "bg-gold text-background"
                  : "bg-charcoal-dark text-white/50 hover:text-white"
              }`}
            >
              {len.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white/60">
          ترتيب حسب
        </label>
        <select
          value={activeSort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-gold/50"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
