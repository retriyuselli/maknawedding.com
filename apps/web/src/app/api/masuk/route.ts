import { NextResponse } from "next/server";
import type { AccountRole } from "@/lib/dummy-accounts";
import { sealSession, sessionCookie } from "@/lib/session";

const roles: AccountRole[] = ["pengunjung", "kantor", "konsumen"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const cms = process.env.MAKNA_CMS_URL ?? "http://127.0.0.1:8000";

  let upstream: Response;
  try {
    upstream = await fetch(new URL("/api/masuk", cms), {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ ok: false }, { status: upstream.status === 401 ? 401 : 503 });
  }

  const account = await upstream.json().catch(() => null) as { username?: unknown; name?: unknown; role?: unknown; panelUrl?: unknown } | null;
  const panelUrl = typeof account?.panelUrl === "string" ? account.panelUrl : "";
  const panelPrefix = `${new URL(cms).origin}/masuk/panel?`;
  if (panelUrl.startsWith(panelPrefix)) {
    return NextResponse.json({ ok: true, panelUrl });
  }

  const role = account?.role;
  if (!account || typeof account.username !== "string" || typeof account.name !== "string" || !roles.includes(role as AccountRole)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, role });
  response.cookies.set(
    sessionCookie.name,
    sealSession({ username: account.username, name: account.name, role: role as AccountRole }),
    sessionCookie.options,
  );
  return response;
}
