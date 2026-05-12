/** Upload an allowed image or video (see /api/admin/upload). */
export async function postAdminUpload(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
    credentials: "include",
  });
  const j = (await res.json()) as { error?: string; url?: string };
  if (!res.ok) throw new Error(j.error ?? "Upload failed");
  if (!j.url) throw new Error("Upload failed");
  return j.url;
}

export async function postAdminImage(file: File): Promise<string> {
  return postAdminUpload(file);
}
