"use client";

import { useEffect, useRef, useState } from "react";
import type { PlanReply } from "@/lib/types";
import { isPlanReply } from "@/lib/validateReply";
import { ASSISTANT_BUBBLE, ASSISTANT_COLOURS } from "./bubble";
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

// Keyboard focus outline shared by the chat's controls.
const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

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
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 border-b border-line bg-white px-5 py-3">
        <div
          aria-hidden="true"
          className="grid size-9 flex-none place-items-center rounded-full bg-ink text-[17px] text-white"
        >
          京
        </div>
        <div>
          <h1 className="text-base font-[650]">Kyoto weekend planner</h1>
          <p className="text-[12.5px] text-muted">11 – 13 Apr · sample data</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={forceFail}
          onClick={() => setForceFail((on) => !on)}
          className={`ml-auto inline-flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1.5 text-[13px] whitespace-nowrap ${FOCUS} ${
            forceFail ? "text-ink" : "text-muted"
          }`}
        >
          <span
            aria-hidden="true"
            className={`inline-flex h-5 w-[34px] rounded-full p-0.5 transition-colors ${
              forceFail ? "bg-ink" : "bg-line"
            }`}
          >
            <span
              className={`size-4 rounded-full bg-white transition-transform ${
                forceFail ? "translate-x-3.5" : ""
              }`}
            />
          </span>
          Force failure
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5" aria-live="polite">
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-3">
          <div className="flex">
            <div className={`${ASSISTANT_BUBBLE} ${ASSISTANT_COLOURS}`}>
              Tell me what kind of Kyoto weekend you want. I&apos;ll bring back
              one stay, one experience and one place to eat.
            </div>
          </div>

          {turns.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className={`cursor-pointer rounded-full border border-line bg-white px-3.5 py-2 text-[13.5px] hover:border-ink ${FOCUS}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {turns.map((turn) => (
            <div key={turn.id} data-turn className="flex flex-col gap-3">
              <div className="flex justify-end">
                <div
                  data-guest-bubble
                  className="max-w-[min(520px,88%)] rounded-[18px] rounded-br-md bg-ink px-3.5 py-2.5 text-white"
                >
                  {turn.message}
                </div>
              </div>

              <div className="flex">
                {turn.status === "thinking" && <ThinkingBubble />}

                {turn.status === "failed" && (
                  <ErrorBubble onRetry={() => retry(turn)} />
                )}

                {turn.status === "done" && turn.reply && (
                  <div className="flex w-full flex-col items-start gap-3">
                    <div className={`${ASSISTANT_BUBBLE} ${ASSISTANT_COLOURS}`}>
                      {turn.reply.intro}
                    </div>
                    <div className="grid w-full grid-cols-1 gap-3 min-[720px]:grid-cols-2">
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
        className="border-t border-line bg-white px-4 pt-3 pb-4"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <div className="mx-auto flex w-full max-w-[760px] gap-2">
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              locked ? "Planning your weekend…" : "Describe your Kyoto weekend"
            }
            aria-label="Trip request"
            disabled={locked}
            className={`min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-3 placeholder:text-muted disabled:cursor-not-allowed disabled:text-muted ${FOCUS}`}
          />
          <button
            type="submit"
            disabled={locked || draft.trim() === ""}
            className={`cursor-pointer rounded-full bg-ink px-[22px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35 ${FOCUS}`}
          >
            Send
          </button>
        </div>
        <p
          data-sample-note
          className="mx-auto mt-2 max-w-[760px] text-center text-xs text-muted"
        >
          These trips are sample data for a prototype. Nothing is booked.
        </p>
      </form>
    </div>
  );
}
