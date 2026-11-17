import { ASSISTANT_BUBBLE } from "./bubble";

// The assistant's reply when an answer cannot become cards.
// Wording, button and look follow the Assistant Bubble Error Message
// Guidelines: same shape and position as a normal reply, neutral colours,
// no red, one primary action inside the bubble.
// The thread it sits in is the polite live region, so screen readers
// announce the message when it appears.
export default function ErrorBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      data-error-bubble
      className={`${ASSISTANT_BUBBLE} border-gray-200 bg-white text-gray-800`}
    >
      <p className="font-semibold">
        We couldn&apos;t put your Kyoto weekend together.
      </p>
      <p>Your request is saved, so you can try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 min-h-[44px] w-full cursor-pointer rounded-full bg-ink px-4 py-2.5 font-semibold text-white focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Try again
      </button>
    </div>
  );
}
