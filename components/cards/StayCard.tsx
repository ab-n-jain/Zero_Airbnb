import type { Stay } from "@/lib/types";
import Art from "./Art";

// Stay: image box on top at full width, stay name is the biggest text, rose accent.
export default function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className="card stay-card" data-type={stay.type}>
      <div className="stay-image">
        <Art name={stay.art} />
        {stay.guestFavorite && (
          <span className="stay-favorite">Guest favorite</span>
        )}
        <span className="stay-heart" aria-hidden="true">
          ♡
        </span>
      </div>
      <div className="stay-body">
        <p className="card-label stay-label">Stay · {stay.area}</p>
        <h3 className="stay-name">{stay.name}</h3>
        <p className="card-meta">
          {stay.kind} · Hosted by {stay.host}
        </p>
        <p className="card-meta">{stay.perks.join(" · ")}</p>
        <p className="stay-dates">
          {stay.dates} · {stay.nights} nights
        </p>
        <div className="stay-footer">
          <p>
            <strong>${stay.pricePerNight}</strong> night
            <span className="card-muted"> · ${stay.total} total</span>
          </p>
          <p>
            <span className="stay-star">★</span> {stay.rating.toFixed(2)}
            <span className="card-muted"> ({stay.reviews})</span>
          </p>
        </div>
      </div>
    </article>
  );
}
