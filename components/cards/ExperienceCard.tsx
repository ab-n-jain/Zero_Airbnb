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
    <article className="card experience-card" data-type={experience.type}>
      <div className="experience-image">
        <Art name={experience.art} />
      </div>
      <div className="experience-body">
        <p className="card-label experience-label">
          Experience · {formatDay(experience.Date)}
        </p>
        <p className="experience-time">
          {formatTime(experience["Start Time"])}
        </p>
        <h3 className="experience-name">{experience["Experience Title"]}</h3>
        <p className="card-meta">
          {hours} {hours === 1 ? "hr" : "hrs"} · {experience.Category} · Hosted
          by {experience["Host First Name"] ?? FILLER.toLowerCase()}
        </p>
        <p className="card-meta">Meet: {experience["Meeting Point"]}</p>
        <p className="experience-footer">
          <span>
            <strong>${experience["Price per Guest (USD)"]}</strong> / guest
            <span className="card-muted">
              {" "}
              · ${experience["Total for 2 Guests (USD)"]} for 2
            </span>
          </span>
          <span>
            <span className="experience-star">★</span>{" "}
            {experience.Rating.toFixed(2)}
          </span>
        </p>
        <p className="experience-availability">{experience.Availability}</p>
      </div>
    </article>
  );
}
