import type { Food } from "@/lib/types";
import { FILLER } from "@/lib/sampleReply";
import Art from "./Art";

const PILL = "rounded-full border px-[9px] py-[3px] text-xs";

// Food spot: round image box on the right, cuisine is the biggest text, amber accent.
export default function FoodCard({ food }: { food: Food }) {
  return (
    <article
      data-type={food.type}
      className="flex flex-col overflow-hidden rounded-2xl border border-food-line bg-food-soft"
    >
      <div className="flex flex-1 items-center gap-3 px-4 pt-3.5 pb-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[11px] font-bold tracking-[0.07em] text-food uppercase">
            Food spot · {food.Neighbourhood} · {food.Meal}
          </p>
          <h3 className="font-serif text-2xl leading-[1.15] font-bold">
            {food.Cuisine}
          </h3>
          <p className="text-[13px] text-muted">at {food["Place Name"]}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className={`${PILL} border-food-solid bg-food-solid font-bold`}>
              {food["Price Level"]}
            </span>
            <span className={`${PILL} border-food-line bg-white`}>
              About ${food["Est. Cost for 2 (USD)"]} for 2
            </span>
            <span className={`${PILL} border-food-line bg-white`}>
              {food["Walk from Stay (min)"]} min walk
            </span>
          </div>
        </div>
        <div className="size-[92px] flex-none overflow-hidden rounded-full border-[3px] border-food-solid [&>svg]:size-full">
          <Art name={food.art} />
        </div>
      </div>
      <p className="border-t border-dashed border-food-line px-4 pt-2.5 pb-3 text-[13px] text-food">
        <strong>Booking:</strong> {food["Booking Note"] ?? FILLER}
      </p>
    </article>
  );
}
