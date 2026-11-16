export default function ThinkingBubble() {
  return (
    <div className="bubble bubble-assistant thinking" role="status">
      <span className="dots" aria-hidden="true">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </span>
      <span className="thinking-status">Putting your weekend together…</span>
    </div>
  );
}
