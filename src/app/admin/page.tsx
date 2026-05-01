"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalDomains: number;
  availableDomains: number;
  totalInquiries: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      const [domainsRes, inquiriesRes] = await Promise.all([
        fetch("/api/domains?limit=1"),
        fetch("/api/inquiries"),
      ]);

      const domainsData = await domainsRes.json();
      const inquiriesData = await inquiriesRes.json();

      setStats({
        totalDomains: domainsData.total || 0,
        availableDomains: domainsData.total || 0,
        totalInquiries: inquiriesData.length || 0,
        newInquiries:
          inquiriesData.filter(
            (i: { status: string }) => i.status === "NEW"
          ).length || 0,
      });
    }
    loadStats();
  }, []);

  const cards = [
    {
      label: "إجمالي النطاقات",
      value: stats?.totalDomains ?? "—",
      color: "text-accent-dark",
    },
    {
      label: "نطاقات متاحة",
      value: stats?.availableDomains ?? "—",
      color: "text-green-600",
    },
    {
      label: "إجمالي العروض",
      value: stats?.totalInquiries ?? "—",
      color: "text-blue-600",
    },
    {
      label: "عروض جديدة",
      value: stats?.newInquiries ?? "—",
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-black text-foreground">
        مرحباً بك في <span className="text-accent-dark">لوحة التحكم</span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-sm text-gray-400">{card.label}</p>
            <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-accent-dark">بدء سريع</h2>
        <p className="mb-4 text-sm text-gray-500">
          لتعبئة قاعدة البيانات ببيانات تجريبية، اضغط الزر أدناه:
        </p>
        <button
          onClick={async () => {
            const res = await fetch("/api/admin/seed", { method: "POST" });
            const data = await res.json();
            alert(data.message || "تمت العملية");
            window.location.reload();
          }}
          className="rounded-xl bg-accent/15 px-6 py-2 text-sm font-medium text-accent-dark transition-colors hover:bg-accent/25"
        >
          تعبئة البيانات التجريبية
        </button>
      </div>
    </div>
  );
}
