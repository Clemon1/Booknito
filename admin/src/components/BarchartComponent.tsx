import { BarChart } from "@mantine/charts";

interface IReportRevenue {}
type barProps = {
  data: Array<IReportRevenue>;
  name: string;
};
export const BarchartComp = ({ data, name }: barProps) => {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey='month'
      withLegend
      series={[{ name: name, color: "purple" }]}
      tickLine='y'
    />
  );
};
