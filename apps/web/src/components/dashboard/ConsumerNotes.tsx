"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { readNotes, writeNotes } from "@/lib/browser-notes";
import { rundownPdf } from "@/lib/rundown-pdf";
import "./consumer-board.css";
import "./guest-book.css";
import "./rundown.css";

type Guest = { id: string; name: string; side: string; count: number };
type Beat = { id: string; time: string; activity: string };
type Letter = { id: string; text: string; at: string };

const sides = ["Keluarga pria", "Keluarga wanita", "Lain"];

const sampleGuests: Guest[] = [
  { id: "contoh-ortu-pria", name: "Orang tua pihak pria", side: "Keluarga pria", count: 2 },
  { id: "contoh-saudara-pria", name: "Saudara pihak pria", side: "Keluarga pria", count: 4 },
  { id: "contoh-ortu-wanita", name: "Orang tua pihak wanita", side: "Keluarga wanita", count: 2 },
  { id: "contoh-saudara-wanita", name: "Saudara pihak wanita", side: "Keluarga wanita", count: 3 },
  { id: "contoh-rekan", name: "Rekan kerja", side: "Lain", count: 2 },
  { id: "contoh-tetangga", name: "Tetangga", side: "Lain", count: 4 },
];

export function ConsumerNotes({ slug, username }: { slug: string; username: string }) {
  if (slug === "tamu") return <GuestBook username={username} />;
  if (slug === "rundown") return <RundownBook username={username} />;
  return <MessageBook username={username} />;
}

