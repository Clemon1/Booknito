import {
  Button,
  Flex,
  Loader,
  Pagination,
  SimpleGrid,
  Table,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import {
  IconBedFilled,
  IconEdit,
  IconSearch,
  IconTrashFilled,
} from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";
import {
  useGetAllRoomQuery,
  useGetVacantRoomQuery,
} from "../../redux/RTK_Query/roomSlice";
import { ModalComp } from "../../components/modal";
const Rooms = () => {
  const { data: available, isLoading: roomLoad } = useGetVacantRoomQuery();
  const { data: rooms = [], isLoading } = useGetAllRoomQuery();
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const item = chunk(rooms, 10);
  console.log(item);
  const [activePage, setPage] = useState<number>(1);
  const getRooms = item[activePage - 1] || [];
  const boxtype = [
    {
      name: "Vacant Rooms",
      total: roomLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : available && available?.bookedRooms.length <= 0 ? (
        0
      ) : (
        available && available?.vacantRooms.length
      ),
      icon: <IconBedFilled />,
      color: "#00ca7d",
    },

    {
      name: "Total Rooms",
      total: isLoading ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : rooms.length <= 0 ? (
        0
      ) : (
        rooms.length
      ),
      icon: <IconBedFilled />,
      color: "#5a58e9",
    },
    {
      name: "Unavailable Rooms",
      total: roomLoad ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : available && available?.bookedRooms.length <= 0 ? (
        0
      ) : (
        available?.bookedRooms.length
      ),
      icon: <IconBedFilled />,
      color: "#d81159",
    },
  ];
  return (
    <Layout>
      <Flex w={"100%"} direction={"column"} gap={10} px={10}>
        <SimpleGrid
          w={"100%"}
          h={"fit-content"}
          cols={{ base: 1, md: 2, lg: 3 }}
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
        <SearchFilter
          PlaceHolder='Search RoomNo or Filter By Type'
          IconName={<IconSearch fontSize={18} />}
          link='/newroom'
          BtnName='New Room'>
          <>
            <ModalComp />
          </>
        </SearchFilter>
        <Flex
          w={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>RoomNo</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Price(NGN)</Table.Th>
                <Table.Th>Max Guest</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getRooms.map((room) => (
                <Table.Tr key={room._id}>
                  <Table.Td>{room.roomNumber}</Table.Td>
                  <Table.Td>{room.roomType}</Table.Td>
                  <Table.Td>{room.price}</Table.Td>
                  <Table.Td>{room.maxGuest}</Table.Td>
                  <Table.Td>
                    <Flex gap={10}>
                      <Button bg={"cyan"} radius={"lg"}>
                        <IconEdit size={20} />
                      </Button>
                      <Button bg={"red"} radius={"lg"}>
                        <IconTrashFilled size={20} />
                      </Button>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Pagination
            total={item.length}
            value={activePage}
            onChange={setPage}
            radius='md'
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Rooms;
