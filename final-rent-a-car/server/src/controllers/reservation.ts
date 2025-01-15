import { Request, Response } from "express";
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";
import Location from "../mongoose/schemas/location";
import { calculateDaysBetween } from "../utils";
import { UserRole } from "../types/user";
import { ReservationStatus } from "../types/reservation";

const getAll = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const filter: Record<string, any> = {};
    if (user!.role !== "admin") {
      filter.customer = user!._id;
    }

    const reservations = await Reservation.find(filter)
      .populate("rent", "title price discountPrice description imageUrls")
      .populate("pickUpLocation")
      .populate("dropOffLocation");

    reservations.forEach((reservation) => {
      (reservation.rent as any).imageUrls = (
        reservation.rent as any
      ).imageUrls.map((url: string) => {
        if (url.startsWith("http")) return url;
        return `${process.env.BASE_URL}${url}`;
      });
    });
    res.status(200).json({
      message: "Reservations fetched successfully",
      items: reservations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      billing,
      pickUpLocation,
      pickUpDate,
      dropOffLocation,
      dropOffDate,
      rent,
    } = req.matchedData;

    const [rentExists, pickUpLocationExists, dropOffLocationExists] =
      await Promise.all([
        Rent.findById(rent),
        Location.findById(pickUpLocation),
        Location.findById(dropOffLocation),
      ]);

    if (!rentExists || !pickUpLocationExists || !dropOffLocationExists) {
      res.status(400).json({ message: "Invalid data" });
      return;
    }

    if (new Date(pickUpDate) > new Date(dropOffDate)) {
      res
        .status(400)
        .json({ message: "Pick up date should be less than drop off date" });
      return;
    }

    if (new Date(pickUpDate) < new Date()) {
      res
        .status(400)
        .json({ message: "Pick up date should be greater than current date" });
      return;
    }
    if (new Date(dropOffDate) < new Date()) {
      res
        .status(400)
        .json({ message: "Drop off date should be greater than current date" });
      return;
    }

    const reservationExist = await Reservation.findOne({
      rent,
      dropOffDate: {
        $gte: pickUpDate,
      },
      pickUpDate: {
        $lte: dropOffDate,
      },
    });

    if (reservationExist) {
      res
        .status(400)
        .json({ message: "Rent is not available between theese dates." });
      return;
    }
    const rentDays = calculateDaysBetween(
      new Date(pickUpDate),
      new Date(dropOffDate)
    );
    const total = (rentExists.discountPrice || rentExists.price) * rentDays;

    const reservation = await Reservation.create({
      billingInfo: billing,
      pickUpLocation,
      pickUpDate,
      dropOffLocation,
      dropOffDate,
      rent,
      customer: req.user!._id,
      total,
    });

    res
      .status(201)
      .json({ message: "Reservation created successfully", item: reservation });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = req.user!.role;
    const { status } = req.matchedData;

    if (status !== ReservationStatus.Cancelled && role !== UserRole.ADMIN) {
      res.status(403).json({ message: "You are not allowed to change status" });
      return;
    }

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }

    if (reservation.status === status) {
      res.status(400).json({ message: "Reservation already has this status" });
      return;
    }

    if (reservation.status === ReservationStatus.Cancelled) {
      res.status(400).json({ message: "Reservation already cancelled" });
      return;
    }

    if (
      reservation.status !== ReservationStatus.Pending &&
      status === ReservationStatus.Cancelled
    ) {
      res
        .status(400)
        .json({ message: "You can only cancel pending reservations" });
      return;
    }

    if (
      status === ReservationStatus.Approved &&
      reservation.status !== ReservationStatus.Pending
    ) {
      res
        .status(400)
        .json({ message: "You can only approve pending reservations" });
      return;
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      message: "Reservation status changed successfully",
      item: reservation,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const reservationController = {
  getAll,
  create,
  changeStatus,
};

export default reservationController;