function GuestBook({ username }: { username: string }) {
  const [items, setItems] = useNotes<Guest>(username, "tamu");
  const [filter, setFilter] = useState("Semua");
  const [name, setName] = useState("");
  const [side, setSide] = useState(sides[0]);
  const [count, setCount] = useState("1");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const guests = [...sampleGuests, ...(items ?? [])];
  const visible = filter === "Semua" ? guests : guests.filter((guest) => guest.side === filter);
  const people = guests.reduce((sum, guest) => sum + guest.count, 0);

  function add(event: FormEvent) {
    event.preventDefault();
    const clean = name.trim();
    const people = Number(count);
    if (clean.length < 2 || clean.length > 80) {
      setError("Nama tamu diisi 2 sampai 80 karakter.");
      return;
    }
    if (!Number.isInteger(people) || people < 1 || people > 99) {
      setError("Jumlah orang diisi dari 1 sampai 99.");
      return;
    }
    setError("");
    setNote("");
    setItems([...(items ?? []), { id: newId(), name: clean, side, count: people }]);
    setName("");
    setCount("1");
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || items === null) return;
    const kind = file.name.toLowerCase();
    if (!kind.endsWith(".csv") && !kind.endsWith(".txt")) {
      setNote("");
      setError("Unggah berkas CSV atau teks. Kolom yang dibaca: nama, pihak, jumlah.");
      return;
    }
    if (file.size > 512 * 1024) {
      setNote("");
      setError("Berkas paling besar 512 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseGuestFile(String(reader.result ?? ""), side);
      if (parsed.guests.length === 0) {
        setNote("");
        setError("Tidak ada baris tamu yang bisa dibaca.");
        return;
      }
      setError("");
      setItems([...(items ?? []), ...parsed.guests]);
      const extra = parsed.skipped > 0 ? ` ${parsed.skipped} baris dilewati.` : "";
      setNote(`${parsed.guests.length} tamu ditambahkan dari berkas.${extra} Tersimpan di peramban, belum dikirim.`);
    };
    reader.onerror = () => {
      setNote("");
      setError("Berkas tidak bisa dibaca.");
    };
    reader.readAsText(file);
  }

  return (
    <div className="guest-book">
      <dl className="guest-summary">
        <div>
          <dt>Tamu</dt>
          <dd>{guests.length}</dd>
        </div>
        <div>
          <dt>Orang</dt>
          <dd>{people}</dd>
        </div>
      </dl>
      <div className="guest-switch" role="tablist" aria-label="Saring pihak">
        {["Semua", ...sides].map((item) => {
          const total = item === "Semua" ? guests.length : guests.filter((guest) => guest.side === item).length;
          return (
            <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)}>
              <span>{item}</span>
              <span>{total}</span>
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? <p className="guest-empty">{guests.length === 0 ? "Belum ada tamu. Tambah dari formulir di bawah." : "Belum ada tamu di pihak ini."}</p> : null}
      <ul>
        {visible.map((guest) => (
          <li key={guest.id}>
            <div>
              <h2>{guest.name}</h2>
              <p>{guest.side}</p>
            </div>
            <p className="guest-count">{guest.count} orang</p>
            {guest.id.startsWith("contoh-") ? <span className="guest-badge">Contoh</span> : <button type="button" onClick={() => setItems((items ?? []).filter((item) => item.id !== guest.id))}>Hapus</button>}
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <h2>Tambah tamu</h2>
        <label>
          Nama
          <input value={name} maxLength={80} onChange={(event) => setName(event.target.value)} />
        </label>
        <div className="guest-fields">
          <label>
            Pihak
            <select value={side} onChange={(event) => setSide(event.target.value)}>
              {sides.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            Jumlah
            <input inputMode="numeric" value={count} onChange={(event) => setCount(event.target.value)} />
          </label>
        </div>
        {error ? <p className="guest-error">{error}</p> : null}
        {note ? <p className="guest-hint">{note}</p> : null}
        <div className="guest-actions">
          <button type="submit" disabled={items === null}>Simpan tamu</button>
          <button type="button" disabled={items === null} onClick={() => fileRef.current?.click()}>Unggah</button>
        </div>
        <p className="guest-hint">CSV atau teks berisi nama, pihak, dan jumlah. Berkas dibaca di peramban dan tidak dikirim.</p>
        <input ref={fileRef} type="file" accept=".csv,.txt,text/csv,text/plain" aria-label="Berkas daftar tamu" hidden onChange={upload} />
      </form>
    </div>
  );
}

const sampleRundown = [
  {
    title: "Lamaran",
    items: [
      { time: "10.00", title: "Pembukaan dan sambutan tuan rumah", detail: "Keluarga yang datang disambut, lalu acara dibuka.", officer: "Tuan rumah" },
      { time: "10.10", title: "Sambutan dan maksud kedatangan pihak pria", detail: "Maksud kedatangan disampaikan di hadapan keluarga wanita.", officer: "Juru bicara pihak pria" },
      { time: "10.20", title: "Penyampaian lamaran resmi", detail: "Lamaran diucapkan secara resmi kepada keluarga wanita.", officer: "Juru bicara pihak pria" },
      { time: "10.30", title: "Jawaban dari pihak wanita", detail: "Keluarga wanita memberi jawaban atas lamaran.", officer: "Juru bicara pihak wanita" },
      { time: "10.40", title: "Penyerahan seserahan", detail: "Hantaran diserahkan dan diterima oleh keluarga wanita.", officer: "Pembawa seserahan" },
      { time: "10.50", title: "Tukar cincin", detail: "Cincin dipertukarkan bila ada tunangan.", officer: "Calon mempelai" },
      { time: "11.00", title: "Menyepakati rencana pernikahan", detail: "Rencana tanggal akad dan resepsi dicatat bersama.", officer: "Juru bicara kedua keluarga" },
      { time: "11.10", title: "Doa bersama", detail: "Acara lamaran ditutup dengan doa.", officer: "Pemimpin doa" },
      { time: "11.20", title: "Ramah tamah dan makan bersama", detail: "Kedua keluarga makan dan berbincang bersama.", officer: "Keluarga tuan rumah" },
      { time: "11.40", title: "Sesi foto keluarga", detail: "Foto bersama setelah seluruh urutan selesai.", officer: "Fotografer" },
    ],
  },
  {
    title: "Akad",
    items: [
      { time: "08.00", title: "Makeup dan busana selesai", detail: "Mempelai siap sebelum jam akad dimulai.", officer: "Perias" },
      { time: "09.00", title: "Prosesi ijab kabul", detail: "Ijab kabul dipimpin sesuai ketentuan KUA.", officer: "Penghulu" },
      { time: "09.20", title: "Penyerahan mahar dan pemasangan cincin", detail: "Mahar diserahkan, kemudian cincin dipasang.", officer: "Mempelai dan wali" },
      { time: "09.30", title: "Penandatanganan buku nikah", detail: "Buku nikah ditandatangani mempelai, wali, saksi, dan penghulu.", officer: "Penghulu" },
      { time: "09.40", title: "Doa dan nasihat pernikahan", detail: "Nasihat singkat disampaikan, lalu doa dibacakan.", officer: "Penghulu" },
      { time: "09.50", title: "Sungkeman kepada orang tua", detail: "Mempelai sungkem kepada orang tua kedua belah pihak.", officer: "Mempelai" },
      { time: "10.00", title: "Sesi foto bersama", detail: "Foto keluarga besar setelah akad.", officer: "Fotografer" },
      { time: "10.10", title: "Serah terima buku nikah", detail: "Buku nikah diserahkan kepada keluarga.", officer: "Penghulu" },
    ],
  },
  {
    title: "Resepsi",
    items: [
      { time: "18.00", title: "Kedatangan dan standby mempelai", detail: "Mempelai bersiap di ruang transit sebelum masuk.", officer: "Koordinator" },
      { time: "18.30", title: "Penerimaan tamu", detail: "Tamu disambut dan diarahkan ke tempat duduk.", officer: "Among tamu" },
      { time: "19.00", title: "Pembukaan oleh MC", detail: "Acara dibuka dan rundown disampaikan kepada tamu.", officer: "MC" },
      { time: "19.10", title: "Prosesi masuk pengantin", detail: "Mempelai masuk menuju pelaminan.", officer: "Koordinator" },
      { time: "19.25", title: "Sambutan keluarga", detail: "Perwakilan keluarga menyampaikan sambutan.", officer: "Keluarga" },
      { time: "19.40", title: "Potong kue dan tumpeng", detail: "Kue dan tumpeng dipotong bersama.", officer: "Mempelai" },
      { time: "19.50", title: "Doa bersama", detail: "Doa dibacakan untuk kedua mempelai.", officer: "Pemimpin doa" },
      { time: "20.00", title: "Hiburan dan ramah tamah", detail: "Tamu menikmati hiburan dan hidangan.", officer: "Pengisi hiburan" },
      { time: "20.40", title: "Sesi foto bersama tamu", detail: "Foto bersama tamu yang hadir.", officer: "Fotografer" },
      { time: "21.00", title: "Penutup", detail: "Acara ditutup dan tamu diantar pulang.", officer: "MC" },
    ],
  },
];

function downloadRundown(notes: Beat[]) {
  const blob = rundownPdf(sampleRundown, notes);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rundown.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

function parseGuestFile(text: string, fallbackSide: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const guests: Guest[] = [];
  let skipped = 0;
  if (lines.length === 0) return { guests, skipped };
  const headers = splitRow(lines[0]).map(normalizeCell);
  const hasHeader = headers.some((cell) => cell === "nama" || cell === "nama lengkap" || cell === "name");
  const nameAt = hasHeader ? headers.findIndex((cell) => cell === "nama" || cell === "nama lengkap" || cell === "name") : 0;
  const sideAt = hasHeader ? headers.findIndex((cell) => cell === "pihak" || cell === "sisi" || cell === "kategori") : 1;
  const countAt = hasHeader ? headers.findIndex((cell) => cell === "jumlah" || cell === "orang" || cell === "pax") : 2;

  for (const line of hasHeader ? lines.slice(1) : lines) {
    if (guests.length >= 200) {
      skipped += 1;
      continue;
    }
    const cells = splitRow(line);
    if (cells.some((cell) => cell.toLowerCase().includes("hapus sebelum upload"))) {
      skipped += 1;
      continue;
    }
    const numbered = !hasHeader && /^\d+$/.test(cells[0] ?? "") && (cells[1]?.trim().length ?? 0) >= 2;
    const rawName = (numbered ? cells[1] : cells[nameAt] ?? "").trim();
    if (normalizeCell(rawName) === "bapak contoh nama" || rawName.length < 2 || rawName.length > 80) {
      skipped += 1;
      continue;
    }
    const rawSide = numbered || sideAt < 0 ? "" : cells[sideAt] ?? "";
    const rawCount = numbered || countAt < 0 ? "1" : cells[countAt] ?? "1";
    const count = Number(rawCount.trim() || "1");
    if (!Number.isInteger(count) || count < 1 || count > 99) {
      skipped += 1;
      continue;
    }
    guests.push({
      id: newId(),
      name: rawName,
      side: mapSide(rawSide) ?? fallbackSide,
      count,
    });
  }
  return { guests, skipped };
}

function splitRow(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (quoted) {
      if (char === '"' && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else current += char;
    } else if (char === '"') quoted = true;
    else if (char === "," || char === ";" || char === "\t") {
      cells.push(current.trim());
      current = "";
    } else current += char;
  }
  cells.push(current.trim());
  return cells;
}

function normalizeCell(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function mapSide(value: string) {
  const clean = normalizeCell(value);
  if (clean === "keluarga pria" || clean === "pria" || clean === "pihak pria" || clean === "cpp") return "Keluarga pria";
  if (clean === "keluarga wanita" || clean === "wanita" || clean === "pihak wanita" || clean === "cpw") return "Keluarga wanita";
  if (clean === "lain" || clean === "lainnya" || clean === "umum") return "Lain";
  return null;
}

function RundownBook({ username }: { username: string }) {
  const [items, setItems] = useNotes<Beat>(username, "rundown");
  const [acara, setAcara] = useState(sampleRundown[0].title);
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [error, setError] = useState("");
  const group = sampleRundown.find((item) => item.title === acara) ?? sampleRundown[0];
  const start = group.items[0].time;
  const finish = group.items[group.items.length - 1].time;

  function add(event: FormEvent) {
    event.preventDefault();
    const when = time.trim();
    const what = activity.trim();
    if (when.length < 1 || when.length > 20 || what.length < 2 || what.length > 160) {
      setError("Isi jam dan kegiatan. Kegiatan paling pendek 2 karakter.");
      return;
    }
    setError("");
    setItems([...(items ?? []), { id: newId(), time: when, activity: what }]);
    setTime("");
    setActivity("");
  }

  return (
    <div className="rundown">
      <div className="rundown-download">
        <button type="button" disabled={items === null} onClick={() => downloadRundown(items ?? [])}>Unduh</button>
        <p>PDF berisi Lamaran, Akad, Resepsi, dan catatan tambahan. Dibuat di peramban dan tidak dikirim.</p>
      </div>
      <div className="rundown-switch" role="tablist" aria-label="Pilih acara">
        {sampleRundown.map((item) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={acara === item.title}
            onClick={() => setAcara(item.title)}
          >
            <span>{item.title}</span>
            <span>{item.items[0].time}–{item.items[item.items.length - 1].time}</span>
          </button>
        ))}
      </div>
      <section>
        <h2>{group.title} <span>{start}–{finish}</span></h2>
        <ol className="rundown-line">
          {group.items.map((step) => (
            <li key={`${group.title}-${step.time}`}>
              <time dateTime={step.time.replace(".", ":")}>{step.time}</time>
              <span className="rundown-mark" aria-hidden="true" />
              <div className="rundown-copy">
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
                <p className="rundown-officer">Petugas: {step.officer}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <form onSubmit={add}>
        <h2>Catatan tambahan</h2>
        <div className="rundown-fields">
          <label>
            Jam
            <input value={time} maxLength={20} placeholder="09.00" onChange={(event) => setTime(event.target.value)} />
          </label>
          <label>
            Kegiatan
            <input value={activity} maxLength={160} onChange={(event) => setActivity(event.target.value)} />
          </label>
        </div>
        {error ? <p className="rundown-error">{error}</p> : null}
        <button type="submit" disabled={items === null}>Tambah urutan</button>
      </form>
      {items && items.length > 0 ? (
        <ol className="rundown-line rundown-notes">
          {items.map((beat) => (
            <li key={beat.id}>
              <time>{beat.time}</time>
              <span className="rundown-mark" aria-hidden="true" />
              <p>
                {beat.activity}
                <button type="button" onClick={() => setItems(items.filter((item) => item.id !== beat.id))}>Hapus</button>
              </p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

function MessageBook({ username }: { username: string }) {
  const [items, setItems] = useNotes<Letter>(username, "pesan");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function add(event: FormEvent) {
    event.preventDefault();
    const clean = text.trim();
    if (clean.length < 2 || clean.length > 500) {
      setError("Pesan diisi 2 sampai 500 karakter.");
      return;
    }
    setError("");
    const at = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
    setItems([...(items ?? []), { id: newId(), text: clean, at }]);
    setText("");
  }

  return (
    <div className="consumer-board">
      {items?.length === 0 ? <p>Belum ada pesan.</p> : null}
      <ul>
        {items?.map((letter) => (
          <li key={letter.id}>
            <div>
              <p>{letter.text}</p>
              <p>{letter.at} · Belum terkirim</p>
            </div>
            <button type="button" onClick={() => setItems((items ?? []).filter((item) => item.id !== letter.id))}>Hapus</button>
          </li>
        ))}
      </ul>
      <form onSubmit={add}>
        <label>
          Pesan untuk pendamping
          <textarea value={text} maxLength={500} rows={4} onChange={(event) => setText(event.target.value)} />
        </label>
        {error ? <p className="consumer-error">{error}</p> : null}
        <button type="submit" disabled={items === null}>Simpan pesan</button>
      </form>
    </div>
  );
}

function useNotes<T>(username: string, area: string): [T[] | null, (next: T[]) => void] {
  const [items, setItems] = useState<T[] | null>(null);
  useEffect(() => {
    setItems(readNotes<T>(username, area));
  }, [username, area]);
  return [items, (next) => {
    writeNotes(username, area, next);
    setItems(next);
  }];
}

function newId() {
  return crypto.randomUUID();
}
