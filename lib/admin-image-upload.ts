/** Upload an allowed image or video (see /api/admin/upload). */
export async function postAdminUpload(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const raw = await res.text();
  let j: { error?: string; url?: string } = {};
  if (raw.trim()) {
    try {
      j = JSON.parse(raw) as { error?: string; url?: string };
    } catch {
      /* non-JSON body (e.g. proxy HTML) */
    }
  }
  if (!res.ok) {
    throw new Error(
      j.error ??
        (raw.trim()
          ? `Upload failed (${res.status})`
          : `Upload failed (${res.status}): empty response — try a smaller image (under 4 MB).`),
    );
  }
  if (!j.url) {
    throw new Error(
      j.error ??
        (raw.trim()
          ? "Upload failed: invalid response"
          : "Upload failed: empty response from server"),
    );
  }
  return j.url;
}

export async function postAdminImage(file: File): Promise<string> {
  return postAdminUpload(file);
}
