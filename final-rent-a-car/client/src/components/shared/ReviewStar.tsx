import StarFilledImg from "@/assets/icons/star-filled.svg";
import StarOutlinedImg from "@/assets/icons/star-outlined.svg";

type Props = {
  rating: number;
};

export const ReviewStar = ({ rating }: Props) => {
  return (
    <div className="flex gap-x-1.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= Math.round(rating)) {
          return <img key={star} src={StarFilledImg} alt="star" />;
        }
        return <img key={star} src={StarOutlinedImg} alt="star" />;
      })}
    </div>
  );
};
