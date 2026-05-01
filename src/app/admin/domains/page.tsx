"use client";

import { useEffect, useState } from "react";

interface Domain {
  id: string;
  name: string;
  tld: string;
  fullName: string;
  price: string | null;
  status: string;
  isFeatured: boolean;
  category?: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminDomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    tld: ".com",
    description: "",
    price: "",
    categoryId: "",
    isFeatured: false,
    status: "AVAILABLE",
  });

  useEffect(() => {
    loadDomains();
    loadCategories();
  }, []);

  async function loadDomains() {
    const res = await fetch("/api/domains?limit=100");
    const data = await res.json();
    setDomains(data.domains || []);
  }

  async function loadCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const body = {
      name: form.name,
      tld: form.tld,
      fullName: `${form.name}${form.tld}`,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      categoryId: form.categoryId || null,
      isFeatured: form.isFeatured,
      status: form.status,
    };

    if (editingId) {
      await fetch(`/api/domains/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/domains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    resetForm();
    loadDomains();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا النطاق؟")) return;
    await fetch(`/api/domains/${id}`, { method: "DELETE" });
    loadDomains();
  }

  function startEdit(domain: Domain) {
    setEditingId(domain.id);
    setForm({
      name: domain.name,
      tld: domain.tld,
      description: "",
      price: domain.price ? String(domain.price) : "",
      categoryId: "",
      isFeatured: domain.isFeatured,
      status: domain.status,
    });
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: "",
      tld: ".com",
      description: "",
      price: "",
      categoryId: "",
      isFeatured: false,
      status: "AVAILABLE",
    });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-black">
          إدارة <span className="text-gold">النطاقات</span>
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="rounded-xl bg-gold px-5 py-2 text-sm font-bold text-background transition-colors hover:bg-gold-light"
        >
          {showForm ? "إلغاء" : "إضافة نطاق"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-white/5 bg-charcoal p-6"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-white/60">
                اسم النطاق
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">
                الامتداد
              </label>
              <select
                value={form.tld}
                onChange={(e) => setForm({ ...form, tld: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
              >
                {[".com", ".net", ".sa", ".io", ".ai", ".org"].map((tld) => (
                  <option key={tld} value={tld}>
                    {tld}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">
                السعر (USD)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
                dir="ltr"
                placeholder="اتركه فارغاً لـ 'قدّم عرضاً'"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-white/60">الوصف</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              className="w-full resize-none rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-white/60">الفئة</label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
              >
                <option value="">بدون فئة</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/60">
                الحالة
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-charcoal-dark px-4 py-2.5 text-white outline-none focus:border-gold/50"
              >
                <option value="AVAILABLE">متاح</option>
                <option value="PENDING">قيد الانتظار</option>
                <option value="SOLD">مباع</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-white/60">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="accent-gold"
                />
                نطاق مميز
              </label>
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
              <th className="px-6 py-4 text-right font-medium">النطاق</th>
              <th className="px-6 py-4 text-right font-medium">الفئة</th>
              <th className="px-6 py-4 text-right font-medium">السعر</th>
              <th className="px-6 py-4 text-right font-medium">الحالة</th>
              <th className="px-6 py-4 text-right font-medium">مميز</th>
              <th className="px-6 py-4 text-right font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain) => (
              <tr
                key={domain.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-6 py-4 font-bold" dir="ltr">
                  {domain.fullName}
                </td>
                <td className="px-6 py-4 text-white/50">
                  {domain.category?.name || "—"}
                </td>
                <td className="px-6 py-4 text-gold" dir="ltr">
                  {domain.price
                    ? `$${Number(domain.price).toLocaleString()}`
                    : "عرض"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      domain.status === "AVAILABLE"
                        ? "bg-green-500/10 text-green-400"
                        : domain.status === "PENDING"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {domain.status === "AVAILABLE"
                      ? "متاح"
                      : domain.status === "PENDING"
                        ? "قيد الانتظار"
                        : "مباع"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {domain.isFeatured ? (
                    <span className="text-gold">★</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(domain)}
                      className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs text-blue-400 transition-colors hover:bg-blue-500/20"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(domain.id)}
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

        {domains.length === 0 && (
          <div className="py-12 text-center text-white/30">
            لا توجد نطاقات بعد
          </div>
        )}
      </div>
    </div>
  );
}
