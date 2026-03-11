export function generateOrderID() {
  const now = new Date();
  const ts = now
    .toISOString()
    .replace(/[-:TZ.]/g, "") // e.g. 20260310T162455Z -> 20260310...
    .slice(0, 14);           // YYYYMMDDHHMMSS

  const rand = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5 chars

  return `ORD-${ts}-${rand}`; // e.g. ORD-20260310XXXXXX-ABC12
}
