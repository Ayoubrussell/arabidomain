import { NextRequest, NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = requireDb();
  if (db instanceof NextResponse) return db;

  const { id } = await params;
  const domain = await db.domain.findUnique({
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
  const db = requireDb();
  if (db instanceof NextResponse) return db;
  const auth = verifyAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();

  const domain = await db.domain.update({
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = requireDb();
  if (db instanceof NextResponse) return db;
  const auth = verifyAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  await db.domain.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
