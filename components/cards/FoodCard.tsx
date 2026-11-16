import type { Food } from "@/lib/types";
import { FILLER } from "@/lib/sampleReply";
import Art from "./Art";

// Food spot: round image box on the right, cuisine is the biggest text, amber accent.
export default function FoodCard({ food }: { food: Food }) {
  return (
    <article className="card food-card" data-type={food.type}>
      <div className="food-top">
        <div className="food-body">
          <p className="card-label food-label">
            Food spot · {food.Neighbourhood} · {food.Meal}
          </p>
          <h3 className="food-dish">{food.Cuisine}</h3>
          <p className="card-meta">at {food["Place Name"]}</p>
          <div className="food-pills">
            <span className="food-pill food-pill-solid">
              {food["Price Level"]}
            </span>
            <span className="food-pill">
              About ${food["Est. Cost for 2 (USD)"]} for 2
            </span>
            <span className="food-pill">
              {food["Walk from Stay (min)"]} min walk
            </span>
          </div>
        </div>
        <div className="food-image">
          <Art name={food.art} />
        </div>
      </div>
      <p className="food-tip">
        <strong>Booking:</strong> {food["Booking Note"] ?? FILLER}
      </p>
    </article>
  );
}
