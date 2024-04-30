import React, { ReactElement } from "react";
import Layout from "../../components/layout";
import { Flex, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import LineChartProp from "../../components/LineChartProp";
import {
  IconBedFilled,
  IconBuildingSkyscraper,
  IconCalendarStats,
  IconVersionsFilled,
} from "@tabler/icons-react";
import TableProps from "../../components/table";

const Dashboard: React.FC = () => {
  interface Ibox {
    name: string;
    total: number;
    icon: ReactElement;
    color: string;
  }

  const boxtype = [
    {
      name: "Bookings",
      total: 280,
      icon: <IconVersionsFilled />,
      color: "#00406c",
    },
    {
      name: "Vacant Rooms",
      total: 25,
      icon: <IconBedFilled />,
      color: "#d62828",
    },
    {
      name: "Today's Guest",
      total: 30,
      icon: <IconCalendarStats />,
      color: "#00b4d8",
    },
    {
      name: "Todays Bookings",
      total: 30,
      icon: <IconBuildingSkyscraper />,
      color: "#d81159",
    },
  ];
  return (
    <Layout>
      <>
        <SimpleGrid cols={{ base: 2, md: 4, lg: 4 }} spacing={10} pb={10}>
          {boxtype.map((a: Ibox) => (
            <Flex
              h={"15vh"}
              bg={"#fdfffc"}
              p={10}
              gap={5}
              align={"center"}
              style={{ borderRadius: 12 }}>
              <Flex
                w={"100%"}
                h={"100%"}
                direction={"column"}
                align={"flex-start"}>
                <Text c={"#293d40"} fz={14} fw={600}>
                  {a.name}
                </Text>
                <Text fz={25} c={"#172a3a"} fw={700}>
                  {a.total}
                </Text>
              </Flex>
              <ThemeIcon variant='light' radius='lg' size='xl' color={a.color}>
                {a.icon}
              </ThemeIcon>
            </Flex>
          ))}
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2, lg: 2 }} spacing={10}>
          <Flex
            w={"100%"}
            h={"65vh"}
            bg={"#fdfffc"}
            direction={"column"}
            p={10}
            style={{ borderRadius: 12 }}>
            <Flex w={"100%"} pb={5}>
              <Text c={"#172a3a"} fw={600}>
                Booking Analysis
              </Text>
            </Flex>
            <LineChartProp />
          </Flex>
          <Flex
            w={"100%"}
            h={"65vh"}
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
