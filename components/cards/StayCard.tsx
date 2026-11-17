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
    <article
      data-type={stay.type}
      className="overflow-hidden rounded-2xl border border-line bg-white min-[720px]:row-span-2"
    >
      <div className="relative aspect-video [&>svg]:size-full">
        <Art name={stay.art} />
        <span
          aria-hidden="true"
          className="absolute top-2.5 right-3 grid size-[30px] place-items-center rounded-full bg-white text-base"
        >
          ♡
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
        <p className="text-[11px] font-bold tracking-[0.07em] text-stay uppercase">
          Stay · {stay.Neighbourhood}
        </p>
        <h3 className="text-[22px] leading-tight font-bold text-balance">
          {stay["Listing Title"]}
        </h3>
        <p className="text-[13px] text-muted">
          {stay["Property Type"]} · Hosted by {stay["Host First Name"]}
        </p>
        <p className="text-[13px] text-muted">{stay.Highlight}</p>
        <p className="mt-1 self-start rounded-lg bg-stay-soft px-2.5 py-1 text-[12.5px] font-semibold text-stay">
          {formatDates(stay["Check-in Date"], stay["Check-out Date"])} ·{" "}
          {stay.Nights} nights
        </p>
        <div className="mt-2 flex flex-wrap justify-between gap-x-3 gap-y-1 border-t border-line pt-3 text-sm tabular-nums">
          <p>
            <strong>${stay["Price per Night (USD)"]}</strong> night
            <span className="text-muted">
              {" "}
              · ${stay["Total for 2 Nights (USD)"]} total
            </span>
          </p>
          <p>
            <span className="text-stay">★</span>{" "}
            {stay["Guest Rating"].toFixed(2)}
            <span className="text-muted"> ({stay["Review Count"]})</span>
          </p>
        </div>
      </div>
    </article>
  );
}
