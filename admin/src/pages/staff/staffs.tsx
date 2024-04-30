import { Flex, SimpleGrid } from "@mantine/core";
import Layout from "../../components/layout";
import StaffCard from "../../components/staffCard";
import React from "react";
import SearchFilter from "../../components/searchFilter";
import { IconSearch } from "@tabler/icons-react";

const Staffs: React.FC = () => {
  return (
    <Layout>
      <Flex w={"100%"} gap={10} direction={"column"}>
        <SearchFilter
          PlaceHolder='Search staff name'
          IconName={<IconSearch fontSize={18} />}
          BtnName='New Staff'
        />
        <SimpleGrid cols={{ base: 2, md: 3, lg: 4 }} spacing={8}>
          <StaffCard fullname='Clemon Ezeh' role='Founder' />
          <StaffCard fullname='Ikenna Ezeh' role='General Manager' />
          <StaffCard fullname='Jennifer Lopez' role='Receptionist' />
          <StaffCard fullname='Mikel Adams' role='Accountant' />
        </SimpleGrid>
      </Flex>
    </Layout>
  );
};

export default Staffs;
