import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "premium-domains-secret-key";

export function verifyAdmin(
  request: NextRequest
): { adminId: string; email: string } | NextResponse {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "غير مصرح — يرجى تسجيل الدخول" },
      { status: 401 }
    );
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      adminId: string;
      email: string;
    };
    return payload;
  } catch {
    return NextResponse.json(
      { error: "جلسة منتهية — يرجى تسجيل الدخول مجدداً" },
      { status: 401 }
    );
  }
}
