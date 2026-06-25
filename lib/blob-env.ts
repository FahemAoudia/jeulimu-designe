/** Resolve Vercel Blob read/write token (supports common naming from Blob connect UI). */
export function getBlobReadWriteToken(): string | undefined {
  const candidates = [
    process.env.BLOB_READ_WRITE_TOKEN,
    process.env.BLOBJ_READ_WRITE_TOKEN,
    process.env.READ_WRITE_TOKEN,
  ];
  for (const v of candidates) {
    if (v?.trim()) return v.trim();
  }
  for (const [key, value] of Object.entries(process.env)) {
    if (key.endsWith("_READ_WRITE_TOKEN") && value?.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

/** Names of blob-related env keys present on the server (values never exposed). */
export function listBlobEnvKeys(): string[] {
  return Object.keys(process.env).filter((k) => /blob|read.?write/i.test(k)).sort();
}

export function blobTokenMissingMessage(): string {
  const keys = listBlobEnvKeys();
  const keyHint =
    keys.length > 0
      ? `Server env keys found: ${keys.join(", ")} — but no read/write token value.`
      : "No BLOB env keys on server — add BLOB_READ_WRITE_TOKEN and redeploy.";

  return [
    "BLOB_READ_WRITE_TOKEN is not available on the server.",
    keyHint,
    "Fix: jeulimu-designe → Settings → Environment Variables → add BLOB_READ_WRITE_TOKEN (Production + Preview).",
    "Then Deployments → Redeploy (uncheck “Use existing Build Cache” if offered).",
  ].join(" ");
}
