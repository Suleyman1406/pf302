import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { DataTable } from "@/components/shared/DataTable";
import rentService from "@/services/rent";

const DashboardRentsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_RENTS],
    queryFn: () => rentService.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  const rents = data?.data?.items;

  if (isError || !rents) {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <p className="text-2xl font-bold mb-3 text-primary">
          Something went wrong!
        </p>
        <Button className="mt-4">
          <Link to={paths.HOME}>Go Back To Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-bold text-2xl ">Rents</h2>
        <Button asChild>
          <Link to={paths.DASHBOARD.RENTS.CREATE}>Create Rent</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={rents} />
    </div>
  );
};

export default DashboardRentsPage;
