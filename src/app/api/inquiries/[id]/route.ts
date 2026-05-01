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

  const inquiry = await db.inquiry.update({
    where: { id },
    data: { status: body.status },
  });

  return NextResponse.json(inquiry);
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
  await db.inquiry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
