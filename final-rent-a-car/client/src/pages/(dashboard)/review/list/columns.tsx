import { AxiosResponseError, Review, ReviewStatus } from "@/types";
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
import { Link } from "react-router-dom";
import { paths } from "@/constants/paths";
import reviewService from "@/services/review";

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: (data) => {
      switch (data.row.original.status) {
        case ReviewStatus.Approved:
          return (
            <div className="text-green-600 capitalize">
              {data.row.original.status}
            </div>
          );
        case ReviewStatus.Pending:
          return (
            <div className="text-yellow-500  capitalize">
              {data.row.original.status}
            </div>
          );
        case ReviewStatus.Rejected:
          return (
            <div className="text-red-500  capitalize">
              {data.row.original.status}
            </div>
          );
      }
    },
  },
  {
    accessorKey: "rent._id",
    header: "Rent",
    cell: (data) => {
      const { _id, title } = data.row.original.rent;
      return (
        <Link
          to={paths.DASHBOARD.RENTS.EDIT(_id)}
          className="text-blue-600 underline"
        >
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "author._id",
    header: "Author Id",
  },
  {
    accessorKey: "author.name",
    header: "Author",
  },
  {
    accessorKey: "content",
    header: "Content",
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      const status = data.row.original.status;
      const queryClient = useQueryClient();
      const { mutate, isPending } = useMutation({
        mutationFn: reviewService.changeStatus,
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ADMIN_REVIEWS],
          });
        },
        onError: (error: AxiosResponseError) => {
          toast.error(error.response?.data.message || "Something went wrong");
        },
      });
      function handleStatusChange(
        status: ReviewStatus.Approved | ReviewStatus.Rejected
      ) {
        mutate({
          data: {
            status,
          },
          id: data.row.original._id,
        });
      }
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger disabled={isPending} className="outline-none">
              <Edit2Icon size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RenderIf
                condition={
                  status === ReviewStatus.Pending ||
                  status === ReviewStatus.Rejected
                }
              >
                <DropdownMenuItem
                  onClick={() => handleStatusChange(ReviewStatus.Approved)}
                  disabled={isPending}
                  className="cursor-pointer"
                >
                  <CheckCircle2Icon className="text-green-500" />
                  <p className="text-green-500">Approve</p>
                </DropdownMenuItem>
              </RenderIf>
              <RenderIf
                condition={
                  status === ReviewStatus.Pending ||
                  status === ReviewStatus.Approved
                }
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  disabled={isPending}
                  onClick={() => handleStatusChange(ReviewStatus.Rejected)}
                >
                  <XCircleIcon className="text-red-500" />
                  <p className="text-red-500">Reject</p>
                </DropdownMenuItem>
              </RenderIf>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
