import { createHmac, timingSafeEqual } from "crypto";
import type { AccountRole, SessionUser } from "@/lib/dummy-accounts";

const SECRET = "makna-google-jembatan-lokal";

export function openGoogleHandoff(token: string): SessionUser | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", SECRET).update(body).digest("hex");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const json = Buffer.from(body, "base64url").toString();
    const data = JSON.parse(json) as { email?: unknown; name?: unknown; role?: unknown; exp?: unknown };
    if (typeof data.email !== "string" || !data.email.includes("@")) return null;
    if (typeof data.name !== "string" || data.name.trim() === "") return null;
    if (data.role !== "pengunjung" && data.role !== "kantor" && data.role !== "konsumen") return null;
    if (typeof data.exp !== "number" || data.exp < Date.now() / 1000) return null;
    const role: AccountRole = data.role;
    return { username: data.email, name: data.name.trim(), role };
  } catch {
    return null;
  }
}
