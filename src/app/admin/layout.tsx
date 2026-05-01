"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "لوحة التحكم", href: "/admin" },
  { label: "النطاقات", href: "/admin/domains" },
  { label: "الفئات", href: "/admin/categories" },
  { label: "العروض", href: "/admin/inquiries" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = document.cookie
        .split("; ")
        .find((c) => c.startsWith("admin_token="));
      setAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    if (res.ok) {
      setAuthenticated(true);
    } else {
      const data = await res.json();
      setLoginError(data.error || "خطأ في تسجيل الدخول");
    }
  }

  function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0";
    setAuthenticated(false);
    router.push("/admin");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-400">جاري التحميل...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <span className="text-3xl text-accent-dark">◆</span>
            <h1 className="mt-4 text-2xl font-black text-foreground">
              لوحة التحكم
            </h1>
            <p className="mt-2 text-sm text-gray-400">تسجيل دخول المدير</p>
          </div>

          {loginError && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {loginError}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-foreground outline-none focus:border-accent"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-500">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-foreground outline-none focus:border-accent"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-3 font-bold text-navy transition-colors hover:bg-accent-light"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 flex h-screen w-64 flex-col border-l border-gray-200 bg-navy">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <span className="text-xl text-accent">◆</span>
          <span className="font-bold text-white">لوحة التحكم</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-xl px-4 py-2.5 text-sm transition-all",
                pathname === item.href
                  ? "bg-accent/15 font-bold text-accent"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/20"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="mr-64 flex-1 p-8">{children}</main>
    </div>
  );
}
