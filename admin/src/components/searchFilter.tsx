import React, { ReactElement } from "react";
import { Button, Flex, TextInput } from "@mantine/core";

interface ISearchProps {
  PlaceHolder: string;
  BtnName: string;
  IconName: ReactElement;
  children: ReactElement;
}
const SearchFilter: React.FC<ISearchProps> = ({
  PlaceHolder,
  IconName,
  BtnName,
  children,
}) => {
  return (
    <Flex
      w={"100%"}
      h={"5vh"}
      justify={"space-between"}
      gap={4}
      align={"center"}>
      {children}
      <TextInput
        w={"50%"}
        styles={{
          input: {
            background: "#ffffff",
          },
        }}
        fz={18}
        fw={500}
        py={8}
        leftSection={IconName}
        variant='filled'
        radius='md'
        placeholder={PlaceHolder}
      />
      <Button radius={"md"}>{BtnName}</Button>
    </Flex>
  );
};

export default SearchFilter;
