import type { Food } from "@/lib/types";
import { FILLER } from "@/lib/sampleReply";
import Art from "./Art";

// Food spot: round image box on the right, signature dish is the biggest text, amber accent.
export default function FoodCard({ food }: { food: Food }) {
  return (
    <article className="card food-card" data-type={food.type}>
      <div className="food-top">
        <div className="food-body">
          <p className="card-label food-label">
            Food spot · {food.area} · {food.meal}
          </p>
          <h3 className="food-dish">{food.dish ?? `Dish: ${FILLER.toLowerCase()}`}</h3>
          <p className="card-meta">at {food.place}</p>
          <div className="food-pills">
            <span className="food-pill food-pill-solid">{food.priceBand}</span>
            <span className="food-pill">{food.cuisine}</span>
            <span className="food-pill">{food.walkFromStay}</span>
          </div>
        </div>
        <div className="food-image">
          <Art name={food.art} />
        </div>
      </div>
      <p className="food-tip">
        <strong>Tip:</strong> {food.tip ?? FILLER}
      </p>
    </article>
  );
}
