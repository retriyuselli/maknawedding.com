import "./biodata-sheet.css";

type Row = { label: string; value: string; href?: string };

type Person = {
  side: string;
  name: string;
  nick: string;
  identity: Row[];
  life: Row[];
};

const identityLabels = ["Nama Lengkap", "Nama Panggilan", "Tempat Tgl Lahir", "Alamat Domisili", "No. Telp", "Username Instagram"];
const lifeLabels = ["SMA", "Perguruan Tinggi", "Pekerjaan", "Anak Ke-", "Nama Ayah", "Asal Daerah Ayah", "Nama Ibu", "Asal Daerah Ibu"];

function rows(labels: string[], values: string[], hrefs: Record<string, string> = {}): Row[] {
  return labels.map((label, index) => ({
    label,
    value: values[index],
    href: hrefs[label],
  }));
}

export const couplePeople: Person[] = [
  {
    side: "Pihak laki-laki",
    name: "Muhammad Zuhri",
    nick: "Uyi",
    identity: rows(
      identityLabels,
      ["Muhammad Zuhri", "Uyi", "Palembang, 26 September 2001", "Jalan Serda Kko Usman Ali No.4", "08117821771", "@uyimuhammad"],
      { "No. Telp": "tel:08117821771", "Username Instagram": "https://instagram.com/uyimuhammad" },
    ),
    life: rows(lifeLabels, [
      "SMAN 5 Palembang",
      "Universitas Sriwijaya",
      "Pegawai Swasta",
      "2 dari 2 bersaudara",
      "Hendry Wijaya",
      "Komering",
      "Dewi Mardianti",
      "Rejang Lebong (Curup)",
    ]),
  },
  {
    side: "Pihak perempuan",
    name: "Rosa Ustiani",
    nick: "Oca",
    identity: rows(
      identityLabels,
      ["Rosa Ustiani", "Oca", "Palembang, 17 Juni 1999", "Jl. Letnan Hadin", "082254665658", "@ingacaca"],
      { "No. Telp": "tel:082254665658", "Username Instagram": "https://instagram.com/ingacaca" },
    ),
    life: rows(lifeLabels, [
      "SMAN 3 Palembang",
      "Universitas Sriwijaya",
      "Pegawai Swasta",
      "2 dari 2 Bersaudara",
      "Usman Saleh",
      "Pedamaran, Ogan Ilir",
      "Salasin Tabranti",
      "Bintuhan, Bengkulu Selatan",
    ]),
  },
];

export function BiodataSheet() {
  return (
    <div className="couple">
      {couplePeople.map((person) => (
        <article key={person.side} className="person" data-side={person.side === "Pihak perempuan" ? "wanita" : "pria"}>
          <h2>{person.side}</h2>
          <section>
            <h3>Data Diri</h3>
            <dl>
              {person.identity.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.href ? <a href={row.href} rel="noreferrer">{row.value}</a> : row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h3>Riwayat Hidup</h3>
            <dl>
              {person.life.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      ))}
    </div>
  );
}
