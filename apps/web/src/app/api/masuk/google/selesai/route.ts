import { NextResponse } from "next/server";
import { openGoogleHandoff } from "@/lib/google-handoff";
import { sealSession, sessionCookie } from "@/lib/session";

export function GET(request: Request) {
  const url = new URL(request.url);
  const masuk = new URL("/masuk", url.origin);
  const galat = url.searchParams.get("galat");

  if (galat) {
    masuk.searchParams.set("galat", galat);
    return NextResponse.redirect(masuk);
  }

  const user = openGoogleHandoff(url.searchParams.get("token") ?? "");
  if (!user) {
    masuk.searchParams.set("galat", "gagal");
    return NextResponse.redirect(masuk);
  }

  const response = NextResponse.redirect(new URL("/dashboard", url.origin));
  response.cookies.set(sessionCookie.name, sealSession(user), sessionCookie.options);
  return response;
}
