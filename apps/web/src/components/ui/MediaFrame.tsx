import Image from "next/image";
import { cx } from "@/lib/cx";
import type { MediaPlaceholder } from "@/lib/home-content";

const tones: Record<MediaPlaceholder["tone"], string> = {
  dusk: "bg-[linear-gradient(165deg,#2E2544_0%,#52446E_46%,#D9C8F0_140%)] text-lilac",
  lilac: "bg-[linear-gradient(180deg,#D9C8F0_0%,#F7F5EE_100%)] text-ink/45",
  sage: "bg-[linear-gradient(165deg,#A8BFA3_0%,#F7F5EE_78%)] text-ink/45",
  rose: "bg-[linear-gradient(165deg,#D8A79A_0%,#F7F5EE_78%)] text-ink/45",
  ivory: "bg-ivory text-ink/40",
};

export function MediaFrame({
  media,
  className,
  priority = false,
}: {
  media: MediaPlaceholder;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cx("relative min-w-0 overflow-hidden", className)}>
      <div aria-hidden className={cx("absolute inset-0", tones[media.tone])} />
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={media.sizes ?? "100vw"}
          className="object-cover"
        />
      ) : (
        <PlaceholderArt />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(91,108,255,0.28),transparent_36%)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
        <span className="inline-block max-w-full rounded-2xl bg-ink px-3 py-2 text-sm leading-relaxed break-words text-paper">
          {media.caption}
        </span>
      </figcaption>
    </figure>
  );
}

function PlaceholderArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 260"
      className="absolute top-[16%] left-1/2 h-[58%] w-auto -translate-x-1/2"
      fill="none"
    >
      <path
        d="M46 214V128c0-36 24-66 54-66s54 30 54 66v86"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="100" cy="116" r="16" stroke="currentColor" strokeWidth="1.4" />
      <path d="M78 214h44" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
