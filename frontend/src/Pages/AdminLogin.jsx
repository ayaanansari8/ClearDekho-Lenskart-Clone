import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/admin/login`, { email, password });
      const { message, token, user } = res.data;

      if (message === "Email is not registerd") {
        toast({
          title: "Email not registered",
          status: "info",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else if (message === "Invalid Password") {
        toast({
          title: "Invalid Password",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      } else if (message === "Admin login successfull") {
        // Store with isAdmin flag so app knows this is an admin session
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("auth", JSON.stringify(true));
        localStorage.setItem("isAdmin", JSON.stringify(true));

        toast({
          title: "Login Successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/admindashboard");
      } else {
        toast({
          title: "Login failed",
          description: message || "Unknown error",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again in some time",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Admin Sign In
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={loading}
                onClick={handleSubmit}
                loadingText="Signing in..."
                size="lg"
                bg={"#11DAAC"}
                color={"white"}
                _hover={{ bg: "#0ec99b" }}
              >
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not registered?{" "}
                <Link href="/adminsignup" color={"blue.400"}>
                  Admin Signup
                </Link>
              </Text>
              <Text align={"center"}>
                <Link href="/" color={"gray.500"} fontSize="sm">
                  ← Back to Home
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
