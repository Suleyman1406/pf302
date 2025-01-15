import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();

    res.status(200).json({
      message: "Locations fetched successfully",
      items: locations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.matchedData;

    const location = await Location.create({ title });

    res.status(201).json({
      message: "Location created successfully",
      item: location,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hasAnyRent = await Rent.findOne({
      $or: [
        {
          pickUpLocations: {
            $in: [id],
          },
        },
        {
          dropOffLocations: {
            $in: [id],
          },
        },
      ],
    });

    if (hasAnyRent) {
      res.status(400).json({ message: "Location is used in a rent" });
      return;
    }

    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    res.status(200).json({ message: "Location removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const locationController = {
  getAll,
  create,
  remove,
};

export default locationController;
