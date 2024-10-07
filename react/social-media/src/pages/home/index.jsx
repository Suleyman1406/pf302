import React from "react";
import { Heading } from "./components/Heading";
import { PostCard } from "@/components/shared/post-card";
import { PostsWrapper } from "./components/PostsWrapper";
import { useInfiniteQuery } from "@tanstack/react-query";
import { POST_QUERY_KEY } from "@/constants/query-keys";
import { getPosts } from "@/services/posts";
import { Button } from "@/components/ui/button";
import { PostsFilter } from "./components/Filter";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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
    <div className="mx-auto max-w-screen-lg px-4 md:px-10 py-10 bg-gray-100">
      <Heading total={data?.pages?.[0]?.total ?? 0} />
      <PostsFilter />
      <PostsWrapper>
        {pages?.map((page) =>
          page.data.map((post) => <PostCard key={post.id} post={post} />)
        )}
        {isLoading && (
          <>
            <PostCard.Skeleton />
            <PostCard.Skeleton />
          </>
        )}
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </PostsWrapper>
    </div>
  );
};

export default HomePage;
