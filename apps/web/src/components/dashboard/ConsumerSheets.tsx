import { InvoiceDownload } from "@/components/dashboard/InvoiceDownload";
import "./consumer-board.css";

const schedule = ["Lamaran", "Pengajian", "Akad atau pemberkatan", "Resepsi", "Ngunduh mantu"];
const notices = ["Perubahan jadwal", "Pengingat pembayaran", "Tugas checklist"];
const files = ["Kontrak", "Persetujuan produk"];
const payments = [
  ["Nilai kesepakatan", "Belum terhubung"],
  ["Sudah dibayar", "Belum terhubung"],
  ["Sisa", "Belum terhubung"],
  ["Jatuh tempo", "Belum terhubung"],
];

export function ConsumerSheets({ slug }: { slug: string }) {
  if (slug === "jadwal") {
    return (
      <div className="consumer-board">
        {schedule.map((title) => (
          <section key={title}>
            <h2>{title}</h2>
            <dl>
              <div><dt>Tanggal</dt><dd>Belum terhubung</dd></div>
              <div><dt>Jam</dt><dd>Belum terhubung</dd></div>
              <div><dt>Tempat</dt><dd>Belum terhubung</dd></div>
            </dl>
          </section>
        ))}
      </div>
    );
  }

  if (slug === "cakupan") {
    return (
      <div className="consumer-board">
        <section>
          <h2>Termasuk pendampingan Makna</h2>
          <p>Belum ada butir dari order.</p>
        </section>
        <section>
          <h2>Diurus keluarga</h2>
          <p>Belum ada butir yang ditandai untuk keluarga.</p>
        </section>
      </div>
    );
  }

  if (slug === "pembayaran") {
    return (
      <>
        <InvoiceDownload />
        <dl className="consumer-facts">
          {payments.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </>
    );
  }

  if (slug === "berkas") {
    return (
      <ul className="consumer-files">
        {files.map((title) => (
          <li key={title}>
            <h2>{title}</h2>
            <p>Belum ada berkas</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="consumer-files">
      {notices.map((title) => (
        <li key={title}>
          <h2>{title}</h2>
          <p>Belum ada</p>
        </li>
      ))}
    </ul>
  );
}
