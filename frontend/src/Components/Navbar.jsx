// frontend/src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SearchIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const CartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const HeartIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const navLinks = [
  { label: "Eyeglasses", path: "/eyeglasses" },
  { label: "Sunglasses", path: "/sunglasses" },
  { label: "Computer Glasses", path: "/computer-glasses" },
  { label: "Contact Lenses", path: "/contact-lenses" },
  { label: "Kids", path: "/kids" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.cartItems || state.cartReducer?.cartItems || []);
  const user = useSelector((state) => state.auth?.user || state.userReducer?.user || null);
  const cartCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <Box
        bg="ink.primary"
        color="white"
        py="2"
        textAlign="center"
        fontSize="2xs"
        letterSpacing="0.15em"
        fontFamily="'DM Sans', sans-serif"
        textTransform="uppercase"
        display={{ base: "none", md: "block" }}
      >
        Free shipping on orders above ₹999 &nbsp;·&nbsp; Try at home — 5 frames free
      </Box>

      {/* Main Navbar */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="1000"
        bg={isScrolled ? "rgba(255,255,255,0.97)" : "white"}
        backdropFilter={isScrolled ? "blur(12px)" : "none"}
        borderBottom="1px solid"
        borderColor="surface.border"
        transition="all 0.3s ease"
        boxShadow={isScrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none"}
      >
        {/* Desktop layout */}
        <Box display={{ base: "none", lg: "block" }}>
          <Flex
            maxW="1400px"
            mx="auto"
            px="12"
            h="18"
            align="center"
            justify="space-between"
          >
            {/* Logo - desktop */}
            <RouterLink to="/">
              <Box>
                <Text
                  fontFamily="'Cormorant Garamond', serif"
                  fontSize="2xl"
                  fontWeight="500"
                  color="ink.primary"
                  letterSpacing="0.05em"
                  lineHeight="1"
                >
                  CLEAR <Text as="span" color="accent.gold">VISION</Text>
                </Text>
                <Text
                  fontSize="2xs"
                  letterSpacing="0.25em"
                  color="ink.muted"
                  textTransform="uppercase"
                  fontFamily="'DM Sans', sans-serif"
                >
                  Eyewear Atelier
                </Text>
              </Box>
            </RouterLink>

            {/* Desktop nav links */}
            <HStack spacing="8">
              {navLinks.map((link) => (
                <RouterLink key={link.path} to={link.path}>
                  <Text
                    fontSize="xs"
                    fontWeight="400"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    color="ink.secondary"
                    fontFamily="'DM Sans', sans-serif"
                    position="relative"
                    _hover={{ color: "ink.primary" }}
                    sx={{
                      "::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-2px",
                        left: "0",
                        width: "0",
                        height: "1px",
                        bg: "accent.gold",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": { width: "100%" },
                    }}
                  >
                    {link.label}
                  </Text>
                </RouterLink>
              ))}
            </HStack>

            {/* Right icons */}
            <HStack spacing="4">
              <IconButton
                icon={searchOpen ? <CloseIcon boxSize="3" /> : <SearchIcon boxSize="4" />}
                variant="ghost" size="sm" aria-label="Search"
                color="ink.secondary" _hover={{ color: "ink.primary", bg: "surface.card" }}
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <IconButton
                icon={<HeartIcon size={18} />}
                variant="ghost" size="sm" aria-label="Wishlist"
                color="ink.secondary" _hover={{ color: "ink.primary", bg: "surface.card" }}
                as={RouterLink} to="/wishlist"
              />
              <IconButton
                icon={<UserIcon size={18} />}
                variant="ghost" size="sm" aria-label="Account"
                color="ink.secondary" _hover={{ color: "ink.primary", bg: "surface.card" }}
                as={RouterLink} to={user ? "/profile" : "/login"}
              />
              <Box position="relative">
                <IconButton
                  icon={<CartIcon size={18} />}
                  variant="ghost" size="sm" aria-label="Cart"
                  color="ink.secondary" _hover={{ color: "ink.primary", bg: "surface.card" }}
                  as={RouterLink} to="/cart"
                />
                {cartCount > 0 && (
                  <Badge
                    position="absolute" top="-1" right="-1"
                    bg="ink.primary" color="white" borderRadius="full"
                    fontSize="2xs" minW="5" h="5"
                    display="flex" alignItems="center" justifyContent="center"
                    fontFamily="'DM Sans', sans-serif" fontWeight="500"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Box>
            </HStack>
          </Flex>
        </Box>

        {/* Mobile layout */}
        <Box display={{ base: "block", lg: "none" }}>
          <Flex
            px="4"
            h="16"
            align="center"
            justify="space-between"
          >
            {/* Hamburger */}
            <IconButton
              icon={<HamburgerIcon />}
              variant="ghost" size="sm" aria-label="Menu"
              onClick={onOpen} color="ink.primary"
            />

            {/* Logo - mobile, truly centered */}
            <RouterLink to="/">
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="xl"
                fontWeight="500"
                color="ink.primary"
                letterSpacing="0.05em"
                lineHeight="1"
                whiteSpace="nowrap"
              >
                CLEAR <Text as="span" color="accent.gold">VISION</Text>
              </Text>
            </RouterLink>

            {/* Right icons mobile */}
            <HStack spacing="1">
              <IconButton
                icon={<SearchIcon boxSize="4" />}
                variant="ghost" size="sm" aria-label="Search"
                color="ink.secondary"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <Box position="relative">
                <IconButton
                  icon={<CartIcon size={18} />}
                  variant="ghost" size="sm" aria-label="Cart"
                  color="ink.secondary"
                  as={RouterLink} to="/cart"
                />
                {cartCount > 0 && (
                  <Badge
                    position="absolute" top="-1" right="-1"
                    bg="ink.primary" color="white" borderRadius="full"
                    fontSize="2xs" minW="5" h="5"
                    display="flex" alignItems="center" justifyContent="center"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Box>
            </HStack>
          </Flex>
        </Box>

        {/* Search bar */}
        <Box
          overflow="hidden"
          maxH={searchOpen ? "80px" : "0"}
          transition="max-height 0.3s ease"
          borderTop={searchOpen ? "1px solid" : "none"}
          borderColor="surface.border"
          bg="surface.warm"
        >
          <Box maxW="1400px" mx="auto" px={{ base: "4", lg: "12" }} py="4">
            <form onSubmit={handleSearch}>
              <InputGroup maxW="600px" mx="auto">
                <Input
                  placeholder="Search for frames, lenses, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus={searchOpen}
                  fontSize="sm" h="11" bg="white"
                  border="1px solid" borderColor="surface.border"
                  borderRadius="none"
                  _focus={{ borderColor: "ink.primary", boxShadow: "none" }}
                  fontFamily="'DM Sans', sans-serif"
                />
                <InputRightElement h="full" pr="1">
                  <IconButton
                    type="submit" icon={<SearchIcon boxSize="3" />}
                    size="sm" variant="ghost" aria-label="Search" color="ink.muted"
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay bg="rgba(0,0,0,0.4)" />
        <DrawerContent borderRadius="0" bg="surface.warm">
          <DrawerCloseButton mt="2" />
          <DrawerHeader
            fontFamily="'Cormorant Garamond', serif"
            fontSize="xl" fontWeight="500" color="ink.primary"
            borderBottom="1px solid" borderColor="surface.border" pb="4"
          >
            CLEAR <Text as="span" color="accent.gold">VISION</Text>
          </DrawerHeader>
          <DrawerBody px="0">
            <VStack align="stretch" spacing="0">
              {navLinks.map((link) => (
                <Box key={link.path}>
                  <RouterLink to={link.path} onClick={onClose}>
                    <Box px="6" py="4" _hover={{ bg: "surface.card" }} transition="bg 0.2s">
                      <Text
                        fontSize="sm" letterSpacing="0.08em"
                        textTransform="uppercase"
                        fontFamily="'DM Sans', sans-serif"
                        color="ink.secondary" fontWeight="400"
                      >
                        {link.label}
                      </Text>
                    </Box>
                  </RouterLink>
                  <Divider borderColor="surface.border" />
                </Box>
              ))}
            </VStack>
            <Box px="6" pt="8">
              <Button
                variant="solid" size="md" w="full"
                as={RouterLink} to={user ? "/profile" : "/login"}
                onClick={onClose}
              >
                {user ? "My Account" : "Sign In"}
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
