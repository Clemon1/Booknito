import { Request, Response } from "express";
import { getMonthlyCounts } from "../middleware/analytics";
import users from "../model/usersModel";
import bookings from "../model/bookingModel";

export const getUsersReport = async (req: Request, res: Response) => {
  try {
    const report = await getMonthlyCounts(users, 2024);
    res.status(200).json(report);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

export const getBookingReport = async (req: Request, res: Response) => {
  try {
    const report = await getMonthlyCounts(bookings, 2024);
    res.status(200).json(report);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
