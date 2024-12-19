import { AvailabilityFilter } from "@/components/shared/availability-filter";
import { Hero } from "./components/Hero";
import { RentList } from "../../../components/shared/RentList";

const HomePage = () => {
  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
      <Hero />
      <AvailabilityFilter />
      <RentList heading="Popular Cars" />
      <RentList heading="Recommendation Cars" isLoading={true} rents={[]} />
    </div>
  );
};

export default HomePage;
