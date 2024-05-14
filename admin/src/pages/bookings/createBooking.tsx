import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  Select,
  Text,
} from "@mantine/core";
import Layout from "../../components/layout";
import { DateTimePicker } from "@mantine/dates";
import classes from "../../assets/styles/demo.module.css";
import { useState } from "react";

const CreateBooking = () => {
  const [active, setActive] = useState(0);
  const [fullname, setFullname] = useState("");
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <Layout>
      <>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Flex
            w={"80%"}
            direction={"column"}
            px={50}
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
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <Select
                      label='Gender'
                      variant='filled'
                      radius='md'
                      w={"50%"}
                      placeholder='Select gender'
                      data={["Male", "Female", "Others"]}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Address'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Occupation'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Email Address'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Phone Number'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Nationality'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Passport Number'
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
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
                      data={["Male", "Female", "Others"]}
                    />
                    <TextInput
                      radius='md'
                      w={"50%"}
                      label='Price (NGN)'
                      value={0}
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
                      placeholder='Pick date and time'
                    />
                    <DateTimePicker
                      w={"50%"}
                      variant='filled'
                      valueFormat='DD MMM YYYY hh:mm A'
                      label='Check-Out'
                      placeholder='Pick date and time'
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"50%"}
                      variant='filled'
                      label='Discount (NGN)'
                      value={0}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"50%"}
                      variant='filled'
                      label='No of Guests'
                      value={0}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                </Flex>
              </Stepper.Step>
              <Stepper.Step label='Review' description='Review'>
                <Flex>{fullname}</Flex>
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
              {active === 3 ? (
                <Button bg={"teal"} radius={"md"}>
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
