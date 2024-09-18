import React from "react";

const LoadMore = ({ hasMore = true }) => {
  if (hasMore) {
    return <button>Load More</button>;
  }
  return <div>There is no more card</div>;
};

export default LoadMore;
