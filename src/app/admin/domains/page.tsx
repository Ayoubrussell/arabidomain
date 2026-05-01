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
        <h1 className="text-2xl font-black text-foreground">
          إدارة <span className="text-accent-dark">النطاقات</span>
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="rounded-xl bg-accent px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-accent-light"
        >
          {showForm ? "إلغاء" : "إضافة نطاق"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                اسم النطاق
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                الامتداد
              </label>
              <select
                value={form.tld}
                onChange={(e) => setForm({ ...form, tld: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
              >
                {[".com", ".net", ".sa", ".io", ".ai", ".org"].map((tld) => (
                  <option key={tld} value={tld}>
                    {tld}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                السعر (USD)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
                dir="ltr"
                placeholder="اتركه فارغاً لـ 'قدّم عرضاً'"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">الوصف</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-500">الفئة</label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
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
              <label className="mb-1 block text-sm text-gray-500">
                الحالة
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-foreground outline-none focus:border-accent"
              >
                <option value="AVAILABLE">متاح</option>
                <option value="PENDING">قيد الانتظار</option>
                <option value="SOLD">مباع</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="accent-accent-dark"
                />
                نطاق مميز
              </label>
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
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-bold text-foreground" dir="ltr">
                  {domain.fullName}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {domain.category?.name || "—"}
                </td>
                <td className="px-6 py-4 text-accent-dark" dir="ltr">
                  {domain.price
                    ? `$${Number(domain.price).toLocaleString()}`
                    : "عرض"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      domain.status === "AVAILABLE"
                        ? "bg-green-50 text-green-600"
                        : domain.status === "PENDING"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-600"
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
                    <span className="text-accent-dark">★</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(domain)}
                      className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-100"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(domain.id)}
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

        {domains.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            لا توجد نطاقات بعد
          </div>
        )}
      </div>
    </div>
  );
}
