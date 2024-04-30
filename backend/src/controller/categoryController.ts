import { Request, Response } from "express";
import categories from "../model/categoryModel";

//View all categories
export const findCategory = async (req: Request, res: Response) => {
  try {
    const viewCategories = await categories.find();
    res.status(200).json(viewCategories);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
//View single category
export const findSingleCategory = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
