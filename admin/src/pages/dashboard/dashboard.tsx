import React, { useState } from "react";
import Layout from "../../components/layout";
import {
  Flex,
  Loader,
  Select,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import LineChartProp from "../../components/LineChartProp";
import {
  IconBedFilled,
  IconBuildingSkyscraper,
  IconCashBanknoteFilled,
  IconVersionsFilled,
} from "@tabler/icons-react";
import TableProps from "../../components/table";
import {
  useGetAllBookingQuery,
  useGetBookingRevenueQuery,
} from "../../redux/RTK_Query/bookingSlice";
import { useGetVacantRoomQuery } from "../../redux/RTK_Query/roomSlice";
import { useGetBookingReportQuery } from "../../redux/RTK_Query/reportSlice";
const Dashboard: React.FC = () => {
  const d = new Date(Date.now());
  const getYear = d.getFullYear().toString();
  const [year, setYear] = useState<string | null>(getYear);
  const { data: allBooking = [], isLoading: bookingLoad } =
    useGetAllBookingQuery();
  const { data, isLoading: revLoad } = useGetBookingRevenueQuery();
  const { data: room, isLoading: roomLoad } = useGetVacantRoomQuery();
  const { data: report } = useGetBookingReportQuery(`${year}`);
  const boxtype = [
    {
      name: "Bookings",
      total: bookingLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : allBooking && allBooking.length <= 0 ? (
        0
      ) : (
        allBooking.length
      ),
      icon: <IconVersionsFilled />,
      color: "#0f87ff",
    },
    {
      name: "Vacant Rooms",
      total: roomLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : room && room?.vacantRooms.length <= 0 ? (
        0
      ) : (
        room && room?.vacantRooms.length
      ),
      icon: <IconBedFilled />,
      color: "#d62828",
    },
    {
      name: "Total Revenue (NGN)",
      total: revLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : data && data.total <= 0 ? (
        0
      ) : (
        data &&
        data?.total?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      ),
      icon: <IconCashBanknoteFilled />,
      color: "#0cd488",
    },
    {
      name: "Todays Bookings",
      total: roomLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : room && room?.bookedRooms.length <= 0 ? (
        0
      ) : (
        room?.bookedRooms.length
      ),
      icon: <IconBuildingSkyscraper />,
      color: "#d81159",
    },
  ];
  return (
    <Layout>
      <>
        <SimpleGrid
          w={"100%"}
          h={"fit-content"}
          cols={{ base: 2, md: 2, lg: 4 }}
          spacing={10}
          pb={10}>
          {boxtype.map((a) => (
            <Flex
              key={a.name}
              bg={"#fdfffc"}
              px={10}
              py={20}
              gap={5}
              align={"center"}
              style={{ borderRadius: 12 }}>
              <Flex
                w={"100%"}
                h={"100%"}
                direction={"column"}
                align={"flex-start"}>
                <Text
                  c={"#293d40"}
                  fz={{ base: 14, md: 14.2, lg: 14.5 }}
                  fw={600}>
                  {a.name}
                </Text>
                <Text fz={{ base: 16, md: 20, lg: 21 }} c={"#172a3a"} fw={600}>
                  {a.total}
                </Text>
              </Flex>
              <ThemeIcon variant='light' radius='lg' size='xl' color={a.color}>
                {a.icon}
              </ThemeIcon>
            </Flex>
          ))}
        </SimpleGrid>
        <SimpleGrid w={"100%"} cols={{ base: 1, md: 1, lg: 2 }} spacing={10}>
          <Flex
            w={"100%"}
            h={"67vh"}
            bg={"#fdfffc"}
            direction={"column"}
            p={10}
            style={{ borderRadius: 12 }}>
            <Flex w={"100%"} pb={5} justify={"space-between"} align={"center"}>
              <Text c={"#172a3a"} fw={600}>
                Booking Analysis
              </Text>
              <Select
                radius={"lg"}
                fw={500}
                value={year}
                onChange={(e) => setYear(e)}
                data={["2024", "2025", "2026", "2027"]}
              />
            </Flex>
            <LineChartProp data={report} name='total' datakey='month' />
          </Flex>
          <Flex
            w={"100%"}
            h={"67vh"}
            bg={"#fdfffc"}
            direction={"column"}
            p={10}
            style={{ borderRadius: 12 }}>
            <Flex w={"100%"} pb={5}>
              <Text c={"#172a3a"} fw={600}>
                Recent Booking
              </Text>
            </Flex>
            <TableProps />
          </Flex>
        </SimpleGrid>
      </>
    </Layout>
  );
};
export default Dashboard;
