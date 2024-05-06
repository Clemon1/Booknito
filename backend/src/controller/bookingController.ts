import * as dotenv from "dotenv";
import { Request, Response } from "express";
import bookings from "../model/bookingModel";

dotenv.config();

// View all bookings
export const viewAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await bookings.find();
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
      (sum: any, booking: any) => sum + booking.price,
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
    const singleBooking = await bookings.findById(id);
    res.status(200).json(singleBooking);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Create a new Booking
export const createBookings = async (req: Request, res: Response) => {
  try {
    const { guestName, roomId, price, checkIN, checkOUT, numOfGuest, email } =
      req.body;
    if (
      !guestName ||
      !roomId ||
      !price ||
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
    const setBooking = new bookings({
      guestName,
      roomId,
      price,
      email,
      checkIN,
      checkOUT,
      numOfGuest,
    });
    const createBookingsResponse = await setBooking.save();

    res.status(200).json(createBookingsResponse);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};

// Update & Cancel booking
export const cancelBookings = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
