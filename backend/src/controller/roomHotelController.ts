import { Request, Response } from "express";
import rooms from "../model/roomModel";
import users from "../model/usersModel";

import cloudinary from "../middleware/cloudinary";
// View all rental homes
interface view {
  _doc: object;
}
// View all rooms
export const viewHome = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let findRoom;
    search === ""
      ? (findRoom = await rooms.find({ isDeleted: false }))
      : (findRoom = await rooms.find({
          isDeleted: false,
          $or: [
            { roomNumber: { $regex: search, $options: "i" } },
            { roomType: { $regex: search, $options: "i" } },
          ],
        }));

    res.status(200).json(findRoom);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// View Single Room
export const viewSingleHome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json("Not Found");
    }

    const singleHome = await rooms.findById(id);
    if (singleHome?.isDeleted === false) {
      res.status(200).json(singleHome);
    } else {
      res.status(404).json("Room has been deleted by Admin");
    }
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Create Room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { roomNumber, description, address, perks, price, maxGuest } =
      req.body;

    //@ts-ignore
    const photo: [string] =
      //@ts-ignore
      req.files["photos"] && req.files["photos"].map((file: any) => file.path);

    const rntHome = new rooms({
      roomNumber,
      description,
      address,
      photos: photo,
      perks,
      price,
      maxGuest,
    });

    const newHome = await rntHome.save();
    res.status(200).json(newHome);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Bookmark room
export const bookmarkRentalHomes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productId } = req.params;
    const activeUser = await users.findById(id);
    // checking id user exist
    if (!activeUser) {
      return res.status(404).json("Please login to add to wishlist");
    }
    // checking if room exists in the bookmark
    const singleHome = await rooms.findById(productId);
    if (!singleHome) {
      return res.status(404).json("No room found");
    }
    // checking if room already exist in wishlist
    if (activeUser?.bookmark.includes(singleHome?.id)) {
      await users.findByIdAndUpdate(
        id,
        { $pull: { bookmark: productId } },
        { new: true },
      );
      res.status(400).json("Room removed from wishlist");
    } else {
      await users.findByIdAndUpdate(
        id,
        { $push: { bookmark: productId } },
        { new: true },
      );
      res.status(400).json("Room added to wishlist");
    }
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export const searchRoom = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchRooms = await rooms.find({
      $or: [
        { roomNumber: { $regex: search, $options: "i" } },
        { roomType: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json(searchRooms);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Update existing rental home
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roomNumber, description, address, perks, price, maxGuest } =
      req.body;

    //@ts-ignore
    const photo: any =
      //@ts-ignore
      req.files["photos"] && req.files["photos"].map((file) => file.path);
    // const cloudUpload = await cloudinary.upload(photo);

    const hotel = {
      roomNumber,
      description,
      address,
      photos: photo,
      perks,
      price,
      maxGuest,
    };
    // if (req.files['photos'].path) {
    //   hotel.photos: photo,
    // }
    const updateHome = await rooms.findByIdAndUpdate(
      id,
      { $set: hotel },
      { new: true },
    );
    res.status(200).json(updateHome);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// soft delete to remove rooms

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const removeRoom = rooms.findByIdAndUpdate(id, {
      $set: { isDeleted: true },
    });

    res.status(200).json(removeRoom);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
