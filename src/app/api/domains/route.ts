import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const tld = searchParams.get("tld") || "";
  const sort = searchParams.get("sort") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(50, Number(searchParams.get("limit")) || 12);

  const statusParam = searchParams.get("status") || "";
  const where: Prisma.DomainWhereInput =
    statusParam === "all" ? {} : { status: "AVAILABLE" };

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { fullName: { contains: q, mode: "insensitive" } },
    ];
  }

  if (category) where.category = { slug: category };
  if (tld) where.tld = tld;

  let orderBy: Prisma.DomainOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  else if (sort === "price_desc") orderBy = { price: "desc" };
  else if (sort === "views") orderBy = { views: "desc" };

  const [domains, total] = await Promise.all([
    prisma.domain.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.domain.count({ where }),
  ]);

  return NextResponse.json({
    domains,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const { verifyAdmin } = await import("@/lib/auth");
  const auth = verifyAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();

  const domain = await prisma.domain.create({
    data: {
      name: body.name,
      tld: body.tld,
      fullName: body.fullName || `${body.name}${body.tld}`,
      description: body.description,
      price: body.price,
      isFeatured: body.isFeatured || false,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(domain, { status: 201 });
}
