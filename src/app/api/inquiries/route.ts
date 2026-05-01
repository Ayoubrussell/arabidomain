import { NextRequest, NextResponse } from "next/server";
import { requireDb } from "@/lib/db";

export async function GET() {
  const db = requireDb();
  if (db instanceof NextResponse) return db;

  const inquiries = await db.inquiry.findMany({
    include: { domain: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  const db = requireDb();
  if (db instanceof NextResponse) return db;

  const body = await request.json();

  if (!body.domainId || !body.buyerName || !body.email) {
    return NextResponse.json(
      { error: "الاسم والبريد الإلكتروني ومعرّف النطاق مطلوبة" },
      { status: 400 }
    );
  }

  const domain = await db.domain.findUnique({
    where: { id: body.domainId },
  });

  if (!domain) {
    return NextResponse.json(
      { error: "النطاق غير موجود" },
      { status: 404 }
    );
  }

  const inquiry = await db.inquiry.create({
    data: {
      domainId: body.domainId,
      buyerName: body.buyerName,
      email: body.email,
      phone: body.phone,
      offerAmount: body.offerAmount,
      message: body.message,
    },
  });

  return NextResponse.json(inquiry, { status: 201 });
}
