import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RentCard } from "@/components/shared/rent-card";
import { RenderIf } from "@/components/shared/RenderIf";
import { Filters } from "./components/Filters";
import { LIST_TAKE_COUNT } from "@/constants";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import rentService from "@/services/rent";
import { Rent } from "@/types";

export const RentListPage = () => {
  const [searchParams] = useSearchParams();
  const dropOffLocation = searchParams.get("dropoff_location");
  const pickUpLocation = searchParams.get("pickup_location");
  const pickUpDate = searchParams.get("pickup_date");
  const dropOffDate = searchParams.get("dropoff_date");
  const categories = searchParams.getAll("category");
  const capacities = searchParams.getAll("capacity");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const search = searchParams.get("search");

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.RENT_LIST, searchParams.toString()],
    queryFn: ({ pageParam }) =>
      rentService.getAll({
        skip: pageParam,
        take: 12,
        dropOffLocation,
        pickUpLocation,
        categories,
        capacities,
        maxPrice,
        minPrice,
        search,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasmore =
        lastPage.data.count > lastPage.data.skip + lastPage.data.take;

      if (hasmore) {
        return lastPage.data.skip + lastPage.data.take;
      }
    },
  });

  const rents =
    data?.pages.reduce(
      (prev, page) => [...prev, ...page.data.items],
      [] as Rent[]
    ) || [];

  return (
    <div className="grid xl:grid-cols-[360px,1fr]">
      <ScrollToTop />
      <Filters />
      <div className="bg-white" />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 pt-6 lg:pt-8 px-6 lg:px-8 pb-10">
        <AvailabilityFilter />
        <InfiniteScroll
          dataLength={rents.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
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
            <RenderIf condition={isLoading}>
              {[...Array(LIST_TAKE_COUNT)].map((_, index) => (
                <RentCard.Skeleton key={index} />
              ))}
            </RenderIf>
            {rents.map((rent) => (
              <RentCard key={rent._id} rent={rent} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
