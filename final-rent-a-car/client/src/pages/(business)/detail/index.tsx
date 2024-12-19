import { RentList } from "@/components/shared/RentList";
import { ImagesSection } from "./components/Images";
import { InformationSection } from "./components/Information";
import { ReviewsSection } from "./components/Reviews";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const RentDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col justify-center items-center mt-28">
  //       <Spinner />
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  // const rent = data?.data?.item;

  // if (isError || !rent) {
  //   return (
  //     <div className="flex flex-col justify-center items-center mt-28">
  //       <p className="text-2xl font-bold mb-3 text-primary">
  //         Something went wrong!
  //       </p>
  //       <Button className="mt-4">
  //         <Link to={paths.HOME}>Go Back To Home</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  return (
    <div className="container max-w-[1144px] py-6 lg:py-8">
      <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2  gap-x-8">
        <ImagesSection images={[]} />
        {/* <InformationSection rent={rent} /> */}
      </div>
      {/* <ReviewsSection reviews={rent.reviews} /> */}
      <RentList maxCols={3} heading="Recent Cars" />
      <RentList
        maxCols={3}
        heading="Recomendation Cars"
        isLoading={false}
        rents={[]}
      />
      <ScrollToTop />
    </div>
  );
};

export default RentDetailPage;
