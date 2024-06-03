import { Request, Response } from "express";
import { getMonthlyCounts, getMonthlyRevenue } from "../middleware/analytics";
import users from "../model/usersModel";
import bookings from "../model/bookingModel";
import rooms from "../model/roomModel";
import {
  startOfYear,
  endOfYear,
  getWeek,
  getMonth,
  startOfWeek,
  startOfMonth,
  format,
} from "date-fns";
export const getUsersReport = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const report = await getMonthlyCounts(users, Number(year));
    res.status(200).json(report);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Checking total bookings each month
export const getBookingReport = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;

    const report = await getMonthlyCounts(bookings, Number(year));
    res.status(200).json(report);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// Calculating system Revenue
export const getHotelRevenue = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;

    const revenue = await getMonthlyRevenue(bookings, Number(year), [
      "active",
      "expired",
    ]);
    res.status(200).json(revenue);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

// Checking rooms performance
export const getRoomPerformance = async (req: Request, res: Response) => {
  try {
    const allRooms = await rooms.find({ isDeleted: false });
    const roomMap = new Map(
      allRooms.map((room) => [room._id.toString(), room.roomNumber]),
    );

    const currentYearStart = startOfYear(new Date());
    const currentYearEnd = endOfYear(new Date());

    // Fetch all bookings in the current year for performance reasons
    const allBookings = await bookings.find({
      checkIN: { $gte: currentYearStart, $lte: currentYearEnd },
    });

    // Calculate weekly and monthly performances using date-fns
    const weeklyBookings = {};
    const monthlyBookings = {};

    allBookings.forEach((booking) => {
      const weekStart = startOfWeek(booking.checkIN, { weekStartsOn: 1 });
      const monthStart = startOfMonth(booking.checkIN);
      const weekKey = `${booking.roomId}-${format(weekStart, "yyyy-MM-dd")}`;
      const monthKey = `${booking.roomId}-${format(monthStart, "yyyy-MM-dd")}`;
      //@ts-ignore

      if (!weeklyBookings[weekKey]) {
        //@ts-ignore

        weeklyBookings[weekKey] = {
          roomId: booking.roomId,
          roomNumber: roomMap.get(booking.roomId.toString()),
          count: 0,
          date: format(weekStart, "yyyy-MM-dd"),
        };
      }
      //@ts-ignore
      if (!monthlyBookings[monthKey]) {
        //@ts-ignore

        monthlyBookings[monthKey] = {
          roomId: booking.roomId,
          roomNumber: roomMap.get(booking.roomId.toString()),
          count: 0,
          date: format(monthStart, "yyyy-MM-dd"),
        };
      }
      //@ts-ignore
      weeklyBookings[weekKey].count++;
      //@ts-ignore
      monthlyBookings[monthKey].count++;
    });

    // Initialize objects to store the highest and lowest bookings for each week and month
    const highestBookedWeeklyRooms = {};
    const lowestBookedWeeklyRooms = {};
    const highestBookedMonthlyRooms = {};
    const lowestBookedMonthlyRooms = {};

    // Function to update highest and lowest records
    //@ts-ignore

    const updateHighestLowest = (type, date, booking) => {
      const highestRooms =
        type === "weekly"
          ? highestBookedWeeklyRooms
          : highestBookedMonthlyRooms;
      const lowestRooms =
        type === "weekly" ? lowestBookedWeeklyRooms : lowestBookedMonthlyRooms;
      //@ts-ignore
      if (!highestRooms[date] || booking.count > highestRooms[date].count) {
        //@ts-ignore

        highestRooms[date] = booking;
      }
      //@ts-ignore
      if (!lowestRooms[date] || booking.count < lowestRooms[date].count) {
        //@ts-ignore

        lowestRooms[date] = booking;
      }
    };

    // Iterate over weekly bookings to find the highest and lowest booked rooms for each week
    Object.keys(weeklyBookings).forEach((key) => {
      //@ts-ignore
      const booking = weeklyBookings[key];
      updateHighestLowest("weekly", booking.date, booking);
    });

    // Iterate over monthly bookings to find the highest and lowest booked rooms for each month
    Object.keys(monthlyBookings).forEach((key) => {
      //@ts-ignore

      const booking = monthlyBookings[key];
      updateHighestLowest("monthly", booking.date, booking);
    });

    // Map the results back to the rooms
    const roomPerformance = allRooms.map((room) => ({
      roomNumber: room.roomNumber,
      weeklyBookings: Object.keys(weeklyBookings)
        .filter((key) => key.startsWith(`${room._id}-`))
        .map((key) => ({
          //@ts-ignore
          date: weeklyBookings[key].date,
          //@ts-ignore

          bookings: weeklyBookings[key].count,
        })),
      monthlyBookings: Object.keys(monthlyBookings)
        .filter((key) => key.startsWith(`${room._id}-`))
        .map((key) => ({
          //@ts-ignore
          date: monthlyBookings[key].date,
          //@ts-ignore

          bookings: monthlyBookings[key].count,
        })),
    }));

    const highestAndLowestBookedRooms = {
      highestBookedWeeklyRooms: Object.values(highestBookedWeeklyRooms),
      lowestBookedWeeklyRooms: Object.values(lowestBookedWeeklyRooms),
      highestBookedMonthlyRooms: Object.values(highestBookedMonthlyRooms),
      lowestBookedMonthlyRooms: Object.values(lowestBookedMonthlyRooms),
    };

    res.json({ roomPerformance, highestAndLowestBookedRooms });
  } catch (error) {
    console.error("Failed to fetch room performances:", error);
    res.status(500).send({
      message: "Failed to fetch room performances due to an internal error",
    });
  }
};
