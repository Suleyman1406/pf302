import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import { DataTable } from "@/components/shared/DataTable";

const DashboardRentsPage = () => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-bold text-2xl ">Rents</h2>
        <Button asChild>
          <Link to={paths.DASHBOARD.RENTS.CREATE}>Create Rent</Link>
        </Button>
      </div>
      {/* <DataTable columns={columns} data={items} /> */}
    </div>
  );
};

export default DashboardRentsPage;
