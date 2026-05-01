import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import type { PrismaClient } from "@/generated/prisma/client";

const DB_ERROR = NextResponse.json(
  { error: "قاعدة البيانات غير متاحة" },
  { status: 503 }
);

export function requireDb(): PrismaClient | NextResponse {
  if (!prisma) return DB_ERROR;
  return prisma;
}
