import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { blobTokenMissingMessage, getBlobReadWriteToken } from "@/lib/blob-env";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

/** Stay under typical serverless body limits (~4.5 MB on Vercel) to avoid empty/HTML error responses. */
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

function hasAdminCookie(header: string | null) {
  if (!header) return false;
  return header.split(";").some((p) => p.trim() === "jl_admin=1");
}

function extForVideo(orig: string, mime: string): string {
  const fromName = path.extname(orig).toLowerCase();
  if ([".mp4", ".webm", ".mov"].includes(fromName)) return fromName;
  if (mime === "video/webm") return ".webm";
  if (mime === "video/quicktime") return ".mov";
  return ".mp4";
}

function extForImage(orig: string): string {
  const fromName = path.extname(orig).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fromName))
    return fromName;
  return ".jpg";
}

/** Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set; else `public/uploads` (local). */
async function persistUpload(
  filename: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const token = getBlobReadWriteToken();
  if (token) {
    const blob = await put(`jeulumi/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: contentType || "application/octet-stream",
      token,
    });
    return blob.url;
  }
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(req: Request) {
  try {
    if (!hasAdminCookie(req.headers.get("cookie"))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const isImage = IMAGE_TYPES.has(file.type);
    const isVideo = VIDEO_TYPES.has(file.type);
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: "Use JPG, PNG, WebP, GIF, MP4, WebM, or MOV" },
        { status: 400 },
      );
    }

    const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: isVideo
            ? "Video max 80 MB"
            : "Image max 4 MB (smaller files avoid upload errors on some hosts)",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const orig = file.name || (isVideo ? "clip.mp4" : "photo.jpg");
    const ext = isVideo
      ? extForVideo(orig, file.type)
      : extForImage(orig);
    const filename = `${randomUUID()}${ext}`;
    const url = await persistUpload(filename, buffer, file.type);
    return NextResponse.json({ url });
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Upload could not be completed";
    const readOnly = /EROFS|EPERM|EACCES|read-only/i.test(msg);
    const noBlob = !getBlobReadWriteToken();
    return NextResponse.json(
      {
        error: noBlob
          ? blobTokenMissingMessage()
          : readOnly
            ? "Could not save file to disk on this host. Use Paste URL or check BLOB_READ_WRITE_TOKEN."
            : msg,
      },
      { status: 500 },
    );
  }
}
