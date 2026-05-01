"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/domains", label: "النطاقات" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل" },
    { href: "/admin", label: "لوحة التحكم" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-lg font-black text-white">
            ن
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black text-navy">نِطاقات</span>
            <span className="text-[10px] tracking-wider text-gray-400">
              Premium Domains
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/domains"
            className="hidden rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-navy-light sm:inline-flex"
          >
            تصفّح النطاقات
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/domains"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-navy px-4 py-2.5 text-center text-sm font-bold text-white"
          >
            تصفّح النطاقات
          </Link>
        </div>
      )}
    </nav>
  );
}
