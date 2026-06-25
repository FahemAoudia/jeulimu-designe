import { promises as fs } from "fs";
import path from "path";
import { head, put } from "@vercel/blob";
import { defaultSiteContent } from "@/lib/site-defaults";
import type { SiteContent } from "@/types/site-content";

const DATA_FILE = path.join(process.cwd(), "data", "site-content.json");
const BLOB_PATHNAME = "jeulumi/site-content.json";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T extends Record<string, unknown>>(base: T, patch: unknown): T {
  if (!isPlainObject(patch)) return base;
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    const pv = (patch as Record<string, unknown>)[key];
    const bv = out[key];
    if (isPlainObject(pv) && isPlainObject(bv)) {
      out[key] = deepMerge(bv as Record<string, unknown>, pv);
    } else if (Array.isArray(pv) && Array.isArray(bv) && key !== "gallery") {
      out[key] = pv;
    } else if (Array.isArray(pv)) {
      out[key] = pv;
    } else if (pv !== undefined) {
      out[key] = pv;
    }
  }
  return out as T;
}

function blobToken(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || undefined;
}

async function readSiteContentFromBlob(): Promise<unknown | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const meta = await head(BLOB_PATHNAME, { token });
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return JSON.parse(await res.text()) as unknown;
  } catch {
    return null;
  }
}

async function writeSiteContentToBlob(content: SiteContent): Promise<boolean> {
  const token = blobToken();
  if (!token) return false;
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "public",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
  });
  return true;
}

export async function getSiteContent(): Promise<SiteContent> {
  const blobParsed = await readSiteContentFromBlob();
  if (blobParsed) {
    return deepMerge(
      structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
      blobParsed,
    ) as SiteContent;
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return deepMerge(
      structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
      parsed,
    ) as SiteContent;
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export function getSiteContentPath() {
  return DATA_FILE;
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  if (await writeSiteContentToBlob(content)) return;

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}
