"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { domains: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "" });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await fetch(`/api/categories/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    resetForm();
    loadCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    loadCategories();
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setForm({ name: cat.name, slug: cat.slug });
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm({ name: "", slug: "" });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-black text-foreground">
          إدارة <span className="text-accent-dark">الفئات</span>
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="rounded-xl bg-accent px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-accent-light"
        >
          {showForm ? "إلغاء" : "إضافة فئة"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                اسم الفئة (بالعربية)
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
                placeholder="مثال: عقارات"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                الرابط (بالإنجليزية)
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
                dir="ltr"
                placeholder="real-estate"
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-accent px-6 py-2.5 font-bold text-navy transition-colors hover:bg-accent-light"
          >
            {editingId ? "تحديث" : "إضافة"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-400">
              <th className="px-6 py-4 text-right font-medium">الاسم</th>
              <th className="px-6 py-4 text-right font-medium">الرابط</th>
              <th className="px-6 py-4 text-right font-medium">
                عدد النطاقات
              </th>
              <th className="px-6 py-4 text-right font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-bold text-foreground">
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-gray-500" dir="ltr">
                  {cat.slug}
                </td>
                <td className="px-6 py-4 text-accent-dark">
                  {cat._count.domains}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(cat)}
                      className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="rounded-lg bg-red-50 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-100"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            لا توجد فئات بعد
          </div>
        )}
      </div>
    </div>
  );
}
