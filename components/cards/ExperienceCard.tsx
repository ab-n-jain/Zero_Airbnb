import type { Experience } from "@/lib/types";
import { FILLER } from "@/lib/sampleReply";
import Art from "./Art";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2025-04-12" -> "12 Apr"
function formatDay(date: string) {
  const [, month, day] = date.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]}`;
}

// "10:30" -> "10:30 AM", "14:00" -> "2:00 PM"
function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour < 12 ? "AM" : "PM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

// Experience: image box on the left, start time is the biggest text, teal accent.
export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  const hours = experience["Duration (hours)"];
  return (
    <article
      data-type={experience.type}
      className="grid grid-cols-[38%_1fr] overflow-hidden rounded-2xl border border-line bg-white"
    >
      <div className="min-h-[150px] [&>svg]:size-full">
        <Art name={experience.art} />
      </div>
      <div className="flex min-w-0 flex-col gap-1 px-4 py-3.5">
        <p className="text-[11px] font-bold tracking-[0.07em] text-exp uppercase">
          Experience · {formatDay(experience.Date)}
        </p>
        <p className="text-[28px] leading-[1.1] font-extrabold text-exp tabular-nums">
          {formatTime(experience["Start Time"])}
        </p>
        <h3 className="text-[14.5px] leading-[1.3] font-[650]">
          {experience["Experience Title"]}
        </h3>
        <p className="text-[13px] text-muted">
          {hours} {hours === 1 ? "hr" : "hrs"} · {experience.Category} · Hosted
          by {experience["Host First Name"] ?? FILLER.toLowerCase()}
        </p>
        <p className="text-[13px] text-muted">
          Meet: {experience["Meeting Point"]}
        </p>
        <p className="mt-1.5 flex flex-wrap justify-between gap-x-2.5 gap-y-0.5 text-[13px] tabular-nums">
          <span>
            <strong>${experience["Price per Guest (USD)"]}</strong> / guest
            <span className="text-muted">
              {" "}
              · ${experience["Total for 2 Guests (USD)"]} for 2
            </span>
          </span>
          <span>
            <span className="text-exp">★</span> {experience.Rating.toFixed(2)}
          </span>
        </p>
        <p className="mt-1 self-start rounded-full bg-exp-soft px-[9px] py-0.5 text-xs font-semibold text-exp">
          {experience.Availability}
        </p>
      </div>
    </article>
  );
}
