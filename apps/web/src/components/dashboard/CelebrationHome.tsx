import { couplePeople, BiodataSheet } from "@/components/dashboard/BiodataSheet";
import "./celebration-home.css";

const status = [
  { label: "Nama acara", value: "Belum terhubung" },
  { label: "Tamu", value: "Belum terhubung" },
  { label: "Kontrak", value: "Belum terhubung" },
  { label: "Pembayaran", value: "Belum terhubung" },
  { label: "Pendamping", value: "Belum ditugaskan" },
];

export function CelebrationHome() {
  return (
    <div className="celebration">
      <header className="celebration-intro">
        <p className="eyebrow">Perayaan saya</p>
        <h1 className="celebration-names">
          {couplePeople.map((person) => (
            <span key={person.side} className="celebration-name">
              <span className="celebration-person">{person.name}</span>
              <span className="celebration-nick">{person.nick}</span>
            </span>
          ))}
        </h1>
        <dl className="celebration-status">
          {status.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>
      <BiodataSheet />
      <p className="celebration-note">
        Data kedua pihak mengikuti lembar yang diberikan. Nama acara, tamu, kontrak, dan pembayaran belum terhubung ke maknafinance.
      </p>
    </div>
  );
}
