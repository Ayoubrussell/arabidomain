"use client";

import { useEffect, useState } from "react";

interface Inquiry {
  id: string;
  buyerName: string;
  email: string;
  phone: string | null;
  offerAmount: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  domain: { fullName: string };
}

const statusLabels: Record<string, string> = {
  NEW: "جديد",
  CONTACTED: "تم التواصل",
  NEGOTIATING: "قيد التفاوض",
  CLOSED: "مغلق",
  REJECTED: "مرفوض",
};

const statusColors: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-600",
  CONTACTED: "bg-yellow-50 text-yellow-600",
  NEGOTIATING: "bg-purple-50 text-purple-600",
  CLOSED: "bg-green-50 text-green-600",
  REJECTED: "bg-red-50 text-red-600",
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    const res = await fetch("/api/inquiries");
    const data = await res.json();
    setInquiries(data);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadInquiries();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا العرض؟")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    loadInquiries();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-black text-foreground">
        العروض <span className="text-accent-dark">المقدمة</span>
      </h1>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-accent-dark" dir="ltr">
                  {inquiry.domain.fullName}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(inquiry.createdAt).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${statusColors[inquiry.status] || ""}`}
                >
                  {statusLabels[inquiry.status] || inquiry.status}
                </span>
                <select
                  value={inquiry.status}
                  onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-foreground outline-none"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="rounded-lg bg-red-50 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-100"
                >
                  حذف
                </button>
              </div>
            </div>

            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="text-gray-400">الاسم: </span>
                <span className="text-foreground">{inquiry.buyerName}</span>
              </div>
              <div>
                <span className="text-gray-400">البريد: </span>
                <span className="text-foreground" dir="ltr">
                  {inquiry.email}
                </span>
              </div>
              {inquiry.phone && (
                <div>
                  <span className="text-gray-400">الهاتف: </span>
                  <span className="text-foreground" dir="ltr">
                    {inquiry.phone}
                  </span>
                </div>
              )}
              {inquiry.offerAmount && (
                <div>
                  <span className="text-gray-400">مبلغ العرض: </span>
                  <span className="font-bold text-accent-dark" dir="ltr">
                    ${Number(inquiry.offerAmount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {inquiry.message && (
              <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                {inquiry.message}
              </div>
            )}
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center text-gray-400 shadow-sm">
            لا توجد عروض بعد
          </div>
        )}
      </div>
    </div>
  );
}
