import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteContent, writeSiteContent } from "@/lib/get-site-content";
import type { SiteContent } from "@/types/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}

function hasAdminCookie(header: string | null) {
  if (!header) return false;
  return header.split(";").some((p) => p.trim() === "jl_admin=1");
}

export async function POST(req: Request) {
  if (!hasAdminCookie(req.headers.get("cookie"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as SiteContent;
    await writeSiteContent(body);
    revalidatePath("/", "layout");
    revalidatePath("/birthdays");
    revalidatePath("/groups-pricing");
    revalidatePath("/mobile-events");
    revalidatePath("/faq");
    revalidatePath("/booking");
    revalidatePath("/contact");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    const message =
      e instanceof Error ? e.message : "Save failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
