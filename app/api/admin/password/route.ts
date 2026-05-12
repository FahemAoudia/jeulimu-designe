import { NextResponse } from "next/server";
import {
  readStoredAdminPassword,
  setAdminPasswordFromPlain,
  verifyAdminLoginPassword,
} from "@/lib/admin-password";

function hasAdminCookie(header: string | null) {
  if (!header) return false;
  return header.split(";").some((p) => p.trim() === "jl_admin=1");
}

const MIN_LEN = 8;
const MAX_LEN = 256;

export async function POST(req: Request) {
  if (!hasAdminCookie(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { currentPassword?: string; newPassword?: string }
    | null;

  const current = body?.currentPassword ?? "";
  const next = body?.newPassword ?? "";

  if (typeof current !== "string" || typeof next !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (next.length < MIN_LEN || next.length > MAX_LEN) {
    return NextResponse.json(
      { error: `New password must be between ${MIN_LEN} and ${MAX_LEN} characters.` },
      { status: 400 },
    );
  }

  if (!(await verifyAdminLoginPassword(current))) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  try {
    await setAdminPasswordFromPlain(next);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not save password file." }, { status: 500 });
  }

  const hasFile = (await readStoredAdminPassword()) !== null;
  return NextResponse.json({
    ok: true,
    hint: hasFile
      ? "Login now uses data/admin-password.json. Keep this file secure and backed up."
      : undefined,
  });
}
