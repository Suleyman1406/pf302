import { Rent, Reservation, ReservationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2Icon, Edit2Icon, XCircleIcon } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenderIf } from "@/components/shared/RenderIf";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: (data) => {
      switch (data.row.original.status) {
        case ReservationStatus.Approved:
          return (
            <div className="text-green-600 capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Pending:
          return (
            <div className="text-yellow-500  capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Rejected:
          return (
            <div className="text-red-500  capitalize">
              {data.row.original.status}
            </div>
          );
        case ReservationStatus.Cancelled:
          return (
            <div className="text-red-500  capitalize">
              {data.row.original.status}
            </div>
          );
      }
    },
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: (data) => {
      return (
        <img
          src={(data.row.original.rent as Rent).images[0]}
          alt={"Rent Picture"}
          className="w-10 h-10 object-cover rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "rent.name",
    header: "Rent Name",
  },
  {
    accessorKey: "rent.description",
    header: "Description",
    cell: (data) => {
      return (
        <div className="truncate max-w-[200px]">
          {(data.row.original.rent as Rent).description}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (data) => {
      return (
        <div className="text-secondary-500">
          {data.row.original.total}{" "}
          <span className="text-secondary-300">
            {(data.row.original.rent as Rent).currency}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: (data) => {
      return (
        <div className="text-secondary-500">
          {formatDate(data.row.original.startDate)}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: (data) => {
      return (
        <div className="text-secondary-500">
          {formatDate(data.row.original.endDate)}
        </div>
      );
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      function handleStatusChange(
        status: ReservationStatus.Approved | ReservationStatus.Rejected
      ) {}
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Edit2Icon size={18} />
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent>
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RenderIf condition={status === ReservationStatus.Pending}>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(ReservationStatus.Approved)}
                  className="cursor-pointer"
                >
                  <CheckCircle2Icon className="text-green-500" />
                  <p className="text-green-500">Approve</p>
                </DropdownMenuItem>
              </RenderIf>
              <RenderIf
                condition={
                  status === ReservationStatus.Pending ||
                  status === ReservationStatus.Approved
                }
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleStatusChange(ReservationStatus.Rejected)}
                >
                  <XCircleIcon className="text-red-500" />
                  <p className="text-red-500">Reject</p>
                </DropdownMenuItem>
              </RenderIf>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>
      );
    },
  },
];
