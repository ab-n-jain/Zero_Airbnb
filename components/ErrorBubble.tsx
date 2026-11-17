// The assistant's reply when an answer cannot become cards.
// Wording, button and look follow the Assistant Bubble Error Message
// Guidelines: same shape and position as a normal reply, neutral colours,
// no red, one primary action inside the bubble. Built with Tailwind CSS.
// The thread it sits in is the polite live region, so screen readers
// announce the message when it appears.
export default function ErrorBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-[min(520px,88%)] rounded-[18px] rounded-bl-[6px] border border-gray-200 bg-white px-3.5 py-2.5 text-gray-800">
      <p className="font-semibold">
        We couldn&apos;t put your Kyoto weekend together.
      </p>
      <p>Your request is saved, so you can try again.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 min-h-[44px] w-full cursor-pointer appearance-none rounded-full border-0 bg-[var(--ink)] px-4 py-2.5 font-[inherit] text-[15px] font-semibold text-white focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Try again
      </button>
    </div>
  );
}
