/** Read SMTP env vars (trim quotes/spaces from Vercel paste mistakes). */
export function readEnv(key: string): string | undefined {
  const raw = process.env[key];
  if (!raw) return undefined;
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

export function readEnvBool(key: string, defaultValue = false): boolean {
  const v = readEnv(key)?.toLowerCase();
  if (!v) return defaultValue;
  if (v === "true" || v === "1" || v === "yes") return true;
  if (v === "false" || v === "0" || v === "no") return false;
  return defaultValue;
}
