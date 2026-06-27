import nodemailer from "nodemailer";
import type { ContactFormPayload } from "@/lib/contact-form";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure =
    process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1";

  return { host, port, secure, user, pass };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactFormEmail(payload: ContactFormPayload) {
  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("Email is not configured on the server");
  }

  const to =
    process.env.CONTACT_FORM_TO?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    smtp.user;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  const name = `${payload.firstName} ${payload.lastName}`;
  const subject = `jeuLumi contact — ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Preferred date: ${payload.date}`,
    `Total players: ${payload.totalPlayers}`,
    `Kids under 12: ${payload.kidsUnder12}`,
    `Message: ${payload.message || "—"}`,
    `Locale: ${payload.locale || "—"}`,
  ];

  await transporter.sendMail({
    from: `jeuLumi Website <${smtp.user}>`,
    to,
    replyTo: payload.email,
    subject,
    text: lines.join("\n"),
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "—")}</p>
      <p><strong>Preferred date:</strong> ${escapeHtml(payload.date)}</p>
      <p><strong>Total players:</strong> ${escapeHtml(payload.totalPlayers)}</p>
      <p><strong>Kids under 12:</strong> ${escapeHtml(payload.kidsUnder12)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(payload.message || "—")}</p>
    `,
  });
}
