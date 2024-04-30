import { Avatar, Badge, Card, Flex, Text } from "@mantine/core";

const StaffCard = ({ fullname, role }: { fullname: string; role: string }) => {
  return (
    <Card shadow='sm' radius={"lg"} padding='xl' component='a' target='_blank'>
      <Card.Section
        py={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Avatar
          size={"xl"}
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
        />
      </Card.Section>
      <Flex w={"100%"} direction={"column"} align={"center"}>
        <Text
          fw={500}
          size='md'
          mt='md'
          style={{
            textAlign: "center",
          }}>
          {fullname}
        </Text>

        <Badge
          size='lg'
          variant='gradient'
          gradient={{ from: "teal", to: "indigo", deg: 90 }}>
          {role}
        </Badge>
      </Flex>
    </Card>
  );
};

export default StaffCard;
