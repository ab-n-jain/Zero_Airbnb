import type { Experience } from "@/lib/types";
import { FILLER } from "@/lib/sampleReply";
import Art from "./Art";

// Experience: image box on the left, start time is the biggest text, teal accent.
export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <article className="card experience-card" data-type={experience.type}>
      <div className="experience-image">
        <Art name={experience.art} />
      </div>
      <div className="experience-body">
        <p className="card-label experience-label">
          Experience · {experience.day}
        </p>
        <p className="experience-time">{experience.startTime}</p>
        <h3 className="experience-name">{experience.name}</h3>
        <p className="card-meta">
          {experience.duration} · {experience.category} · Hosted by{" "}
          {experience.host ?? FILLER}
        </p>
        <p className="card-meta">Meet: {experience.meetingPoint}</p>
        <p className="experience-footer">
          <span>
            From <strong>${experience.pricePerGuest}</strong> / guest
          </span>
          <span>
            <span className="experience-star">★</span>{" "}
            {experience.rating.toFixed(2)}
            <span className="card-muted">
              {" "}
              ({experience.reviews ?? `reviews: ${FILLER.toLowerCase()}`})
            </span>
          </span>
        </p>
        <p className="experience-availability">{experience.availability}</p>
      </div>
    </article>
  );
}
