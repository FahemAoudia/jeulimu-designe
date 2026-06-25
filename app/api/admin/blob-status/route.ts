import { NextResponse } from "next/server";
import {
  getBlobReadWriteToken,
  listBlobEnvKeys,
} from "@/lib/blob-env";

export const dynamic = "force-dynamic";

function hasAdminCookie(header: string | null) {
  if (!header) return false;
  return header.split(";").some((p) => {
    const [name, ...rest] = p.trim().split("=");
    return name === "jl_admin" && rest.join("=") === "1";
  });
}

/** Admin-only: verify blob env is wired (no secret values returned). */
export async function GET(req: Request) {
  if (!hasAdminCookie(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = getBlobReadWriteToken();
  return NextResponse.json({
    hasReadWriteToken: Boolean(token),
    tokenLength: token?.length ?? 0,
    blobEnvKeys: listBlobEnvKeys(),
    vercel: process.env.VERCEL === "1",
    vercelEnv: process.env.VERCEL_ENV ?? null,
    storeId: process.env.BLOB_STORE_ID ? "set" : "missing",
  });
}
