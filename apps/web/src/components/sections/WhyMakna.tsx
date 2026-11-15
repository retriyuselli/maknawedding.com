const strengths = [
  ["♔", "Tim berpengalaman", "Pendampingan sejak pertemuan pertama hingga acara selesai."],
  ["✧", "Konsep personal", "Desain yang berangkat dari cerita dan selera Anda."],
  ["◇", "Koordinasi terarah", "Satu alur kerja untuk tim, keluarga, dan vendor."],
  ["♡", "Dukungan penuh", "Ruang untuk menikmati momen bersama orang terdekat."],
];

export function WhyMakna() {
  return (
    <section className="home-shell home-section" aria-labelledby="why-makna">
      <h2 id="why-makna">Why Choose Makna?</h2>
      <ul className="strength-grid">
        {strengths.map(([icon, title, description]) => <li key={title}><span aria-hidden>{icon}</span><h3>{title}</h3><p>{description}</p></li>)}
      </ul>
    </section>
  );
}
