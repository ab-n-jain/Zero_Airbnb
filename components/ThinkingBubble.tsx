import { ASSISTANT_BUBBLE, ASSISTANT_COLOURS } from "./bubble";

const DOT =
  "size-2 rounded-full bg-ink animate-dot motion-reduce:[animation-duration:2.2s]";

export default function ThinkingBubble() {
  return (
    <div
      role="status"
      className={`${ASSISTANT_BUBBLE} ${ASSISTANT_COLOURS} flex items-center gap-2.5 text-[13.5px] text-muted`}
    >
      <span className="inline-flex gap-[5px]" aria-hidden="true" data-dots>
        <span className={DOT} />
        <span className={`${DOT} [animation-delay:150ms]`} />
        <span className={`${DOT} [animation-delay:300ms]`} />
      </span>
      <span>Putting your weekend together…</span>
    </div>
  );
}
