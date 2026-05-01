"use client";

export default function SortDropdown({ currentSort }: { currentSort: string }) {
  return (
    <select
      defaultValue={currentSort}
      onChange={(e) => {
        const url = new URLSearchParams(window.location.search);
        if (e.target.value) url.set("sort", e.target.value);
        else url.delete("sort");
        url.delete("page");
        window.location.href = `/domains?${url.toString()}`;
      }}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none"
    >
      <option value="">الأحدث</option>
      <option value="price_asc">السعر: من الأقل</option>
      <option value="price_desc">السعر: من الأعلى</option>
      <option value="views">الأكثر مشاهدة</option>
    </select>
  );
}
