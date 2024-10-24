import { Button, Flex, Pagination, Table } from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import { IconFileDescription, IconSearch } from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";
import { useGetAllBookingQuery } from "../../redux/RTK_Query/bookingSlice";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const Bookings = () => {
  const { data = [] } = useGetAllBookingQuery();
  const [searchBooking, setSearchBooking] = useState<string>("");

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
          onchange={(e) => setSearchBooking(e.target.value)}
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
              {booking
                .filter((r) =>
                  searchBooking === ""
                    ? r
                    : r.guestName
                        .toLowerCase()
                        .includes(searchBooking.toLowerCase()) && r,
                )
                .map((item) => (
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
                      <Link to={`/bookings/${item._id}`}>
                        <Button radius={"md"} p={6} bg={"#1a7a7e"}>
                          <IconFileDescription size={24} />
                        </Button>
                      </Link>
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
