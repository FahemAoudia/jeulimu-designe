import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { defaultSiteContent } from "@/lib/site-defaults";
import {
  blobTokenMissingMessage,
  getBlobReadWriteToken,
} from "@/lib/blob-env";
import { migrateSiteContent } from "@/lib/content-migration";
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
  return getBlobReadWriteToken();
}

async function readSiteContentFromBlob(): Promise<unknown | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const result = await get(BLOB_PATHNAME, { access: "public", token });
    if (!result?.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function writeSiteContentToBlob(content: SiteContent, token: string): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "public",
    token,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  const blobParsed = await readSiteContentFromBlob();
  if (blobParsed) {
    return migrateSiteContent(
      deepMerge(
        structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
        blobParsed,
      ) as SiteContent,
    );
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return migrateSiteContent(
      deepMerge(
        structuredClone(defaultSiteContent) as unknown as Record<string, unknown>,
        parsed,
      ) as SiteContent,
    );
  } catch {
    return migrateSiteContent(structuredClone(defaultSiteContent));
  }
}

export function getSiteContentPath() {
  return DATA_FILE;
}

export async function writeSiteContent(content: SiteContent): Promise<void> {
  const token = blobToken();
  const onVercel = process.env.VERCEL === "1";

  if (token) {
    try {
      await writeSiteContentToBlob(content, token);
      return;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Could not save to Vercel Blob: ${msg}`);
    }
  }

  if (onVercel) {
    throw new Error(blobTokenMissingMessage());
  }

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/EROFS|EPERM|EACCES|read-only/i.test(msg)) {
      throw new Error(
        "This host cannot write to disk. Set BLOB_READ_WRITE_TOKEN or run the site locally.",
      );
    }
    throw e;
  }
}
