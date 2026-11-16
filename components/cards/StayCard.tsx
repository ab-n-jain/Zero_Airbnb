import type { Stay } from "@/lib/types";
import Art from "./Art";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2025-04-11", "2025-04-13" -> "11 – 13 Apr"
function formatDates(checkIn: string, checkOut: string) {
  const [, inMonth, inDay] = checkIn.split("-").map(Number);
  const [, outMonth, outDay] = checkOut.split("-").map(Number);
  const start = inMonth === outMonth ? `${inDay}` : `${inDay} ${MONTHS[inMonth - 1]}`;
  return `${start} – ${outDay} ${MONTHS[outMonth - 1]}`;
}

// Stay: image box on top at full width, listing title is the biggest text, rose accent.
export default function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className="card stay-card" data-type={stay.type}>
      <div className="stay-image">
        <Art name={stay.art} />
        <span className="stay-heart" aria-hidden="true">
          ♡
        </span>
      </div>
      <div className="stay-body">
        <p className="card-label stay-label">Stay · {stay.Neighbourhood}</p>
        <h3 className="stay-name">{stay["Listing Title"]}</h3>
        <p className="card-meta">
          {stay["Property Type"]} · Hosted by {stay["Host First Name"]}
        </p>
        <p className="card-meta">{stay.Highlight}</p>
        <p className="stay-dates">
          {formatDates(stay["Check-in Date"], stay["Check-out Date"])} ·{" "}
          {stay.Nights} nights
        </p>
        <div className="stay-footer">
          <p>
            <strong>${stay["Price per Night (USD)"]}</strong> night
            <span className="card-muted">
              {" "}
              · ${stay["Total for 2 Nights (USD)"]} total
            </span>
          </p>
          <p>
            <span className="stay-star">★</span>{" "}
            {stay["Guest Rating"].toFixed(2)}
            <span className="card-muted"> ({stay["Review Count"]})</span>
          </p>
        </div>
      </div>
    </article>
  );
}
