import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">◆</span>
              <span className="text-lg font-bold text-white">بريميوم</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              بوتيك النطاقات الفاخرة — نقدم لك أفضل النطاقات العربية المميزة
              للعلامات التجارية الراقية.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-accent">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-accent"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/domains"
                  className="transition-colors hover:text-accent"
                >
                  جميع النطاقات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-accent">تواصل معنا</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>info@premium-domains.com</li>
              <li>المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} بريميوم. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
