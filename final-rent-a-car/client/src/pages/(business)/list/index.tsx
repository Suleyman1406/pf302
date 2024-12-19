import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RentCard } from "@/components/shared/rent-card";
import { RenderIf } from "@/components/shared/RenderIf";
import { Filters } from "./components/Filters";
import { LIST_TAKE_COUNT } from "@/constants";
import { useSearchParams } from "react-router-dom";

export const RentListPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="grid xl:grid-cols-[360px,1fr]">
      <ScrollToTop />
      <Filters />
      <div className="bg-white" />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 pt-6 lg:pt-8 px-6 lg:px-8 pb-10">
        <AvailabilityFilter />
        <InfiniteScroll
          dataLength={0}
          next={() => {}}
          hasMore={false}
          loader={
            <div className="flex flex-col items-center w-60 mx-auto gap-x-3 text-muted-foreground mt-4">
              <ClipLoader />
              <p>Loading more items...</p>
            </div>
          }
          endMessage={
            <RenderIf condition={false}>
              <p className="mt-4 text-center text-muted-foreground">
                No more items to show
              </p>
            </RenderIf>
          }
        >
          <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ">
            <RenderIf condition={false}>
              {[...Array(LIST_TAKE_COUNT)].map((_, index) => (
                <RentCard.Skeleton key={index} />
              ))}
            </RenderIf>

            {/* {rents.map((rent) => (
              <RentCard key={rent._id} rent={rent} />
            ))} */}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
