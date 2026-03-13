import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import Login from "../Pages/login/Login";
import Signup from "../Pages/Signup/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileNav from "./MobileNav";

const Navbar = () => {
  let isAuth = JSON.parse(localStorage.getItem("auth")) || false;
  let userdata = JSON.parse(localStorage.getItem("userData")) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    toast.success("Logout Successful!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <Box position="sticky" top="0" zIndex="1000" bg="white" boxShadow="sm">
      <ToastContainer />

      {/* Announcement bar */}
      <Box bg="black" color="white" textAlign="center" py="2" fontSize="12px" letterSpacing="0.1em">
        FREE SHIPPING ON ORDERS ABOVE ₹999 · TRY AT HOME — 5 FRAMES FREE
      </Box>

      {/* Desktop Navbar */}
      <Box
        display={{ base: "none", xl: "block" }}
        px={{ xl: "40px", "2xl": "80px" }}
        py="3"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Flex align="center" justify="space-between">

          {/* Left nav links */}
          <HStack spacing="8" flex="1">
            <Link as={RouterLink} to="/eyeglasses" fontSize="13px" letterSpacing="0.08em" color="gray.700" _hover={{ color: "black" }}>
              EYEGLASSES
            </Link>
            <Link as={RouterLink} to="/eyeglasses" fontSize="13px" letterSpacing="0.08em" color="gray.700" _hover={{ color: "black" }}>
              SUNGLASSES
            </Link>
            <Link as={RouterLink} to="/eyeglasses" fontSize="13px" letterSpacing="0.08em" color="gray.700" _hover={{ color: "black" }}>
              CONTACT LENSES
            </Link>
          </HStack>

          {/* Logo center - text based */}
          <Box flex="1" textAlign="center">
            <RouterLink to="/">
              <Text
                fontSize="22px"
                letterSpacing="0.15em"
                fontWeight="400"
                fontFamily="'Cormorant Garamond', serif"
                display="inline"
              >
                CLEAR <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Vision</span>
              </Text>
            </RouterLink>
          </Box>

          {/* Right icons */}
          <HStack spacing="6" flex="1" justify="flex-end">
            <Box cursor="pointer" color="gray.700" _hover={{ color: "black" }}>
              <AiOutlineSearch fontSize="20px" />
            </Box>

            {isAuth ? (
              <>
                <Text fontSize="13px" color="gray.700">
                  Hi, {userdata.name?.split(" ")[0] || "User"}
                </Text>
                {userdata.role === "admin" && (
                  <Link as={RouterLink} to="/admindashboard" fontSize="13px" letterSpacing="0.08em" color="gray.700" _hover={{ color: "black" }}>
                    ADMIN
                  </Link>
                )}
                <Link as={RouterLink} to="/myorders" fontSize="13px" letterSpacing="0.08em" color="gray.700" _hover={{ color: "black" }}>
                  MY ORDERS
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  fontSize="13px"
                  letterSpacing="0.08em"
                  onClick={handleLogout}
                >
                  SIGN OUT
                </Button>
              </>
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}

            <RouterLink to="/cart">
              <Box color="gray.700" _hover={{ color: "black" }}>
                <HiShoppingBag fontSize="22px" />
              </Box>
            </RouterLink>
          </HStack>

        </Flex>
      </Box>

      {/* Mobile Navbar */}
      <MobileNav />
    </Box>
  );
};

export default Navbar;
