export function safeFilename(name) {
  const base = (name || "download")
    .replace(/\\/g, "_")
    .replace(/\//g, "_")
    .replace(/\r|\n/g, " ")
    .replace(/\"/g, "'")
    .trim();

  return base.length ? base : "download";
}
