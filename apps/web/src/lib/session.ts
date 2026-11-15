import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { SessionUser } from "@/lib/dummy-accounts";

const COOKIE = "makna_sesi";
const SECRET = "makna-dummy-lokal";

export type { SessionUser };

export const sessionCookie = {
  name: COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};

export function sealSession(user: SessionUser) {
  const body = Buffer.from(JSON.stringify(user)).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function openSession(token: string): SessionUser | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = createHmac("sha256", SECRET).update(body).digest("base64url");
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionUser;
    if ((data.role !== "pengunjung" && data.role !== "kantor" && data.role !== "konsumen") || !data.username || !data.name) return null;
    return { username: data.username, name: data.name, role: data.role };
  } catch {
    return null;
  }
}

export async function readSession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return openSession(token);
}
