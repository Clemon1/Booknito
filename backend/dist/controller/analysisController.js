"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomPerformance = exports.getHotelRevenue = exports.getBookingReport = exports.getUsersReport = void 0;
const analytics_1 = require("../middleware/analytics");
const usersModel_1 = __importDefault(require("../model/usersModel"));
const bookingModel_1 = __importDefault(require("../model/bookingModel"));
const roomModel_1 = __importDefault(require("../model/roomModel"));
const date_fns_1 = require("date-fns");
const getUsersReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year } = req.query;
        const report = yield (0, analytics_1.getMonthlyCounts)(usersModel_1.default, Number(year));
        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getUsersReport = getUsersReport;
// Checking total bookings each month
const getBookingReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year } = req.query;
        const report = yield (0, analytics_1.getMonthlyCounts)(bookingModel_1.default, Number(year));
        res.status(200).json(report);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getBookingReport = getBookingReport;
// Calculating system Revenue
const getHotelRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year } = req.query;
        const revenue = yield (0, analytics_1.getMonthlyRevenue)(bookingModel_1.default, Number(year), [
            "active",
            "expired",
        ]);
        res.status(200).json(revenue);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});
exports.getHotelRevenue = getHotelRevenue;
// Checking rooms performance
const getRoomPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRooms = yield roomModel_1.default.find({ isDeleted: false });
        const roomMap = new Map(allRooms.map((room) => [room._id.toString(), room.roomNumber]));
        const currentYearStart = (0, date_fns_1.startOfYear)(new Date());
        const currentYearEnd = (0, date_fns_1.endOfYear)(new Date());
        // Fetch all bookings in the current year for performance reasons
        const allBookings = yield bookingModel_1.default.find({
            checkIN: { $gte: currentYearStart, $lte: currentYearEnd },
        });
        // Calculate weekly and monthly performances using date-fns
        const weeklyBookings = {};
        const monthlyBookings = {};
        allBookings.forEach((booking) => {
            const weekStart = (0, date_fns_1.startOfWeek)(booking.checkIN, { weekStartsOn: 1 });
            const monthStart = (0, date_fns_1.startOfMonth)(booking.checkIN);
            const weekKey = `${booking.roomId}-${(0, date_fns_1.format)(weekStart, "yyyy-MM-dd")}`;
            const monthKey = `${booking.roomId}-${(0, date_fns_1.format)(monthStart, "yyyy-MM-dd")}`;
            //@ts-ignore
            if (!weeklyBookings[weekKey]) {
                //@ts-ignore
                weeklyBookings[weekKey] = {
                    roomId: booking.roomId,
                    roomNumber: roomMap.get(booking.roomId.toString()),
                    count: 0,
                    date: (0, date_fns_1.format)(weekStart, "yyyy-MM-dd"),
                };
            }
            //@ts-ignore
            if (!monthlyBookings[monthKey]) {
                //@ts-ignore
                monthlyBookings[monthKey] = {
                    roomId: booking.roomId,
                    roomNumber: roomMap.get(booking.roomId.toString()),
                    count: 0,
                    date: (0, date_fns_1.format)(monthStart, "yyyy-MM-dd"),
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
            const highestRooms = type === "weekly"
                ? highestBookedWeeklyRooms
                : highestBookedMonthlyRooms;
            const lowestRooms = type === "weekly" ? lowestBookedWeeklyRooms : lowestBookedMonthlyRooms;
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
    }
    catch (error) {
        console.error("Failed to fetch room performances:", error);
        res.status(500).send({
            message: "Failed to fetch room performances due to an internal error",
        });
    }
});
exports.getRoomPerformance = getRoomPerformance;
