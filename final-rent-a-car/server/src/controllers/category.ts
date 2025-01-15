import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";

const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "Categories fetched successfully",
      items: categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { title } = req.matchedData;

    const category = await Category.create({ title });

    res.status(201).json({
      message: "Category created successfully",
      item: category,
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
      category: id,
    });

    if (hasAnyRent) {
      res.status(400).json({ message: "Category is used in a rent" });
      return;
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.status(200).json({ message: "Category removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const categoryController = {
  getAll,
  create,
  remove,
};

export default categoryController;
