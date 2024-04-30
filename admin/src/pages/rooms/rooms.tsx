import { Button, Flex, Pagination, Table } from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import { IconEdit, IconSearch, IconTrashFilled } from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";

const Rooms = () => {
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
          PlaceHolder='Search RoomNo or Filter By Type'
          IconName={<IconSearch fontSize={18} />}
          BtnName='New Room'
        />
        <Flex w={"100%"} direction={"column"}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>RoomNo</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Max Guest</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>201</Table.Td>
                <Table.Td>Queens BedRoom</Table.Td>
                <Table.Td>N20000</Table.Td>
                <Table.Td>4</Table.Td>
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
            </Table.Tbody>
          </Table>
          <Pagination
            total={10}
            value={activePage}
            onChange={setPage}
            radius='md'
          />
          ;
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Rooms;
