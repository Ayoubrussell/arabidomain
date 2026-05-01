import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const domain = await prisma.domain.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!domain) {
    return NextResponse.json({ error: "النطاق غير موجود" }, { status: 404 });
  }

  return NextResponse.json(domain);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const domain = await prisma.domain.update({
    where: { id },
    data: {
      name: body.name,
      tld: body.tld,
      fullName: body.fullName,
      description: body.description,
      price: body.price,
      isFeatured: body.isFeatured,
      status: body.status,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json(domain);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.domain.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
