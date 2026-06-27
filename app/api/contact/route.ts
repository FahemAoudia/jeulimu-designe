import { NextResponse } from "next/server";
import { contactFormFromBody } from "@/lib/contact-form";
import { sendContactFormEmail } from "@/lib/send-contact-email";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const payload = contactFormFromBody(body);
  if (!payload) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  try {
    await sendContactFormEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    const message =
      err instanceof Error && err.message.includes("not configured")
        ? "Email is not configured"
        : "Could not send message";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
