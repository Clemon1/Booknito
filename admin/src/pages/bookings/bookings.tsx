import { Button, Flex, Pagination, Table } from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";
import { useGetAllBookingQuery } from "../../redux/RTK_Query/bookingSlice";
import { format } from "date-fns";
const Bookings = () => {
  const { data = [] } = useGetAllBookingQuery();

  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const items = chunk(data, 8);
  const [activePage, setPage] = useState<number>(1);
  console.log(items);
  const booking = items[activePage - 1] || [];

  return (
    <Layout>
      <Flex w={"100%"} direction={"column"} gap={10} px={10}>
        <SearchFilter
          PlaceHolder='Search Booking ID, Name or RoomNo'
          IconName={<IconSearch fontSize={18} />}
          link='/newbooking'
          BtnName='New Bookings'>
          <></>
        </SearchFilter>
        <Flex
          w={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}>
          <Table striped stripedColor='#ffffff'>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Customer Name</Table.Th>
                <Table.Th>Room NO</Table.Th>
                <Table.Th>Price(NGN)</Table.Th>
                <Table.Th>Discount(NGN)</Table.Th>
                <Table.Th>Refund(NGN)</Table.Th>
                <Table.Th>Balance(NGN)</Table.Th>
                <Table.Th>Check-In</Table.Th>
                <Table.Th>Check-Out</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {booking.map((item) => (
                <Table.Tr key={item._id}>
                  <Table.Td>{item.guestName}</Table.Td>
                  <Table.Td>
                    {item && item.roomId && item.roomId.roomNumber}
                  </Table.Td>
                  <Table.Td>{item.price}</Table.Td>
                  <Table.Td>{item.discountAmount}</Table.Td>
                  <Table.Td>{item.refundAmount}</Table.Td>
                  <Table.Td>{item.totalAmount}</Table.Td>
                  <Table.Td>
                    {item.checkIN
                      ? format(new Date(item.checkIN), "yyyy-MM-dd")
                      : "-"}
                  </Table.Td>
                  <Table.Td>
                    {item.checkOUT
                      ? format(new Date(item.checkOUT), "yyyy-MM-dd")
                      : "-"}
                  </Table.Td>
                  <Table.Td>
                    <Button radius={"md"} bg={"#1a7a7e"}>
                      E
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Pagination
            total={items?.length}
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
