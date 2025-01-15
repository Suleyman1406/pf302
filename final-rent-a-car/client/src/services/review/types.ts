import { ReviewStatus } from "@/types";

export type CreateReviewPayload = {
  content: string;
  rate: number;
  reservationId: string;
};

export type ChangeReviewStatusPayload = {
  status: ReviewStatus;
};
