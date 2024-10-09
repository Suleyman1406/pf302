import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostCard } from "@/components/shared/post-card";
import { getPosts } from "@/services/posts";
import { PostsWrapper } from "./components/PostsWrapper";
import { PostsFilter } from "./components/Filter";
import { Heading } from "./components/Heading";

import { POST_QUERY_KEY } from "@/constants/query-keys";
import Spinner from "@/components/shared/spinner";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [POST_QUERY_KEY, search, sort],
      queryFn: ({ pageParam }) => getPosts({ pageParam, search, sort }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { total, page, limit } = lastPage;
        const hasMore = total > page * limit;
        return hasMore ? page + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    });

  const { pages } = data ?? {};

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 md:px-10 py-10">
      <Heading total={data?.pages?.[0]?.total ?? 0} />
      <PostsFilter />
      <PostsWrapper>
        <InfiniteScroll
          dataLength={pages?.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          hasChildren={!!pages}
          loader={
            <div className="text-center">
              <Spinner size={24} />
            </div>
          }
          endMessage={
            pages && (
              <p className="text-muted-foreground font-semibold text-sm text-center">
                Yay! You have seen it all
              </p>
            )
          }
          className="flex flex-col gap-5"
        >
          {pages?.map((page) =>
            page.data.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </InfiniteScroll>
        {isLoading && (
          <>
            <PostCard.Skeleton />
            <PostCard.Skeleton />
          </>
        )}
      </PostsWrapper>
    </div>
  );
};

export default HomePage;
