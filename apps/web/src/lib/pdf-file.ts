export const ink = "0.110 0.200 0.173";
export const muted = "0.361 0.427 0.388";
export const pageWidth = 595.28;
export const pageHeight = 841.89;

const winAnsi: Record<number, number> = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f,
};

export function wrapPdf(value: string, size: number, width: number) {
  const max = Math.max(12, Math.floor(width / (size * 0.56)));
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (word.length > max) {
      if (current) lines.push(current);
      for (let index = 0; index < word.length; index += max) lines.push(word.slice(index, index + max));
      current = "";
      continue;
    }
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

export function escapePdf(value: string) {
  let out = "";
  for (const char of value.normalize("NFC")) {
    const code = char.codePointAt(0) ?? 0;
    if (code > 0xffff) {
      out += "?";
      continue;
    }
    const byte = code >= 32 && code <= 126 ? code : code >= 160 && code <= 255 ? code : winAnsi[code];
    if (byte === undefined) {
      out += code === 9 || code === 10 || code === 13 ? " " : "?";
      continue;
    }
    if (byte === 0x5c || byte === 0x28 || byte === 0x29) out += `\\${String.fromCharCode(byte)}`;
    else if (byte >= 32 && byte <= 126) out += String.fromCharCode(byte);
    else out += `\\${byte.toString(8).padStart(3, "0")}`;
  }
  return out;
}

export function buildPdf(streams: string[], title: string) {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets = [0];
  let cursor = 0;

  function push(value: string) {
    const bytes = encoder.encode(value);
    chunks.push(bytes);
    cursor += bytes.length;
  }

  function add(body: string) {
    offsets.push(cursor);
    push(`${offsets.length - 1} 0 obj\n${body}\nendobj\n`);
  }

  const pageIds = streams.map((_, index) => 6 + index * 2);
  const contentIds = streams.map((_, index) => 7 + index * 2);
  push("%PDF-1.4\n");
  add("<< /Type /Catalog /Pages 2 0 R >>");
  add(`<< /Type /Pages /Count ${streams.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);
  add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  add(`<< /Title (${escapePdf(title)}) /Producer (Makna Wedding) >>`);
  streams.forEach((stream, index) => {
    add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentIds[index]} 0 R >>`);
    add(`<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`);
  });

  const xrefAt = cursor;
  let xref = `xref\n0 ${offsets.length}\n0000000000 65535 f \n`;
  for (let index = 1; index < offsets.length; index += 1) {
    xref += `${offsets[index].toString().padStart(10, "0")} 00000 n \n`;
  }
  push(`${xref}trailer\n<< /Size ${offsets.length} /Root 1 0 R /Info 5 0 R >>\nstartxref\n${xrefAt}\n%%EOF`);

  const bytes = new Uint8Array(cursor);
  let position = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, position);
    position += chunk.length;
  }
  return bytes;
}
