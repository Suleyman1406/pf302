import { useState } from "react";
import { ReviewStar } from "@/components/shared/ReviewStar";

import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { Button } from "@/components/ui/button";
import { Rent, Review } from "@/types";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { formatPrice } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/auth";
import { toast } from "sonner";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
//@ts-ignore
import ReactStars from "react-rating-stars-component";
import { RenderIf } from "@/components/shared/RenderIf";

type Props = {
  rent: Rent;
  reviews: Review[];
};

export const InformationSection = ({ rent, reviews }: Props) => {
  const { user } = useSelector(selectAuth);
  const { openDialog } = useDialog();
  const [isLiked, setIsLiked] = useState(false);
  const {
    _id,
    title,
    description,
    fuel,
    gear,
    capacity,
    category,
    price,
    discountPrice,
  } = rent;

  const rating = Math.round(
    reviews.reduce((acc, review) => review.rate + acc, 0) / reviews.length
  );

  return (
    <div className="bg-white rounded-[10px] p-4 lg:p-6 relative">
      <h1 className="text-secondary-500 text-2xl lg:text-[32px] !leading-[150%] tracking-[-0.96px] font-bold">
        {title}
      </h1>
      <div className="mt-2 flex items-center gap-x-2">
        <ReviewStar rating={rating} />
        <p className="text-secondary text-sm font-medium tracking-[-0.28px]">
          {reviews.length} Reviewer
        </p>
      </div>
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="h-fit absolute right-6 top-6"
      >
        <img src={isLiked ? HeartFilledImg : HeartOutlinedImg} alt="heart" />
      </button>
      <p className="min-h-[160px] my-5 lg:my-8 text-lg lg:text-xl !leading-[200%] tracking-[-0.4px] text-secondary font-normal">
        {description}
      </p>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Type Car
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {category.title}
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Capacity
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {capacity} People
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Steering
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {gear}
          </p>
        </div>
        <div className="w-[200px] flex justify-between">
          <p className="text-secondary-300 text-lg lg:text-xl font-normal leading-[150%] tracking-[-0.4px]">
            Gasoline
          </p>
          <p className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            {fuel}L
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-12 lg:mt-16">
        <div>
          <RenderIf condition={!!discountPrice}>
            <p className="text-secondary-500 text-[28px] font-bold">
              {formatPrice(discountPrice)}/{" "}
              <span className="text-base text-secondary-300">days</span>
            </p>
            <p className="line-through text-secondary-300 text-base font-bold -mt-2">
              {formatPrice(price)}
            </p>
          </RenderIf>
          <RenderIf condition={!discountPrice}>
            <p className="text-secondary-500 text-[28px] font-bold">
              {formatPrice(price)}/{" "}
              <span className="text-base text-secondary-300">days</span>
            </p>
          </RenderIf>
        </div>
        <Button asChild>
          <Link
            to={paths.PAYMENT(_id)}
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                toast.warning("Please login to rent a car");
                openDialog(DialogTypeEnum.LOGIN);
              }
            }}
          >
            Rent Now
          </Link>
        </Button>
      </div>
    </div>
  );
};
