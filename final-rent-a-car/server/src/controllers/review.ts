import { Request, Response } from "express";
import Review from "../mongoose/schemas/review";
import Reservation from "../mongoose/schemas/reservation";
import { ReservationStatus } from "../types/reservation";
import Rent from "../mongoose/schemas/rent";
import { ReviewStatus } from "../types/review";

const getAll = async (_: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate("rent")
      .populate("author", "name username email avatar");
    res.status(200).json({
      items: reviews,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getByRentId = async (req: Request, res: Response) => {
  try {
    const { rentId } = req.params;

    const reviews = await Review.find({
      rent: rentId,
      status: ReviewStatus.Approved,
    })
      .populate("author", "name username email avatar")
      .populate("rent");

    res.status(200).json({
      items: reviews,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { reservationId, content, rate } = req.matchedData;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      res.status(404).send({ message: "Reservation not found" });
      return;
    }

    if (reservation.dropOffDate > new Date()) {
      res
        .status(400)
        .send({ message: "You can only review after the drop off date" });
      return;
    }

    if (reservation.status !== ReservationStatus.Approved) {
      res.status(400).send({
        message: "You can only review after the reservation is approved",
      });
      return;
    }

    if (reservation.customer.toString() !== user!._id.toString()) {
      res.status(403).send({ message: "Forbidden" });
      return;
    }

    if (reservation.hasReview) {
      res
        .status(400)
        .send({ message: "You already reviewed this reservation" });
      return;
    }

    reservation.hasReview = true;
    await reservation.save();

    const review = await Review.create({
      author: user!._id,
      content,
      rate,
      rent: reservation.rent,
    });

    await Rent.findByIdAndUpdate(reservation.rent, {
      $push: {
        reviews: review._id,
      },
    });

    res.status(201).json({
      item: review,
      message: "Review created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.matchedData;

    const review = await Review.findById(id);

    if (!review) {
      res.status(404).send({ message: "Review not found" });
      return;
    }

    review.status = status;
    await review.save();

    res.status(200).json({
      item: review,
      message: "Review status changed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const reviewController = {
  create,
  getAll,
  getByRentId,
  changeStatus,
};

export default reviewController;
