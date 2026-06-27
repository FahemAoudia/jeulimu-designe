export type ContactFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  date: string;
  totalPlayers: string;
  kidsUnder12: string;
  message?: string;
  locale?: string;
};

export function contactFormFromBody(body: Record<string, unknown>): ContactFormPayload | null {
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const date = String(body.date ?? "").trim();
  const totalPlayers = String(body.totalPlayers ?? body.players ?? "").trim();
  const kidsUnder12 = String(body.kidsUnder12 ?? body.kids ?? "").trim();

  if (!firstName || !lastName || !email || !date || !totalPlayers || !kidsUnder12) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    firstName,
    lastName,
    email,
    phone: String(body.phone ?? "").trim(),
    date,
    totalPlayers,
    kidsUnder12,
    message: String(body.message ?? "").trim(),
    locale: String(body.locale ?? "").trim(),
  };
}

export async function postContactForm(
  payload: ContactFormPayload,
): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Failed to send message");
  }
}
