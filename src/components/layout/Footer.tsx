import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-sm font-black text-white">
                ن
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-black text-navy">نِطاقات</span>
                <span className="text-[9px] tracking-wider text-gray-400">
                  Premium Arabic Domain Boutique
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              بوتيك متخصص في تنسيق وبيع نطاقات عربية فاخرة من كلمة واحدة،
              مُختارة بعناية لخدمة العلامات التجارية الراقية والشركات الطموحة في
              العالم العربي.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 text-sm font-bold text-navy">روابط سريعة</h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/", label: "الرئيسية" },
                  { href: "/domains", label: "النطاقات" },
                  { href: "/about", label: "من نحن" },
                  { href: "/contact", label: "تواصل" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold text-navy">الفئات</h4>
              <ul className="space-y-2.5">
                {["العقارات", "السيارات", "التقنية", "المالية"].map((cat) => (
                  <li key={cat}>
                    <span className="text-sm text-gray-500">{cat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-navy">تواصل معنا</h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>sales@nitaqat.boutique</li>
              <li>المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} نِطاقات. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
