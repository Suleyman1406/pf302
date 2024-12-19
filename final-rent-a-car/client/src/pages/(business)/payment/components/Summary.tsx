import SummaryImg from "@/assets/images/summary.png";
import { ReviewStar } from "@/components/shared/ReviewStar";
import { formatPrice } from "@/lib/utils";
import { Rent } from "@/types";

type Props = {
  rent: Rent;
};
export const PaymentSummary = ({ rent }: Props) => {
  const { name, images, price, discount } = rent;
  const mainImage = images[0];

  return (
    <div className="rounded-[10px] bg-white p-4 lg:p-6 h-fit lg:sticky top-[160px]">
      <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
        Rental Summary
      </h3>
      <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>

      <div className="flex items-center gap-x-4">
        <img
          src={mainImage}
          alt="Rent Picture"
          className="w-[132px] h-[108px] object-cover"
        />
        <div>
          <h2 className="text-2xl lg:text-[32px] font-bold text-secondary-500 leading-[150%] tracking-[-0.96px]">
            {name}
          </h2>
          <div className="mt-2 flex items-center gap-x-2">
            <ReviewStar rating={3} />
            <p className="text-secondary text-sm font-medium tracking-[-0.28px]">
              440+ Reviewer
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#c3d4e966] lg:my-8 my-6" />
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-secondary-500 text-lg lg:text-xl font-bold !leading-[150%] tracking-[-0.6px]">
            Total Rental Price
          </h4>
          <p className="text-sm font-medium leading-[150%] tracking-[-0.28px] text-secondary-300">
            Overall price and includes rental discount
          </p>
        </div>
        <p className="text-secondary-500 text-2xl lg:text-[32px] !leading-normal font-bold">
          {formatPrice(price - discount)}
        </p>
      </div>
    </div>
  );
};
