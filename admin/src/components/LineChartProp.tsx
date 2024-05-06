/* eslint-disable @typescript-eslint/no-explicit-any */
import { AreaChart, getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
const LineChartProp = () => {
  const data = [
    {
      date: "Jan 22",
      Bookings: 890,
    },
    {
      date: "Jan 22",
      Bookings: 1090,
    },
    {
      date: "Mar 22",
      Bookings: 2890,
    },
    {
      date: "Mar 23",
      Bookings: 2756,
    },
    {
      date: "Mar 24",
      Bookings: 3322,
    },
    {
      date: "Mar 25",
      Bookings: 3470,
    },
    {
      date: "Mar 26",
      Bookings: 3129,
    },
  ];
  interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
  }

  function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
      <Paper px='md' py='sm' withBorder shadow='md' radius='md'>
        <Text fw={500} mb={5}>
          {label}
        </Text>
        {getFilteredChartTooltipPayload(payload).map((item: any) => (
          <Text key={item.name} c={item.color} fz='sm'>
            {item.name}: {item.value}
          </Text>
        ))}
      </Paper>
    );
  }
  return (
    <AreaChart
      w={"100%"}
      h={"90%"}
      data={data}
      withTooltip={true}
      withLegend={true}
      dataKey='date'
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      series={[{ name: "Bookings", color: "rgb(9, 188, 138)" }]}
      curveType='natural'
      fillOpacity={0.39}
    />
  );
};

export default LineChartProp;
