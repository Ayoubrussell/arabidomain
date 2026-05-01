import { NextRequest, NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

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

  const category = await db.category.update({
    where: { id },
    data: { name: body.name, slug: body.slug },
  });

  return NextResponse.json(category);
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
  await db.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
