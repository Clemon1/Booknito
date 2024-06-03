import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  Select,
  Text,
  InputLabel,
  List,
} from "@mantine/core";
import Layout from "../../components/layout";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../assets/styles/demo.module.css";
import { useState } from "react";
import {
  useGetAllRoomQuery,
  useSingleRoomQuery,
} from "../../redux/RTK_Query/roomSlice";
import { format } from "date-fns";
import { useCreateBookingMutation } from "../../redux/RTK_Query/bookingSlice";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export interface IBookingState {
  guestName: string;
  gender: string;
  address: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  passportNumber: string;
  roomId: string | null;
  discountAmount: number;
  checkIN: Date | null;
  checkOUT: Date | null;
  numOfGuest: number;
  adults: number;
  children: number;
}

const CreateBooking = () => {
  const [guestName, setGuestName] = useState<string>("");
  const [gender, setGender] = useState<string | null>("");
  const [address, setAddress] = useState<string>("");
  const [occupation, setOccupation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [passportNumber, setPassportNumber] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>("");
  const [discountAmount, setDiscount] = useState<number>(0);
  const [numOfGuest, setNumOfGuest] = useState<number>(1);
  const [checkIN, setCheckIn] = useState<Date | null>(null);
  const [checkOUT, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const { data: room = [] } = useGetAllRoomQuery("");
  const { data: singleRoom } = useSingleRoomQuery(roomId);

  const [active, setActive] = useState<number>(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const body = {
    guestName,
    gender,
    address,
    occupation,
    email,
    phoneNumber,
    nationality,
    passportNumber,
    roomId,
    discountAmount,
    checkIN,
    checkOUT,
    numOfGuest,
    adults,
    children,
  };
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  console.log(body);
  const handleCreateBooking = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createBooking(body).unwrap();
      setActive((current) => (current < 3 ? current + 1 : current));

      notifications.show({
        title: "Booked Successfully",
        message: ``,
        icon: <IconCheck size={25} />,
        color: "#006d77",
        withCloseButton: true,
        autoClose: 4000,
        bg: "#e7fefd",
        radius: "lg",
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        notifications.show({
          title: `${error.data}`,
          message: ``,
          icon: <IconX size={25} />,
          color: "#d90429",
          withCloseButton: true,
          autoClose: 4000,
          bg: "#e7fefd",
          radius: "lg",
        });
      }
    }
  };
  return (
    <Layout>
      <>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Flex
            w={{ base: "100%", md: "90%", lg: "80%" }}
            direction={"column"}
            px={{ base: 15, md: 30, lg: 50 }}
            justify={"center"}
            bg={"#fbfdff"}
            py={30}
            style={{
              borderRadius: "12px",
            }}>
            <Stepper
              color='teal'
              radius='lg'
              active={active}
              onStepClick={setActive}>
              <Stepper.Step
                label='Guest Information'
                description='Guest Confidential Data'>
                <Flex
                  w={"100%"}
                  justify={"center"}
                  p={8}
                  gap={8}
                  direction={"column"}>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Full Name'
                      variant='filled'
                      onChange={(e) => setGuestName(e.target.value)}
                      value={guestName}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <Select
                      label='Gender'
                      variant='filled'
                      radius='md'
                      w={"50%"}
                      onChange={setGender}
                      value={gender}
                      placeholder='Select gender'
                      data={["Male", "Female", "Others"]}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Address'
                      variant='filled'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Occupation'
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Email Address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Phone Number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Nationality'
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Passport Number'
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                </Flex>
              </Stepper.Step>
              <Stepper.Step
                label='Room Info'
                description='Add room and date for guest'>
                <Flex
                  w={"100%"}
                  justify={"center"}
                  p={8}
                  gap={8}
                  direction={"column"}>
                  <Flex w={"100%"} gap={20}>
                    <Select
                      label='Select Room'
                      variant='filled'
                      radius='md'
                      w={"50%"}
                      placeholder='Add Room'
                      searchable
                      data={room.map((room) => ({
                        value: room._id,
                        label: room.roomNumber,
                      }))}
                      onChange={(e) => setRoomId(e)}
                      value={roomId}
                    />
                    <TextInput
                      radius='md'
                      w={"50%"}
                      variant='filled'
                      label='Price (NGN)'
                      value={!singleRoom?.price ? 0 : singleRoom.price}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <DateTimePicker
                      w={"50%"}
                      variant='filled'
                      valueFormat='DD MMM YYYY hh:mm A'
                      label='Check-In'
                      onChange={setCheckIn}
                      value={checkIN}
                      placeholder='Pick date and time'
                    />
                    <DateTimePicker
                      w={"50%"}
                      variant='filled'
                      valueFormat='DD MMM YYYY hh:mm A'
                      label='Check-Out'
                      onChange={setCheckOut}
                      value={checkOUT}
                      placeholder='Pick date and time'
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"50%"}
                      variant='filled'
                      type='number'
                      label='Discount (NGN)'
                      value={discountAmount}
                      onChange={(e) => setDiscount(e.target.valueAsNumber)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    {/* Number of guest input */}
                    <Flex w={"50%"} direction={"column"} h={"fit-content"}>
                      <InputLabel ta={"left"}>Number of Guest</InputLabel>
                      <Flex
                        w={"100%"}
                        align={"center"}
                        justify={"space-between"}
                        gap={5}
                        h={"fit-content"}>
                        <Button
                          disabled={numOfGuest === 1}
                          radius={"lg"}
                          fz={18}
                          onClick={() => setNumOfGuest(numOfGuest - 1)}>
                          -
                        </Button>
                        <TextInput
                          radius='md'
                          w={"80%"}
                          variant='filled'
                          type='number'
                          value={numOfGuest}
                          onChange={(e) =>
                            setNumOfGuest(e.target.valueAsNumber)
                          }
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <Button
                          radius={"lg"}
                          fz={18}
                          onClick={() => setNumOfGuest(numOfGuest + 1)}>
                          +
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    {/* Adult Input */}
                    <Flex w={"50%"} direction={"column"} h={"fit-content"}>
                      <InputLabel ta={"left"}>Adults</InputLabel>
                      <Flex
                        w={"100%"}
                        align={"center"}
                        justify={"space-between"}
                        gap={5}
                        h={"fit-content"}>
                        <Button
                          disabled={adults === 1}
                          radius={"lg"}
                          fz={18}
                          onClick={() => setAdults(adults - 1)}>
                          -
                        </Button>
                        <TextInput
                          radius='md'
                          w={"80%"}
                          variant='filled'
                          type='number'
                          value={adults}
                          onChange={(e) => setAdults(e.target.valueAsNumber)}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <Button
                          radius={"lg"}
                          fz={18}
                          onClick={() => setAdults(adults + 1)}>
                          +
                        </Button>
                      </Flex>
                    </Flex>

                    {/* Children Input */}
                    <Flex w={"50%"} direction={"column"} h={"fit-content"}>
                      <InputLabel ta={"left"}>Children</InputLabel>
                      <Flex
                        w={"100%"}
                        align={"center"}
                        justify={"space-between"}
                        gap={5}
                        h={"fit-content"}>
                        <Button
                          disabled={children === 0}
                          radius={"lg"}
                          fz={18}
                          onClick={() => setChildren(children - 1)}>
                          -
                        </Button>
                        <TextInput
                          radius='md'
                          w={"80%"}
                          variant='filled'
                          type='number'
                          value={children}
                          onChange={(e) => setChildren(e.target.valueAsNumber)}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <Button
                          radius={"lg"}
                          fz={18}
                          onClick={() => setChildren(children + 1)}>
                          +
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Stepper.Step>
              <Stepper.Step label='Review' description='Review'>
                <Flex
                  w={"100%"}
                  h={"fit-content"}
                  bg={"#f3f9ff"}
                  justify={"space-between"}
                  px={20}
                  py={15}
                  style={{
                    borderRadius: 20,
                    border: "2px solid gray",
                  }}>
                  <Flex w={"50%"} h={"100%"} gap={5} p={4} direction={"column"}>
                    <Flex
                      w={"100%"}
                      bg={"blue"}
                      justify={"center"}
                      align={"center"}
                      p={10}
                      style={{
                        borderRadius: 7,
                      }}>
                      <Text fw={500} fz={18} c={"#ffffff"}>
                        Customer Details
                      </Text>
                    </Flex>
                    <List size='lg' fz={16} listStyleType='none'>
                      <List.Item>
                        <Text fw={600}>Fullname</Text>
                        {guestName}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Email</Text> {email}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Gender</Text> {gender}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Phone Number</Text>
                        {phoneNumber}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Number of Guest</Text> {numOfGuest}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Address</Text> {address}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Occupation</Text> {occupation}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Nationality</Text> {nationality}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Passport Number</Text> {passportNumber}
                      </List.Item>
                    </List>
                  </Flex>
                  <Flex w={"50%"} h={"100%"} gap={5} p={4} direction={"column"}>
                    <Flex
                      w={"100%"}
                      bg={"teal"}
                      p={10}
                      justify={"center"}
                      align={"center"}
                      style={{
                        borderRadius: 7,
                      }}>
                      <Text fw={500} fz={18} c={"#ffffff"}>
                        Room Details
                      </Text>
                    </Flex>
                    <List size='lg' fz={16} listStyleType='none'>
                      <List.Item>
                        <Text fw={600}>Room Number</Text>
                        {singleRoom?.roomNumber}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Price</Text> {singleRoom?.price} NGN
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Discount</Text> {discountAmount} NGN
                      </List.Item>

                      <List.Item>
                        <Text fw={600}>Number of Adults</Text> {adults}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Number of Children</Text> {children}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Date Check-IN</Text>
                        {checkIN
                          ? format(new Date(checkIN), "yyyy-MM-dd")
                          : "No Check-IN Date"}
                      </List.Item>
                      <List.Item>
                        <Text fw={600}>Date Check-OUT</Text>
                        {checkOUT
                          ? format(new Date(checkOUT), "yyyy-MM-dd")
                          : "No Check-IN Date"}
                      </List.Item>
                      <List.Item>
                        <Text fz={19} fw={600}>
                          Total Amount
                        </Text>{" "}
                        {singleRoom && singleRoom.price - discountAmount} NGN
                      </List.Item>
                    </List>
                  </Flex>
                </Flex>
              </Stepper.Step>
              <Stepper.Completed>
                <Flex w={"100%"} h={"30vh"} justify={"center"} align={"center"}>
                  <Text fz={20} fw={500} ta={"center"}>
                    Completed
                    <br />
                    Return back to booking page
                  </Text>
                </Flex>
              </Stepper.Completed>
            </Stepper>

            <Group justify='center' mt='xl'>
              <Button radius={"md"} variant='default' onClick={prevStep}>
                Back
              </Button>
              {active === 2 ? (
                <Button
                  onClick={handleCreateBooking}
                  bg={"teal"}
                  radius={"md"}
                  loading={isLoading}>
                  Create Booking
                </Button>
              ) : (
                <Button radius={"md"} onClick={nextStep}>
                  Next step
                </Button>
              )}
            </Group>
          </Flex>
        </form>
      </>
    </Layout>
  );
};

export default CreateBooking;
