import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "admin-password.json");

export type StoredAdminPassword = {
  salt: string;
  hash: string;
};

export async function readStoredAdminPassword(): Promise<StoredAdminPassword | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const o = JSON.parse(raw) as unknown;
    if (
      typeof o === "object" &&
      o !== null &&
      typeof (o as StoredAdminPassword).salt === "string" &&
      typeof (o as StoredAdminPassword).hash === "string"
    ) {
      return o as StoredAdminPassword;
    }
    return null;
  } catch {
    return null;
  }
}

function verifyAgainstStored(plain: string, stored: StoredAdminPassword): boolean {
  try {
    const salt = Buffer.from(stored.salt, "base64");
    const expected = Buffer.from(stored.hash, "base64");
    const actual = scryptSync(plain, salt, expected.length);
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/** Login: `data/admin-password.json` if present, else `ADMIN_PASSWORD` env (exact match). */
export async function verifyAdminLoginPassword(plain: string): Promise<boolean> {
  const stored = await readStoredAdminPassword();
  if (stored) {
    return verifyAgainstStored(plain, stored);
  }
  const env = process.env.ADMIN_PASSWORD;
  if (env === undefined || env === "") return false;
  return plain === env;
}

const SCRYPT_KEYLEN = 64;

export async function setAdminPasswordFromPlain(plain: string): Promise<void> {
  const salt = randomBytes(16);
  const hash = scryptSync(plain, salt, SCRYPT_KEYLEN);
  const payload: StoredAdminPassword = {
    salt: salt.toString("base64"),
    hash: hash.toString("base64"),
  };
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");
}
