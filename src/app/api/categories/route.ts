import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { domains: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
