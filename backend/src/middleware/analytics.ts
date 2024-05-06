import { Model, Document } from "mongoose";
import { startOfMonth, endOfMonth, subMonths, addMonths } from "date-fns";

interface BookingDocument extends Document {
  price: number;
  checkIN: Date;
  status: string;
}

interface MontlyCount {
  month: string;
  count: number;
}
interface MonthlyRevenue {
  month: string;
  revenue: number;
}

// Used to calculate e.g total users of an application
export const getMonthlyCounts = async (model: any, year: number) => {
  const monthlyCounts: MontlyCount[] = [];

  // Start from the first month after the given year to work backwards from there
  let currentDate = new Date(year + 1, 0, 1);

  // Loop over the last 12 months of the specified year
  for (let i = 0; i < 12; i++) {
    const endDate = endOfMonth(subMonths(currentDate, i + 1)); // end of the month for the i-th month before currentDate
    const startDate = startOfMonth(endDate); // start of the same month

    try {
      const monthYear = endDate.toLocaleDateString("default", {
        month: "short",
        year: "numeric",
      });

      const count = await model.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      monthlyCounts.push({ month: monthYear, count });
    } catch (error) {
      console.error("Error fetching monthly counts:", error);
      throw new Error("Error fetching monthly counts");
    }
  }

  // Reverse the array to have the counts from January to December of the year
  return monthlyCounts.reverse();
};

// Used to calculate e.g total revenue of a company

export const getMonthlyRevenue = async (
  model: any,
  year: number,
  statuses: string[],
) => {
  const monthlyRevenue: MonthlyRevenue[] = [];
  let startDate = new Date(year, 0, 1); // January 1 of the given year

  for (let month = 0; month < 12; month++) {
    const endDate = endOfMonth(startDate);

    try {
      const revenue = await model.aggregate([
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
            total: { $sum: "$price" },
          },
        },
      ]);

      const monthName = startDate.toLocaleDateString("default", {
        month: "long",
        year: "numeric",
      });
      const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;
      monthlyRevenue.push({ month: monthName, revenue: totalRevenue });

      startDate = addMonths(startDate, 1);
    } catch (error) {
      console.error(
        "Error fetching monthly revenue for model:",
        model.modelName,
        error,
      );
      throw new Error(`Error fetching monthly revenue for ${model.modelName}`);
    }
  }

  return monthlyRevenue;
};
