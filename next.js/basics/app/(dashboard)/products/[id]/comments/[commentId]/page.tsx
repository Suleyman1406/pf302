import React from "react";

type Props = {
  params: {
    id: string;
    commentId: string;
  };
};

const ProductCommentDetailPage = (props: Props) => {
  const { id, commentId } = props.params;

  return (
    <div>
      Product {id} comment {commentId}
    </div>
  );
};

export default ProductCommentDetailPage;
