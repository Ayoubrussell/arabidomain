import { NextRequest, NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const db = requireDb();
  if (db instanceof NextResponse) return db;

  const categories = await db.category.findMany({
    include: { _count: { select: { domains: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const db = requireDb();
  if (db instanceof NextResponse) return db;
  const auth = verifyAdmin(request);
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();

  const category = await db.category.create({
    data: {
      name: body.name,
      slug: body.slug,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
