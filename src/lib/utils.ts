export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "قدّم عرضاً";
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getWhatsAppLink(domainName: string): string {
  const message = encodeURIComponent(
    `مرحباً، أنا مهتم بشراء النطاق: ${domainName}. أرجو التواصل معي لمناقشة التفاصيل.`
  );
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
  return `https://wa.me/${phone}?text=${message}`;
}
