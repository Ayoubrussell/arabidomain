import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal-family",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "نطاقات بريميوم | امتلك هويتك الرقمية",
  description:
    "بوتيك النطاقات الفاخرة — نطاقات عربية مميزة وحصرية للعلامات التجارية الراقية والشركات الكبرى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-tajawal">
        {children}
      </body>
    </html>
  );
}
