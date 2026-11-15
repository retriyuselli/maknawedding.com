import { NextResponse } from "next/server";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const finance = process.env.MAKNA_FINANCE_URL ?? "http://127.0.0.1:8000";
  const url = new URL("/auth/google", finance);
  url.searchParams.set("next", `${origin}/api/masuk/google/selesai`);
  return NextResponse.redirect(url);
}
