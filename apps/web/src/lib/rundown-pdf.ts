import { buildPdf, escapePdf, ink, muted, pageWidth, wrapPdf } from "@/lib/pdf-file";

export type RundownPdfStep = { time: string; title: string; detail: string; officer: string };
export type RundownPdfGroup = { title: string; items: RundownPdfStep[] };
export type RundownPdfNote = { time: string; activity: string };

export function rundownPdf(groups: RundownPdfGroup[], notes: RundownPdfNote[]) {
  const pages: string[][] = [];
  let commands: string[] = [];
  let y = 0;
  let section = "";
  let repeatSection = false;

  function openPage() {
    commands = [];
    pages.push(commands);
    y = 788;
    if (pages.length > 1) {
      text("Rundown", 48, 11, true, ink);
      y -= 16;
      rule();
      if (repeatSection && section) {
        text(section, 48, 13, true, ink);
        y -= 20;
      }
    }
  }

  function need(height: number) {
    if (pages.length === 0 || y - height < 58) openPage();
  }

  function text(value: string, x: number, size: number, bold: boolean, color: string) {
    commands.push(`${color} rg\nBT /F${bold ? 2 : 1} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdf(value)}) Tj ET`);
  }

  function rule() {
    commands.push(`0.827 0.878 0.831 RG\n0.7 w\n48 ${y.toFixed(2)} m ${(pageWidth - 48).toFixed(2)} ${y.toFixed(2)} l S`);
    y -= 16;
  }

  openPage();
  text("Rundown", 48, 22, true, ink);
  y -= 30;
  for (const line of wrapPdf("Contoh urutan untuk Lamaran, Akad, dan Resepsi. Bukan jadwal yang terhubung.", 10, 499)) {
    text(line, 48, 10, false, muted);
    y -= 14;
  }
  y -= 4;
  rule();

  for (const group of groups) {
    const start = group.items[0]?.time ?? "";
    const finish = group.items.at(-1)?.time ?? "";
    repeatSection = false;
    need(42);
    text(group.title, 48, 13, true, ink);
    if (start && finish) text(`${start}\u2013${finish}`, 468, 10, false, muted);
    y -= 20;
    section = group.title;
    repeatSection = true;
    for (const step of group.items) {
      const details = wrapPdf(step.detail, 10, 430);
      need(16 + details.length * 13 + 20);
      text(step.time, 48, 11, true, ink);
      text(step.title, 108, 11, true, ink);
      y -= 15;
      for (const line of details) {
        text(line, 108, 10, false, muted);
        y -= 13;
      }
      text(`Petugas: ${step.officer}`, 108, 10, true, ink);
      y -= 18;
    }
    y -= 6;
  }

  if (notes.length > 0) {
    repeatSection = false;
    need(46);
    text("Catatan tambahan", 48, 13, true, ink);
    y -= 18;
    section = "Catatan tambahan";
    repeatSection = true;
    text("Catatan peramban. Belum menjadi bagian acara.", 48, 10, false, muted);
    y -= 18;
    for (const note of notes) {
      const lines = wrapPdf(note.activity, 11, 430);
      need(lines.length * 14 + 8);
      lines.forEach((line, index) => {
        if (index === 0) text(note.time, 48, 11, true, ink);
        text(line, 108, 11, false, ink);
        y -= 14;
      });
    }
  }

  const streams = pages.map((page, index) => {
    const footer = [
      `${muted} rg\nBT /F1 9 Tf 1 0 0 1 48 34 Tm (${escapePdf("Contoh, belum terhubung")}) Tj ET`,
      `${muted} rg\nBT /F1 9 Tf 1 0 0 1 520 34 Tm (${escapePdf(`${index + 1} / ${pages.length}`)}) Tj ET`,
    ];
    return [...page, ...footer].join("\n");
  });

  return new Blob([buildPdf(streams, "Rundown")], { type: "application/pdf" });
}
