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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyRevenue = exports.getMonthlyCounts = void 0;
const date_fns_1 = require("date-fns");
// Used to calculate e.g total users of an application
const getMonthlyCounts = (model, year) => __awaiter(void 0, void 0, void 0, function* () {
    const monthlyCounts = [];
    // Start from the first month after the given year to work backwards from there
    let currentDate = new Date(year + 1, 0, 1);
    // Loop over the last 12 months of the specified year
    for (let i = 0; i < 12; i++) {
        const endDate = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(currentDate, i + 1)); // end of the month for the i-th month before currentDate
        const startDate = (0, date_fns_1.startOfMonth)(endDate); // start of the same month
        try {
            const monthYear = endDate.toLocaleDateString("default", {
                month: "short",
                // year: "numeric",
            });
            const total = yield model.countDocuments({
                createdAt: { $gte: startDate, $lte: endDate },
            });
            monthlyCounts.push({ month: monthYear, total });
        }
        catch (error) {
            console.error("Error fetching monthly counts:", error);
            throw new Error("Error fetching monthly counts");
        }
    }
    // Reverse the array to have the counts from January to December of the year
    return monthlyCounts.reverse();
});
exports.getMonthlyCounts = getMonthlyCounts;
// Used to calculate e.g total revenue of a company
const getMonthlyRevenue = (model, year, statuses) => __awaiter(void 0, void 0, void 0, function* () {
    const monthlyRevenue = [];
    let startDate = new Date(year, 0, 1); // January 1 of the given year
    for (let month = 0; month < 12; month++) {
        const endDate = (0, date_fns_1.endOfMonth)(startDate);
        try {
            const revenue = yield model.aggregate([
                {
                    $match: {
                        checkIN: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                        status: { $in: statuses },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$totalAmount" },
                    },
                },
            ]);
            const monthName = startDate.toLocaleDateString("default", {
                month: "short",
            });
            const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;
            monthlyRevenue.push({ month: monthName, revenue: totalRevenue });
            startDate = (0, date_fns_1.addMonths)(startDate, 1);
        }
        catch (error) {
            console.error("Error fetching monthly revenue for model:", model.modelName, error);
            throw new Error(`Error fetching monthly revenue for ${model.modelName}`);
        }
    }
    return monthlyRevenue;
});
exports.getMonthlyRevenue = getMonthlyRevenue;
// Function to filter bookings within the last week or month and count them
const getBookingCounts = (bookings, startDate) => {
    return bookings.reduce((acc, booking) => {
        const bookingDate = new Date(booking.checkIN);
        if ((0, date_fns_1.isWithinInterval)(bookingDate, { start: startDate, end: new Date() })) {
            acc[booking.roomId] = (acc[booking.roomId] || 0) + 1;
        }
        return acc;
    }, {});
};
