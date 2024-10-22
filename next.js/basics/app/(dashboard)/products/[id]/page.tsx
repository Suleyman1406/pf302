import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// export const metadata = {
//   title: "Product Detail",
// };

export function generateMetadata({ params }: Props) {
  const { id } = params;

  return {
    title: `Product ${id} Detail`,
  };
}

const ProductDetailPage = ({ params: { id } }: Props) => {
  if (isNaN(Number(id))) {
    notFound();
  }
  return <div>ProductDetailPage {id}</div>;
};

export default ProductDetailPage;
