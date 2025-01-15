import { Review as TReview } from "@/types";
import { Review } from "./Review";

type Props = {
  reviews: TReview[];
};
export const ReviewsSection = ({ reviews }: Props) => {
  if (reviews.length === 0) return null;

  return (
    <div className="my-6 lg:my-8 bg-white rounded-[10px] p-5 lg:p-6">
      <div className="flex items-center gap-x-3">
        <h3 className="lg:text-xl text-lg font-semibold tracking-[-0.4px] text-secondary">
          Review
        </h3>
        <div className="py-1.5 px-3 bg-primary rounded text-white font-bold text-sm">
          {reviews.length}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 lg:gap-y-6 mt-6 lg:mt-8">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
