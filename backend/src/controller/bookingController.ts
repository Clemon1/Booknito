import * as dotenv from "dotenv";
import { Request, Response } from "express";
import bookings from "../model/bookingModel";
import rooms from "../model/roomModel";

dotenv.config();

// View all bookings
export const viewAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await bookings
      .find()
      .populate("roomId")
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(allBookings);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// total revenue for all successful bookings
export const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const bookingTotal = await bookings.find({
      status: ["active", "expired"],
    });
    const totalRevenue = bookingTotal.reduce(
      (sum: any, booking: any) => sum + booking.totalAmount,
      0,
    );
    res.status(200).json({ total: totalRevenue });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
//View user bookings
export const viewUserBookings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const userBookings = await bookings
      .find({ userId })
      .populate("place")
      .exec();
    res.status(200).json(userBookings);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// View single Booking
export const viewSingleBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleBooking = await bookings.findById(id).populate("roomId").exec();
    res.status(200).json(singleBooking);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Create a new Booking
export const createBookings = async (req: Request, res: Response) => {
  try {
    const {
      guestName,
      gender,
      address,
      occupation,
      phoneNumber,
      nationality,
      passportNumber,
      adults,
      children,
      roomId,
      checkIN,
      discountAmount,
      refundAmount,
      checkOUT,
      numOfGuest,
      email,
    } = req.body;
    if (
      !guestName ||
      !gender ||
      !address ||
      !occupation ||
      !phoneNumber ||
      !nationality ||
      !passportNumber ||
      !roomId ||
      !checkIN ||
      !checkOUT ||
      !numOfGuest
    ) {
      return res.status(401).json("Details must not be empty");
    }

    const existingBooking = await bookings.findOne({
      roomId,
      $or: [
        {
          $and: [
            { checkIN: { $lt: checkOUT } },
            { checkOUT: { $gt: checkIN } },
          ],
        },
      ],
    });
    if (existingBooking) {
      return res
        .status(401)
        .json(
          "Sorry, the room is already booked for the specified time range.",
        );
    }

    const findRoom = await rooms.findById(roomId);
    if (!findRoom) {
      return res.status(401).json("Room not found");
    }
    const setBooking = new bookings({
      guestName,
      gender,
      address,
      occupation,
      phoneNumber,
      nationality,
      passportNumber,
      roomId,
      price: findRoom?.price,
      email,
      discountAmount,
      refundAmount,
      checkIN,
      checkOUT,
      numOfGuest,
      adults,
      children,
    });
    const createBookingsResponse = await setBooking.save();

    res.status(201).json(createBookingsResponse);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};

export const updateBookings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price, discountAmount, refundAmount, checkOUT } = req.body;

    const totalPrice = price - discountAmount - refundAmount;
    const body = {
      price,
      discountAmount,
      refundAmount,
      checkOUT: new Date(),
      totalAmount: totalPrice,
    };
    console.log("totalPrice", totalPrice);

    const updatedBooking = await bookings.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true },
    );

    res.status(200).json(updatedBooking);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Update & Cancel booking
export const cancelBookings = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
