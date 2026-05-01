import { NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "غير مسموح" }, { status: 403 });
  }

  const db = requireDb();
  if (db instanceof NextResponse) return db;

  // Seed categories
  const categories = await Promise.all([
    db.category.upsert({
      where: { slug: "real-estate" },
      update: {},
      create: { name: "عقارات", slug: "real-estate" },
    }),
    db.category.upsert({
      where: { slug: "tech" },
      update: {},
      create: { name: "تقنية", slug: "tech" },
    }),
    db.category.upsert({
      where: { slug: "finance" },
      update: {},
      create: { name: "مالية", slug: "finance" },
    }),
    db.category.upsert({
      where: { slug: "health" },
      update: {},
      create: { name: "صحة", slug: "health" },
    }),
    db.category.upsert({
      where: { slug: "education" },
      update: {},
      create: { name: "تعليم", slug: "education" },
    }),
    db.category.upsert({
      where: { slug: "travel" },
      update: {},
      create: { name: "سفر", slug: "travel" },
    }),
    db.category.upsert({
      where: { slug: "ecommerce" },
      update: {},
      create: { name: "تجارة إلكترونية", slug: "ecommerce" },
    }),
    db.category.upsert({
      where: { slug: "media" },
      update: {},
      create: { name: "إعلام", slug: "media" },
    }),
  ]);

  const [realEstate, tech, finance, health, education, travel, ecommerce, media] =
    categories;

  // Seed domains
  const domainsData = [
    { name: "aqar", tld: ".com", price: 250000, categoryId: realEstate.id, isFeatured: true, description: "نطاق عقارات مميز — كلمة واحدة قصيرة ولا تُنسى، مثالي لأكبر المنصات العقارية في العالم العربي." },
    { name: "seha", tld: ".com", price: 180000, categoryId: health.id, isFeatured: true, description: "نطاق صحي فاخر — يمثل قطاع الصحة والعافية بأسم قوي ومباشر." },
    { name: "tamweel", tld: ".com", price: 320000, categoryId: finance.id, isFeatured: true, description: "نطاق مالي استثنائي — كلمة 'تمويل' المعروفة في عالم المال والأعمال." },
    { name: "safar", tld: ".com", price: null, categoryId: travel.id, isFeatured: true, description: "نطاق سفر حصري — اسم مثالي لشركات الطيران والسياحة." },
    { name: "tadawul", tld: ".com", price: 450000, categoryId: finance.id, isFeatured: true, description: "نطاق تداول مميز — الاسم الأمثل لمنصات التداول والبورصات." },
    { name: "bina", tld: ".com", price: 85000, categoryId: realEstate.id, isFeatured: true, description: "نطاق بناء — مثالي لشركات المقاولات والتطوير العقاري." },
    { name: "toqa", tld: ".com", price: 65000, categoryId: tech.id, description: "نطاق تقنية قصير ومميز." },
    { name: "elm", tld: ".com", price: 200000, categoryId: education.id, description: "نطاق علم — الاسم المثالي للمنصات التعليمية." },
    { name: "souq", tld: ".net", price: 75000, categoryId: ecommerce.id, description: "نطاق سوق — مناسب لمنصات التجارة الإلكترونية." },
    { name: "khabar", tld: ".com", price: 120000, categoryId: media.id, description: "نطاق خبر — مثالي للمواقع الإخبارية والإعلامية." },
    { name: "daleel", tld: ".com", price: 95000, categoryId: tech.id, description: "نطاق دليل — مناسب لمحركات البحث والأدلة الإلكترونية." },
    { name: "riyada", tld: ".com", price: null, categoryId: finance.id, description: "نطاق ريادة — للمشاريع الريادية والشركات الناشئة." },
    { name: "shifaa", tld: ".com", price: 140000, categoryId: health.id, description: "نطاق شفاء — مثالي للمستشفيات والعيادات الطبية." },
    { name: "madrasa", tld: ".com", price: 160000, categoryId: education.id, description: "نطاق مدرسة — الاسم الأمثل للمؤسسات التعليمية." },
    { name: "funduq", tld: ".com", price: 110000, categoryId: travel.id, description: "نطاق فندق — مثالي لسلاسل الفنادق والحجوزات." },
    { name: "tijara", tld: ".sa", price: 90000, categoryId: ecommerce.id, description: "نطاق تجارة سعودي — مناسب للتجارة المحلية." },
    { name: "sahafa", tld: ".com", price: 80000, categoryId: media.id, description: "نطاق صحافة — مثالي للمؤسسات الإعلامية." },
    { name: "amwal", tld: ".com", price: null, categoryId: finance.id, description: "نطاق أموال — فرصة استثمارية في قطاع المال." },
    { name: "cloud", tld: ".sa", price: 55000, categoryId: tech.id, description: "نطاق كلاود سعودي — للحوسبة السحابية." },
    { name: "mall", tld: ".sa", price: 70000, categoryId: ecommerce.id, description: "نطاق مول سعودي — مثالي لمراكز التسوق الإلكترونية." },
  ];

  for (const d of domainsData) {
    await db.domain.upsert({
      where: { fullName: `${d.name}${d.tld}` },
      update: {},
      create: {
        name: d.name,
        tld: d.tld,
        fullName: `${d.name}${d.tld}`,
        price: d.price,
        categoryId: d.categoryId,
        isFeatured: d.isFeatured || false,
        description: d.description,
      },
    });
  }

  // Seed admin
  const passwordHash = await bcrypt.hash("admin123", 12);
  await db.admin.upsert({
    where: { email: "admin@premium-domains.com" },
    update: {},
    create: {
      email: "admin@premium-domains.com",
      passwordHash,
    },
  });

  return NextResponse.json({
    success: true,
    message: "تم تعبئة قاعدة البيانات بنجاح",
    categories: categories.length,
    domains: domainsData.length,
  });
}
