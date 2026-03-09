import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Signup from "../Signup/Signup";

const BASE_URL = process.env.REACT_APP_BASEURL || "http://localhost:8080";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
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
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("auth", JSON.stringify(true));
        localStorage.setItem("isAdmin", JSON.stringify(false));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.user,
            token: data.token,
            isAdmin: false,
          },
        });

        toast({
          title: "Login Successful!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        setIsOpen(false);
        setTimeout(() => navigate("/"), 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
          didOpen: () => {
            const container = document.querySelector(".swal2-container");
            if (container) container.style.zIndex = 10000;
          },
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please check your connection and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Center
        onClick={() => setIsOpen(true)}
        fontWeight={"400"}
        fontSize="15px"
        w="80px"
        cursor="pointer"
      >
        Sign In
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        size={{ xl: "md", lg: "md", md: "md", sm: "sm", base: "sm" }}
      >
        <ModalOverlay />
        <ModalContent rounded="3xl">
          <ModalCloseButton
            borderRadius={"50%"}
            bg="white"
            m={"10px 10px 0px 0px"}
          />
          <ModalBody p={"0px 0px"} borderRadius={"15px 15px 15px 15px"}>
            <Image
              src="https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg"
              alt="pic"
              borderRadius={"10px 10px 0px 0px"}
            />
            <Box m={"34px 45px 50px 45px"}>
              <Heading
                fontFamily={"Times, serif"}
                fontWeight="100"
                fontSize={"28px"}
                mb="24px"
                color={"#333368"}
              >
                Sign In
              </Heading>

              <Input
                name="email"
                placeholder="Email"
                h={"50px"}
                fontSize="16px"
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                value={loginData.email}
                onChange={handleChange}
                rounded="2xl"
                mb={"10px"}
              />

              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  h={"50px"}
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  value={loginData.password}
                  onChange={handleChange}
                  rounded="2xl"
                />
                <InputRightElement width="6.5rem" size="lg">
                  <Button
                    size="md"
                    borderRadius="3xl"
                    mt="10%"
                    onClick={() => setShow(!show)}
                    bg="white"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Box m="15px 0px 0px 0px" color="#000042" fontSize="15px" cursor="pointer">
                Forget Password?
              </Box>

              <HStack fontSize="16px">
                <Checkbox mb={"20px"} mt="20px" size="sm">
                  Get Update on WhatsApp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack>

              <Button
                isLoading={loading}
                onClick={handleLogin}
                bgColor={"#11daac"}
                width="100%"
                borderRadius={"35px/35px"}
                h="50px"
                fontSize="18px"
                _hover={{ backgroundColor: "#11daac" }}
              >
                SIGN IN
              </Button>

              <HStack spacing={"0px"} mt="19px" gap="2">
                <Box fontSize={"14px"}>New member?</Box>
                <Link fontSize={"15px"} fontWeight="500" textDecoration={"underline"}>
                  <Signup />
                </Link>
                <Link
                  fontSize={"15px"}
                  fontWeight={"500"}
                  textDecoration={"underline"}
                  href="/adminlogin"
                >
                  Login as Admin?
                </Link>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;

