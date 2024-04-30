import React, { ReactElement } from "react";

import { AppShell, Burger, Flex, Text, List } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCategory,
  IconCalendarFilled,
  IconAnalyzeFilled,
  IconBedFilled,
  IconVersionsFilled,
  IconUsersGroup,
  IconReport,
  IconSettingsFilled,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import AvaterMenu from "./avatarMenu";
interface propType {
  children: ReactElement;
}
const Layout: React.FC<propType> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const navActive = {
    background: "#09bc8a",
    color: "#09bc8a",
  };
  const notActive = {
    background: "inherit",
    color: "inherit",
  };
  return (
    <AppShell
      layout='alt'
      header={{ height: { base: 70, md: 70, lg: 70 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 250 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding='md'>
      <AppShell.Header bg={"#E7FEFD"}>
        <Flex
          w={"100%"}
          h='100%'
          px='md'
          align={"center"}
          justify={"space-between"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Flex
            display={{ base: "flex", md: "none", lg: "none" }}
            w={"100%"}
            h={"100%"}
            gap={3}
            align={"center"}>
            <IconAnalyzeFilled style={{ fontSize: 50, color: "#004346" }} />
            <Text className='logo' c={"#004346"} fw={900} fz={23}>
              bookinito
            </Text>
          </Flex>

          <Flex w={"100%"} align={"center"} justify={"flex-end"}>
            <AvaterMenu
              image='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
              name='Clemon Ezeh'
              email='testmifun@outlook.com'
            />
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar bg={"#004346"} c={"#e2e8f0"} p='sm'>
        <Flex w={"100%"} h={70} px='md' justify={"center"} align={"center"}>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <Flex
            w={"100%"}
            h={"100%"}
            justify={"center"}
            gap={3}
            align={"center"}>
            <IconAnalyzeFilled style={{ fontSize: 50 }} />
            <Text className='logo' c={"#E7FEFE"} fw={900} fz={23}>
              bookinito
            </Text>
          </Flex>
        </Flex>

        <List
          w={"100%"}
          spacing='xs'
          size='sm'
          fz={15}
          c={"#E7FEFE"}
          fw={500}
          center>
          <NavLink
            to={"/"}
            style={({ isActive }) => (isActive ? navActive : notActive)}>
            <List.Item
              w={"100%"}
              h={38}
              style={{
                display: "flex",
                paddingLeft: "3rem",
                gap: 1,
              }}
              icon={<IconCategory style={{ fontSize: 24 }} />}>
              Dashboard
            </List.Item>
          </NavLink>
          <NavLink
            to={"/reservations"}
            style={({ isActive }) => (isActive ? navActive : notActive)}>
            <List.Item
              w={"100%"}
              h={38}
              style={{
                display: "flex",
                paddingLeft: "3rem",
                gap: 1,
              }}
              icon={<IconCalendarFilled style={{ fontSize: 24 }} />}>
              Reservation
            </List.Item>
          </NavLink>
          <NavLink
            to={"/bookings"}
            style={({ isActive }) => (isActive ? navActive : notActive)}>
            <List.Item
              w={"100%"}
              h={38}
              style={{
                display: "flex",
                paddingLeft: "3rem",
                gap: 1,
              }}
              icon={<IconVersionsFilled style={{ fontSize: 24 }} />}>
              Bookings
            </List.Item>
          </NavLink>
          <NavLink
            to={"/rooms"}
            style={({ isActive }) => (isActive ? navActive : notActive)}>
            <List.Item
              w={"100%"}
              h={38}
              style={{
                display: "flex",
                paddingLeft: "3rem",
                gap: 1,
              }}
              icon={<IconBedFilled style={{ fontSize: 24 }} />}>
              Rooms
            </List.Item>
          </NavLink>
          <NavLink
            to={"/staffs"}
            style={({ isActive }) => (isActive ? navActive : notActive)}>
            <List.Item
              w={"100%"}
              h={38}
              style={{
                display: "flex",
                paddingLeft: "3rem",
                gap: 1,
              }}
              icon={<IconUsersGroup style={{ fontSize: 24 }} />}>
              Staffs
            </List.Item>
          </NavLink>
          <List.Item
            w={"100%"}
            h={38}
            style={{
              display: "flex",
              paddingLeft: "3rem",
              gap: 1,
            }}
            icon={<IconReport style={{ fontSize: 24 }} />}>
            Reports
          </List.Item>
          <List.Item
            w={"100%"}
            h={38}
            style={{
              display: "flex",
              paddingLeft: "3rem",
              gap: 1,
            }}
            icon={<IconSettingsFilled style={{ fontSize: 24 }} />}>
            Settings
          </List.Item>
        </List>
      </AppShell.Navbar>
      <AppShell.Main bg={"#E7FEFD"}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
