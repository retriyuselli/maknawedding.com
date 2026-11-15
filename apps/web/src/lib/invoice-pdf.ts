import { buildPdf, escapePdf, ink, muted, pageWidth } from "@/lib/pdf-file";

const rows = [
  ["Nama acara", "Belum terhubung"],
  ["Nomor invoice", "Belum terhubung"],
  ["Tanggal", "Belum terhubung"],
  ["Nilai kesepakatan", "Belum terhubung"],
  ["Sudah dibayar", "Belum terhubung"],
  ["Sisa", "Belum terhubung"],
  ["Jatuh tempo", "Belum terhubung"],
];

export function invoicePdf(names: string[]) {
  const commands: string[] = [];
  let y = 788;

  function text(value: string, x: number, size: number, bold: boolean, color: string) {
    commands.push(`${color} rg\nBT /F${bold ? 2 : 1} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdf(value)}) Tj ET`);
  }

  function rule() {
    commands.push(`0.827 0.878 0.831 RG\n0.7 w\n48 ${y.toFixed(2)} m ${(pageWidth - 48).toFixed(2)} ${y.toFixed(2)} l S`);
    y -= 24;
  }

  const addressed = names.map((name) => name.trim()).filter(Boolean).join(" dan ");
  text("Invoice", 48, 22, true, ink);
  y -= 30;
  text("Bukan tagihan. Nilai belum terhubung ke maknafinance.", 48, 10, false, muted);
  y -= 28;
  text("Kepada", 48, 10, false, muted);
  y -= 16;
  text(addressed || "Belum diisi", 48, 13, true, ink);
  y -= 26;
  rule();

  for (const [label, value] of rows) {
    text(label, 48, 11, true, ink);
    text(value, 220, 11, false, muted);
    y -= 22;
  }

  y -= 6;
  rule();
  text("Pengeluaran internal Makna tidak ditampilkan.", 48, 10, false, muted);

  return new Blob([buildPdf([commands.join("\n")], "Invoice")], { type: "application/pdf" });
}
