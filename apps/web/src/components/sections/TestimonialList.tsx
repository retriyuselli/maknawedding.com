import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/home-content";

export function TestimonialList() {
  return (
    <section className="py-(--section-space)" aria-labelledby="testimoni">
      <Reveal className="mx-auto w-full max-w-(--layout-max) px-(--layout-gutter)">
        <SectionHeading
          id="testimoni"
          eyebrow="Testimoni"
          title="Tempat untuk kata-kata yang sudah diizinkan"
          intro="Kartu di bawah adalah contoh susunan. Kutipan klien baru dipasang setelah persetujuan tercatat."
        />
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.quote} className="flex min-w-0 flex-col rounded-card border border-ink/10 bg-paper p-5 sm:p-6">
              <span data-reveal-media aria-hidden className="font-display text-5xl leading-none text-lilac">
                “
              </span>
              <blockquote className="mt-3 flex-1 text-[length:var(--type-body)] leading-[1.65]">{item.quote}</blockquote>
              <footer className="mt-6 text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-muted">{item.context}</p>
              </footer>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
