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
  NEW: "bg-blue-500/10 text-blue-400",
  CONTACTED: "bg-yellow-500/10 text-yellow-400",
  NEGOTIATING: "bg-purple-500/10 text-purple-400",
  CLOSED: "bg-green-500/10 text-green-400",
  REJECTED: "bg-red-500/10 text-red-400",
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
      <h1 className="mb-8 text-2xl font-black">
        العروض <span className="text-gold">المقدمة</span>
      </h1>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border border-white/5 bg-charcoal p-6"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-gold" dir="ltr">
                  {inquiry.domain.fullName}
                </h3>
                <p className="text-sm text-white/40">
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
                  className="rounded-lg border border-white/10 bg-charcoal-dark px-2 py-1 text-xs text-white outline-none"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="rounded-lg bg-red-500/10 px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/20"
                >
                  حذف
                </button>
              </div>
            </div>

            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="text-white/40">الاسم: </span>
                <span>{inquiry.buyerName}</span>
              </div>
              <div>
                <span className="text-white/40">البريد: </span>
                <span dir="ltr">{inquiry.email}</span>
              </div>
              {inquiry.phone && (
                <div>
                  <span className="text-white/40">الهاتف: </span>
                  <span dir="ltr">{inquiry.phone}</span>
                </div>
              )}
              {inquiry.offerAmount && (
                <div>
                  <span className="text-white/40">مبلغ العرض: </span>
                  <span className="font-bold text-gold" dir="ltr">
                    ${Number(inquiry.offerAmount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {inquiry.message && (
              <div className="mt-4 rounded-xl bg-charcoal-dark p-4 text-sm text-white/60">
                {inquiry.message}
              </div>
            )}
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="rounded-2xl border border-white/5 bg-charcoal py-12 text-center text-white/30">
            لا توجد عروض بعد
          </div>
        )}
      </div>
    </div>
  );
}
