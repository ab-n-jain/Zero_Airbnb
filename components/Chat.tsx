"use client";

import { useEffect, useRef, useState } from "react";
import type { PlanReply } from "@/lib/types";
import { isPlanReply } from "@/lib/validateReply";
import ErrorBubble from "./ErrorBubble";
import ThinkingBubble from "./ThinkingBubble";
import StayCard from "./cards/StayCard";
import ExperienceCard from "./cards/ExperienceCard";
import FoodCard from "./cards/FoodCard";

type Turn = {
  id: number;
  message: string;
  status: "thinking" | "done" | "failed";
  reply?: PlanReply;
};

const REQUEST_TIMEOUT_MS = 12_000;

const SUGGESTIONS = [
  "Budget solo trip, I want great ramen",
  "Quiet weekend for two near Gion",
];

export default function Chat() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [forceFail, setForceFail] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const locked = turns.some((turn) => turn.status === "thinking");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  useEffect(() => {
    if (!locked) inputRef.current?.focus();
  }, [locked]);

  function send(text: string) {
    const message = text.trim();
    if (!message || locked) return;

    const id = nextId.current++;
    // The guest's bubble and the thinking bubble appear in the same render.
    setTurns((prev) => [...prev, { id, message, status: "thinking" }]);
    setDraft("");
    // Force failure breaks one request, then switches itself off.
    const breakThisOne = forceFail;
    setForceFail(false);
    void requestPlan(id, message, breakThisOne);
  }

  // Try again: the error bubble becomes the thinking bubble in place, and the
  // same message is sent again without the broken answer.
  function retry(turn: Turn) {
    if (locked) return;
    setTurns((prev) =>
      prev.map((item) =>
        item.id === turn.id ? { ...item, status: "thinking" } : item,
      ),
    );
    void requestPlan(turn.id, turn.message, false);
  }

  async function requestPlan(id: number, message: string, breakThisOne: boolean) {
    let update: Partial<Turn>;
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, forceFail: breakThisOne }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`Planner replied ${response.status}`);
      const data: unknown = await response.json();
      // A broken answer cannot become cards, so it counts as a failure.
      if (!isPlanReply(data)) throw new Error("Planner answer is incomplete");
      update = { status: "done", reply: data };
    } catch {
      // Whatever went wrong, the guest only ever sees the error bubble.
      update = { status: "failed" };
    }
    setTurns((prev) =>
      prev.map((turn) => (turn.id === id ? { ...turn, ...update } : turn)),
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-mark" aria-hidden="true">
          京
        </div>
        <div>
          <h1 className="header-title">Kyoto weekend planner</h1>
          <p className="header-sub">11 – 13 Apr · sample data</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={forceFail}
          className="force-switch"
          onClick={() => setForceFail((on) => !on)}
        >
          <span className="force-track" aria-hidden="true">
            <span className="force-thumb" />
          </span>
          Force failure
        </button>
      </header>

      <main className="thread" aria-live="polite">
        <div className="thread-inner">
          <div className="row row-assistant">
            <div className="bubble bubble-assistant">
              Tell me what kind of Kyoto weekend you want. I'll bring back one
              stay, one experience and one place to eat.
            </div>
          </div>

          {turns.length === 0 && (
            <div className="suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chip"
                  onClick={() => send(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {turns.map((turn) => (
            <div key={turn.id} className="turn">
              <div className="row row-guest">
                <div className="bubble bubble-guest">{turn.message}</div>
              </div>

              <div className="row row-assistant">
                {turn.status === "thinking" && <ThinkingBubble />}

                {turn.status === "failed" && (
                  <ErrorBubble onRetry={() => retry(turn)} />
                )}

                {turn.status === "done" && turn.reply && (
                  <div className="reply">
                    <div className="bubble bubble-assistant">
                      {turn.reply.intro}
                    </div>
                    <div className="cards">
                      <StayCard stay={turn.reply.stay} />
                      <ExperienceCard experience={turn.reply.experience} />
                      <FoodCard food={turn.reply.food} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </main>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <div className="composer-inner">
          <input
            ref={inputRef}
            className="composer-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              locked ? "Planning your weekend…" : "Describe your Kyoto weekend"
            }
            aria-label="Trip request"
            disabled={locked}
          />
          <button
            className="composer-send"
            type="submit"
            disabled={locked || draft.trim() === ""}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
