//Analytics based on months
export const getMonthlyCounts = async (model: any, year: any) => {
  const monthlyCounts = [];
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);
  for (let i = 11; i >= 0; i--) {
    const startDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate() - 28,
    );
    const endDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate() - i * 28,
    );
    try {
      const monthYear = endDate.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      //@ts-ignore

      const count = await model.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      monthlyCounts.push({ month: monthYear, count });
    } catch (error) {
      throw new Error("Error fetching monthly counts");
    }
  }

  return monthlyCounts;
};
