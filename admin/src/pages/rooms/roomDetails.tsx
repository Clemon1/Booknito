import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Loader,
  NumberFormatter,
  SimpleGrid,
  Text,
} from "@mantine/core";
import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import { useSingleRoomQuery } from "../../redux/RTK_Query/roomSlice";

const RoomDetails = () => {
  const { id } = useParams();
  const { data: room, isLoading } = useSingleRoomQuery(`${id}`);
  console.log("rooms", room);

  return (
    <Layout>
      <>
        <Flex w={"100%"} justify={"center"}>
          {isLoading ? (
            <>
              <Card
                radius={"md"}
                w={"100%"}
                h={"100vh"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Loader color='teal' size='lg' type='dots' />;
              </Card>
            </>
          ) : (
            <Card w={"100%"} h={"fit-content"} radius={"md"} p={5}>
              <Flex w={"100%$"} p={4} direction={"column"} gap={15} flex={1}>
                <Flex
                  w={"100%"}
                  h={"100%"}
                  align={"center"}
                  justify={"space-between"}>
                  <Flex direction={"column"}>
                    <Text fw={700} fz={19}>
                      Room-{room?.roomNumber}
                    </Text>
                    <Badge variant='dot' color='teal' size='xl'>
                      {room?.roomType}
                    </Badge>
                  </Flex>
                  <Flex gap={10} align={"center"}>
                    <Flex direction={"column"} gap={0}>
                      <Text fw={600} fz={18} lh={1}>
                        <NumberFormatter
                          prefix='₦'
                          value={room?.price}
                          thousandSeparator
                        />
                      </Text>
                      <Text fw={600} fz={13} lh={1} c={"rgb(41, 61, 64)"}>
                        per night
                      </Text>
                    </Flex>
                    <Button bg={"teal"} radius={"md"}>
                      Edit Room
                    </Button>
                  </Flex>
                </Flex>
                <SimpleGrid cols={2} w={"100%"} h={"65vh"}>
                  <Box h={"100%"}>
                    <Image
                      w={"100%"}
                      h={"100%"}
                      radius={"md"}
                      src={`http://localhost:4000/${room?.photos?.[0]}`}
                      style={{
                        objectPosition: "center",
                      }}
                    />
                  </Box>
                  <Flex w={"100%"} h={"100%"} gap={4} wrap={"wrap"}>
                    {room?.photos?.map((photo) => (
                      <Image
                        style={{
                          flexGrow: 1,
                          flexBasis: 200,
                        }}
                        radius={"md"}
                        w={150}
                        flex={1}
                        src={`http://localhost:4000/${photo}`}
                        fit='cover'
                      />
                    ))}
                  </Flex>
                </SimpleGrid>
                <SimpleGrid cols={2} w={"100%"} h={"25vh"}>
                  <Flex direction={"column"}>
                    <Text fz={19} fw={600}>
                      Room Amenities
                    </Text>
                    <Flex wrap={"wrap"} gap={10} w={"100%"}>
                      {room?.perks?.flatMap((p) => (
                        <Badge
                          variant='dot'
                          radius={"lg"}
                          color='cyan'
                          c='rgb(23, 42, 58)'
                          fw={600}
                          fz={13}
                          size='lg'
                          style={{
                            flexGrow: 1,
                            flexBasis: 150,
                          }}>
                          {p}
                        </Badge>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex direction={"column"}>
                    <Text fz={19} fw={600}>
                      Description
                    </Text>
                    <Text fz={16} fw={500}>
                      {room?.description}
                    </Text>
                  </Flex>
                </SimpleGrid>
              </Flex>
            </Card>
          )}
        </Flex>
      </>
    </Layout>
  );
};

export default RoomDetails;
