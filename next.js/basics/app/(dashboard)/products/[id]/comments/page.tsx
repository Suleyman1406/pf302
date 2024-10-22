type Props = {
  params: {
    id: string;
  };
};

const ProductCommentsPage = (props: Props) => {
  const { id } = props.params;

  return <div>Product {id} Comments</div>;
};

export default ProductCommentsPage;
