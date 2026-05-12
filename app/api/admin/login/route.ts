import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminLoginPassword } from "@/lib/admin-password";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { password?: string }
    | null;

  const provided = body?.password ?? "";

  if (!(await verifyAdminLoginPassword(provided))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("jl_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
