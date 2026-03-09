import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import {
  Center,
  Heading,
  HStack,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Checkbox,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

const BASE_URL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

const Signup = () => {
  const initial = {
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };

  const [userInfo, setUserInfo] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, phone } = userInfo;
    if (!name || !email || !password || !phone) {
      toast({
        title: "Please fill all required fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();

      if (data.error) {
        Swal.fire({
          icon: "info",
          text: data.error,
          didOpen: () => {
            const container = document.querySelector(".swal2-container");
            if (container) container.style.zIndex = 10000;
          },
        });
      } else if (data.message === "Already Register please login") {
        Swal.fire({
          icon: "error",
          title: "Already Registered",
          text: "This email is already registered. Please login.",
          didOpen: () => {
            const container = document.querySelector(".swal2-container");
            if (container) container.style.zIndex = 10000;
          },
        });
      } else {
        // Success
        toast({
          title: "Account Created!",
          description: "You can now sign in.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setUserInfo(initial);
        onClose();
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
      <Center onClick={onOpen} fontWeight={"400"} fontSize="15px" w="60px" cursor="pointer">
        Sign Up
      </Center>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent w="lg" pt="5" rounded="3xl">
          <ModalCloseButton />
          <ModalBody p={"0px 0px"}>
            <Box m={"5px 45px 20px 45px"}>
              <Heading
                fontFamily={"Times, serif"}
                fontWeight="100"
                fontSize={"26px"}
                mb="20px"
                color={"#333368"}
              >
                Create an Account
              </Heading>

              <Input
                type="text"
                fontSize="16px"
                onChange={handleChange}
                focusBorderColor="rgb(206, 206, 223)"
                name="name"
                placeholder="Enter Your Full Name*"
                h={"45px"}
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 15px 0px"}
                rounded="2xl"
                value={userInfo.name}
              />

              <Input
                fontSize="16px"
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Address"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 25px 0px"}
                rounded="2xl"
                value={userInfo.address}
              />

              <InputGroup w="100%" h="50px" fontSize="18px" borderRadius="xl" mb="14px">
                <InputLeftAddon
                  children="+91"
                  h="45px"
                  fontSize="18px"
                  rounded="2xl"
                  bg="whiteAlpha.900"
                />
                <Input
                  onChange={handleChange}
                  type="number"
                  name="phone"
                  placeholder="Mobile*"
                  w="100%"
                  h="45px"
                  fontSize="16px"
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  rounded="2xl"
                  value={userInfo.phone}
                />
              </InputGroup>

              <Input
                onChange={handleChange}
                fontSize="16px"
                name="email"
                placeholder="Email*"
                h={"45px"}
                focusBorderColor="rgb(206, 206, 223)"
                borderColor={"rgb(206, 206, 223)"}
                m={"8px 0px 18px 0px"}
                rounded="2xl"
                value={userInfo.email}
              />

              <InputGroup mb="15px">
                <Input
                  onChange={handleChange}
                  fontSize="16px"
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password*"
                  h={"45px"}
                  focusBorderColor="rgb(206, 206, 223)"
                  borderColor={"rgb(206, 206, 223)"}
                  m={"8px 0px 8px 0px"}
                  rounded="2xl"
                  value={userInfo.password}
                />
                <InputRightElement width="6.5rem" size="lg">
                  <Button
                    size="md"
                    borderRadius="3xl"
                    mt="20%"
                    onClick={() => setShow(!show)}
                    bg="white"
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <HStack>
                <Box
                  textDecoration={"underline"}
                  color={"#333368"}
                  fontSize="14px"
                  cursor="pointer"
                >
                  Got a Referral code?
                </Box>
                <Box color={"#333368"}>(Optional)</Box>
              </HStack>

              <HStack>
                <Checkbox mb={"20px"} mt="20px" size="sm">
                  Get Update on WhatsApp
                </Checkbox>
                <Image
                  src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                  w={"22px"}
                  h="22px"
                />
              </HStack>

              <HStack spacing={"3px"} mb="10px">
                <Box fontSize={"14px"} fontWeight="100" letterSpacing={"-0.4px"}>
                  By creating this account, you agree to our
                </Box>
                <Box fontSize={"15px"} textDecoration="underline" cursor="pointer">
                  Privacy Policy
                </Box>
              </HStack>

              <Button
                isLoading={loading}
                onClick={handleRegister}
                bgColor={"#11daac"}
                width="100%"
                borderRadius={"35px/35px"}
                h="50px"
                _hover={{ backgroundColor: "#11daac" }}
                fontWeight="300"
                fontSize="18px"
              >
                Create an Account
              </Button>

              <Center mt={"14px"} fontSize="15px" gap="2">
                Have an account?{" "}
                <Center fontWeight={"500"} textDecoration="underline" cursor="pointer" onClick={onClose}>
                  Sign In
                </Center>
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signup;
