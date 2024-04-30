import {
  Box,
  Button,
  Flex,
  Image,
  InputLabel,
  Text,
  TextInput,
} from "@mantine/core";
import imgLogo from "../../assets/img/page-3.png";
import { IconLock, IconMail } from "@tabler/icons-react";
const Login = () => {
  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      px={14}
      bg={"#004346"}
      c={"#e2e8f0"}
      direction={"column"}
      align={"center"}>
      <Box w={{ base: "50%", md: "35%", lg: "30%" }} h={"30vh"} bg={"#004346"}>
        <Image h={"100%"} fit='cover' src={imgLogo} alt='Bookinito' />
      </Box>
      <Flex
        w={{ base: "100%", sm: "60%", md: "35%", lg: "32%" }}
        h={"fit-content"}
        p={14}
        direction={"column"}
        bg={"#E7FEFD"}
        style={{
          borderRadius: 12,
        }}>
        <Text ta={"center"} fz={20} fw={700} c='#172a3a'>
          Sign In
        </Text>
        <form
          style={{
            width: "100%",
          }}>
          <Flex w={"100%"} direction={"column"} gap={4} pb={4}>
            <InputLabel fz={17} fw={600} c='#172a3a'>
              Email
            </InputLabel>
            <TextInput
              w={"100%"}
              fz={18}
              fw={500}
              py={8}
              leftSection={<IconMail fontSize={18} />}
              variant='filled'
              radius='md'
              placeholder='Email Address'
            />
          </Flex>
          <Flex w={"100%"} direction={"column"} gap={4} pb={8}>
            <InputLabel fz={17} fw={600} c='#172a3a'>
              Password
            </InputLabel>
            <TextInput
              w={"100%"}
              type='password'
              fz={18}
              py={8}
              fw={500}
              leftSection={<IconLock fontSize={18} />}
              variant='filled'
              radius='md'
              placeholder='Email Address'
            />
          </Flex>

          <Button w={"100%"} bg={"#004346"} p={2} radius={"md"}>
            Login
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
