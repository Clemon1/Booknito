import { Request, Response } from "express";
import { getMonthlyCounts, getMonthlyRevenue } from "../middleware/analytics";
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
// Checking total bookings each month
export const getBookingReport = async (req: Request, res: Response) => {
  try {
    const report = await getMonthlyCounts(bookings, 2024);
    res.status(200).json(report);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Calculating system Revenue
export const getHotelRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await getMonthlyRevenue(bookings, 2024, [
      "active",
      "expired",
    ]);
    res.status(200).json(revenue);
  } catch (err: any) {}
};
