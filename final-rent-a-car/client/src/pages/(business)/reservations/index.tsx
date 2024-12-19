import { RenderIf } from "@/components/shared/RenderIf";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEYS } from "@/constants/query-keys";
import { calculateDateDifference, formatDate } from "@/lib/utils";
import { Rent, Reservation, ReservationStatus } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";

//@ts-ignore
import ReactStars from "react-rating-stars-component";

const ReservationsPage = () => {
  // const items = data?.data.items || [];

  return (
    <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-4">
      <h2 className="text-2xl font-semibold text-muted-foreground">
        Your Reservations
      </h2>
      {/* {items.length ? (
        items.map((reservation: Reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <div className="text-center text-lg text-muted-foreground">
          No reservations found
        </div>
      )} */}
    </div>
  );
};

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  const rent = reservation.rent as Rent;
  const queryClient = useQueryClient();

  function handleCancelReservation() {}

  const showReview =
    !reservation.hasReview &&
    reservation.status === ReservationStatus.Approved &&
    new Date(reservation.endDate) < new Date();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <div className="flex items-end justify-between">
        <div className="flex items-center">
          <img
            src={rent.images[0]}
            alt=""
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="ml-4">
            <div className="flex items-center gap-x-4">
              <h2 className="text-lg font-semibold">{rent.name}</h2>
              <p className="text-xs text-gray-400 translate-y-0.5">
                {formatDate(reservation.startDate)} -{" "}
                {formatDate(reservation.endDate)}
              </p>
            </div>
            <p className="text-muted-foreground">
              {rent.price}
              <span className="text-sm">{rent.currency}</span> x{" "}
              {calculateDateDifference(
                reservation.startDate,
                reservation.endDate
              )}{" "}
              days
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[360px]">
              {rent.description}
            </p>
          </div>
        </div>
        <div className="absolute right-3 top-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ReservationCardStatus status={reservation.status} />
              </TooltipTrigger>
              <TooltipContent className="capitalize bg-muted-foreground">
                {reservation.status}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <RenderIf condition={reservation.status === ReservationStatus.Pending}>
          <div>
            <Button
              onClick={handleCancelReservation}
              disabled={false}
              size="sm"
              variant={"destructive"}
            >
              <RenderIf condition={false}>
                <Spinner />
              </RenderIf>
              Cancel Reservation
            </Button>
          </div>
        </RenderIf>
      </div>
      <RenderIf condition={showReview}>
        <WriteReview rentId={rent._id} reservationId={reservation._id} />
      </RenderIf>
    </div>
  );
};

const ReservationCardStatus = ({ status }: { status: ReservationStatus }) => {
  switch (status) {
    case ReservationStatus.Pending:
      return (
        <span className="bg-yellow-500 w-3 h-3 rounded-full inline-block" />
      );
    case ReservationStatus.Approved:
      return (
        <span className="bg-green-500 w-3 h-3 rounded-full inline-block" />
      );
    case ReservationStatus.Rejected:
      return <span className="bg-red-500 w-3 h-3 rounded-full inline-block" />;
    case ReservationStatus.Cancelled:
      return <span className="bg-gray-500 w-3 h-3 rounded-full inline-block" />;
  }
};

const WriteReview = ({}: { rentId: string; reservationId: string }) => {
  const [rating, setRating] = useState(1);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  function onSubmitReview() {
    if (!contentRef.current || !contentRef.current.value) {
      return;
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Write a review</h3>
      <div className="flex flex-col gap-x-4">
        <div className="w-fit">
          <ReactStars
            count={5}
            value={rating}
            onChange={setRating}
            size={28}
            activeColor="#ffd700"
          />
        </div>
        <textarea
          ref={contentRef}
          placeholder="Write your review here..."
          className="w-full h-24 border border-gray-200 rounded-lg p-2"
        />
      </div>
      <Button
        disabled={false}
        onClick={onSubmitReview}
        size="sm"
        className="mt-2"
      >
        <RenderIf condition={false}>
          <Spinner />
        </RenderIf>
        Submit Review
      </Button>
    </div>
  );
};

export default ReservationsPage;
