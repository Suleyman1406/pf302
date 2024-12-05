import { getUserInvites } from "@/services/invites";
import React, { useEffect } from "react";
import { Heading } from "./components/Heading";
import { useSearchParams } from "react-router-dom";
import { USER_QUERY_KEY } from "@/constants/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UsersWrapper } from "./components/UsersWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/shared/spinner";
import { searchUsers } from "@/services/users";
import UserCard from "./components/UserCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [USER_QUERY_KEY, search],
      queryFn: ({ pageParam }) => {
        return searchUsers({ pageParam, search });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { count, page, limit } = lastPage;
        const hasMore = count > page * limit;
        return hasMore ? page + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (search) {
      fetchNextPage();
    }
  }, [search, fetchNextPage]);

  const { pages } = data ?? {};

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log("pages", pages);

  return (
    <div className="mx-auto max-w-screen-lg px-4 md:px-10 py-10">
      <Heading total={pages && pages[0]?.count} />
      <UsersWrapper>
        <InfiniteScroll
          dataLength={pages?.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner size={24} />}
          endMessage={
            <p className="text-muted-foreground font-semibold text-sm text-center mt-5">
              Yay! You have seen it all
            </p>
          }
        >
          <div className="flex flex-col gap-5">
            {pages?.map((page) => {
              return page?.items?.map((user) => (
                <UserCard key={user._id} user={user} />
              ));
            })}
          </div>
        </InfiniteScroll>
      </UsersWrapper>
    </div>
  );
};

export default SearchPage;
