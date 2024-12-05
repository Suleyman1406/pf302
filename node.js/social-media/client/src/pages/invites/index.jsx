import React from 'react';
import { Heading } from './components/Heading';
import { InvitesWrapper } from './components/InvitesWrapper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INVITE_QUERY_KEY } from '@/constants/query-keys';
import { searchUsers } from '@/services/users';
import { getUserInvites } from '@/services/invites';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/shared/spinner';
import UserCard from './components/InviteCard';
import InviteCard from './components/InviteCard';

const InvitesPage = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [INVITE_QUERY_KEY],
      queryFn: ({ pageParam }) => getUserInvites({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { count, page, limit } = lastPage;
        const hasMore = count > page * limit;
        return hasMore ? page + 1 : undefined;
      },
      refetchOnWindowFocus: false,
    });

  const { pages } = data ?? {};

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log(pages);


  return (
    <div className="mx-auto max-w-screen-lg px-4 md:px-10 py-10">
      <Heading total={pages && pages[0]?.count} />
      <InvitesWrapper>
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
          <div className='flex flex-col gap-5'>
            {pages?.map((page) => {
              return page.items.map((invite) => (
                <InviteCard key={invite._id} invite={invite} />
              ));
            })}
          </div>
        </InfiniteScroll>
      </InvitesWrapper>
    </div>
  );
};

export default InvitesPage;