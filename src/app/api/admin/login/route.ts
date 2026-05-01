import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "premium-domains-secret-key";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "البريد الإلكتروني وكلمة المرور مطلوبان" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({
    where: { email: body.email },
  });

  if (!admin) {
    return NextResponse.json(
      { error: "بيانات الدخول غير صحيحة" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(body.password, admin.passwordHash);

  if (!valid) {
    return NextResponse.json(
      { error: "بيانات الدخول غير صحيحة" },
      { status: 401 }
    );
  }

  const token = jwt.sign({ adminId: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({ success: true, token });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
