import { Flex, Pagination, Table } from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";

const Bookings = () => {
  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const item = chunk([], 2);
  console.log(item);

  const [activePage, setPage] = useState<number>(1);
  return (
    <Layout>
      <Flex w={"100%"} direction={"column"} gap={10} px={10}>
        <SearchFilter
          PlaceHolder='Search Booking ID, Name or RoomNo'
          IconName={<IconSearch fontSize={18} />}
          BtnName='New Bookings'
        />
        <Flex w={"100%"} direction={"column"}>
          <Table striped stripedColor='#ffffff'>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Booking ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Room NO</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Check-In</Table.Th>
                <Table.Th>Check-Out</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td> 65188f3d4e</Table.Td>
                <Table.Td>Cole Palmer</Table.Td>
                <Table.Td>205</Table.Td>
                <Table.Td>N35000</Table.Td>
                <Table.Td>23/04/2024</Table.Td>
                <Table.Td>28/04/2024</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Pagination
            total={10}
            value={activePage}
            onChange={setPage}
            radius='md'
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Bookings;
