import { cx } from "@/lib/cx";

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "default",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "default" | "on-lilac";
}) {
  const onLilac = tone === "on-lilac";

  return (
    <div className="min-w-0 max-w-[65ch]">
      <p className={cx("text-xs font-semibold tracking-[0.16em] uppercase", onLilac ? "text-ink" : "text-brand")}>
        {eyebrow}
      </p>
      <h2
        id={id}
        tabIndex={-1}
        className="mt-3 scroll-mt-28 font-display text-[length:var(--type-heading)] leading-[1.12] break-words text-balance outline-offset-4"
      >
        {title}
      </h2>
      {intro ? (
        <p className={cx("mt-4 max-w-[65ch] text-[length:var(--type-body)] leading-[1.65]", onLilac ? "text-ink" : "text-muted")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
