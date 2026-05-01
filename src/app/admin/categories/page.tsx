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
        <h1 className="text-2xl font-black">
          إدارة <span className="text-gold">الفئات</span>
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="rounded-xl bg-gold px-5 py-2 text-sm font-bold text-background transition-colors hover:bg-gold-light"
        >
          {showForm ? "إلغاء" : "إضافة فئة"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-white/5 bg-charcoal p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-white/60">
                اسم الفئة (بالعربية)
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
                placeholder="مثال: عقارات"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">
                الرابط (بالإنجليزية)
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
                dir="ltr"
                placeholder="real-estate"
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gold px-6 py-2.5 font-bold text-background transition-colors hover:bg-gold-light"
          >
            {editingId ? "تحديث" : "إضافة"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-charcoal">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-white/40">
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
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 font-bold">{cat.name}</td>
                <td className="px-6 py-4 text-white/50" dir="ltr">
                  {cat.slug}
                </td>
                <td className="px-6 py-4 text-gold">{cat._count.domains}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(cat)}
                      className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-400 transition-colors hover:bg-blue-500/20"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/20"
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
          <div className="py-12 text-center text-white/30">
            لا توجد فئات بعد
          </div>
        )}
      </div>
    </div>
  );
}
