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
      update: { name: "العقارات" },
      create: { name: "العقارات", slug: "real-estate" },
    }),
    db.category.upsert({
      where: { slug: "automotive" },
      update: { name: "السيارات" },
      create: { name: "السيارات", slug: "automotive" },
    }),
    db.category.upsert({
      where: { slug: "tech" },
      update: { name: "التقنية" },
      create: { name: "التقنية", slug: "tech" },
    }),
    db.category.upsert({
      where: { slug: "finance" },
      update: { name: "المالية والأعمال" },
      create: { name: "المالية والأعمال", slug: "finance" },
    }),
    db.category.upsert({
      where: { slug: "lifestyle" },
      update: { name: "نمط الحياة" },
      create: { name: "نمط الحياة", slug: "lifestyle" },
    }),
  ]);

  const [realEstate, automotive, tech, finance, lifestyle] = categories;

  // Seed domains
  const domainsData = [
    {
      name: "aqar", tld: ".com", price: 85000, categoryId: realEstate.id,
      isFeatured: true, views: 1284, arabicName: "عَقار",
      description: "اسم عربي قوي يعني (عقار)، مثالي لمنصات العقارات والاستثمار العقاري في الشرق الأوسط. مكوّن من أربعة أحرف فقط ويسهل تذكره عالمياً.",
    },
    {
      name: "sayarat", tld: ".net", price: 42000, categoryId: automotive.id,
      isFeatured: true, views: 873, arabicName: "سَيّارات",
      description: "اسم نطاق فاخر يعني (سيارات)، مناسب لسوق سيارات إلكتروني، وكالة تأجير، أو منصة مزادات سيارات.",
    },
    {
      name: "midad", tld: ".io", price: null, categoryId: tech.id,
      isFeatured: true, views: 542, arabicName: "مِداد",
      description: "اسم أنيق يعني (الحبر) — مثالي لمنصة كتابة، تطبيق ذكاء اصطناعي إبداعي، أو شركة ناشئة تقنية.",
    },
    {
      name: "thara", tld: ".com", price: 120000, categoryId: finance.id,
      isFeatured: true, views: 2104, arabicName: "ثَراء",
      description: "كلمة عربية فاخرة تعني (الغنى والوفرة). نطاق مثالي لمنصات الاستثمار، إدارة الثروات، أو خدمات مصرفية رقمية.",
    },
    {
      name: "safa", tld: ".co", price: 28000, categoryId: lifestyle.id,
      isFeatured: true, views: 612, arabicName: "صَفاء",
      description: "اسم رقيق ومميز يعني (النقاء)، مناسب لعلامات تجارية في العناية الشخصية، السبا، أو الحياة الصحية.",
    },
    {
      name: "noor", tld: ".com", price: 250000, categoryId: lifestyle.id,
      isFeatured: true, views: 3201, arabicName: "نُور",
      description: "كلمة عالمية الانتشار تعني (الضوء)، مثالية لشركات الطاقة، الإضاءة، أو علامة تجارية فاخرة.",
    },
    {
      name: "amal", tld: ".org", price: 35000, categoryId: lifestyle.id,
      views: 489, arabicName: "أمَل",
      description: "اسم يحمل دلالة عاطفية قوية (الأمل)، مناسب للمنظمات غير الربحية والمبادرات الإنسانية.",
    },
    {
      name: "rizq", tld: ".com", price: 65000, categoryId: finance.id,
      views: 977, arabicName: "رِزق",
      description: "اسم عربي تجاري قوي يعني (الرزق)، مثالي لمنصات تجارة إلكترونية أو تطبيقات مالية.",
    },
  ];

  // Clear existing domains to reset data
  await db.domain.deleteMany({});

  for (const d of domainsData) {
    await db.domain.create({
      data: {
        name: d.name,
        tld: d.tld,
        fullName: `${d.name}${d.tld}`,
        price: d.price,
        categoryId: d.categoryId,
        isFeatured: d.isFeatured || false,
        description: d.description,
        arabicName: d.arabicName,
        views: d.views || 0,
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
