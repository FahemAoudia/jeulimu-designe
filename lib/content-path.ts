export function isLocalizedString(v: unknown): v is { en: string; fr: string } {
  return (
    typeof v === "object" &&
    v !== null &&
    "en" in v &&
    "fr" in v &&
    typeof (v as { en: unknown }).en === "string" &&
    typeof (v as { fr: unknown }).fr === "string"
  );
}

export function getAtPath(root: unknown, path: string[]): unknown {
  let cur: unknown = root;
  for (const key of path) {
    if (cur === null || cur === undefined || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

export function setAtPath<T extends Record<string, unknown>>(
  root: T,
  path: string[],
  value: unknown,
): T {
  if (path.length === 0) return root as T;
  const out = structuredClone(root);
  let cur: Record<string, unknown> = out;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const next = cur[key];
    if (typeof next !== "object" || next === null) {
      cur[key] = {};
    }
    cur = cur[key] as Record<string, unknown>;
  }
  cur[path[path.length - 1]] = value;
  return out;
}

export function labelFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export function isImageKey(key: string): boolean {
  const k = key.toLowerCase();
  return (
    k.includes("image") ||
    k.includes("logo") ||
    k === "backgroundvideo" ||
    k === "poster" ||
    k.endsWith("url") && k.includes("embed")
  );
}
