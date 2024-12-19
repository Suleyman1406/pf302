import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Spinner } from "@/components/shared/Spinner";
import { DataTable } from "@/components/shared/DataTable";

const DashboardReservationListPage = () => {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-bold text-2xl ">Reservations</h2>
      </div>
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default DashboardReservationListPage;
