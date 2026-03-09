// frontend/src/pages/Home/Home.jsx  (or wherever your home page component lives)
// Complete drop-in replacement — only UI, no backend/API changes

import React, { useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Badge,
  Divider,
  AspectRatio,
  SimpleGrid,
  Container,
  Stack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Keep your existing action imports — we're only changing the UI
import { getProducts } from "../../redux/productReducer/action";

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => (
  <Box
    position="relative"
    bg="surface.warm"
    minH={{ base: "90vh", md: "95vh" }}
    overflow="hidden"
  >
    {/* Subtle geometric accent */}
    <Box
      position="absolute"
      top="0"
      right="0"
      w={{ base: "50%", md: "45%" }}
      h="full"
      bg="surface.card"
      zIndex="0"
    />
    <Box
      position="absolute"
      bottom="10%"
      left="8%"
      w="180px"
      h="180px"
      border="1px solid"
      borderColor="surface.border"
      borderRadius="full"
      zIndex="0"
      opacity="0.5"
    />

    <Container maxW="1400px" px={{ base: "6", md: "12" }} position="relative" zIndex="1">
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        minH={{ base: "90vh", md: "95vh" }}
        alignItems="center"
        gap="12"
      >
        {/* Left: Copy */}
        <GridItem>
          <VStack align="flex-start" spacing="8">
            <Badge
              variant="outline"
              borderColor="accent.gold"
              color="accent.gold"
              fontSize="2xs"
              letterSpacing="0.2em"
              px="4"
              py="1.5"
            >
              New Collection 2024
            </Badge>

            <VStack align="flex-start" spacing="4">
              <Heading
                fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
                fontWeight="300"
                color="ink.primary"
                fontFamily="'Cormorant Garamond', serif"
                lineHeight="0.95"
                letterSpacing="-0.02em"
              >
                See the
                <br />
                <Text as="span" fontStyle="italic" color="brand.400">
                  world
                </Text>
                <br />
                clearly.
              </Heading>
            </VStack>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="ink.secondary"
              maxW="420px"
              lineHeight="1.8"
              fontWeight="300"
            >
              Premium eyewear crafted for those who appreciate the intersection
              of precision and beauty. Every frame, a statement.
            </Text>

            <HStack spacing="4" pt="2">
              <Button
                variant="solid"
                size="lg"
                as={RouterLink}
                to="/eyeglasses"
                px="10"
              >
                Shop Eyeglasses
              </Button>
              <Button
                variant="outline"
                size="lg"
                as={RouterLink}
                to="/sunglasses"
                px="10"
              >
                Sunglasses
              </Button>
            </HStack>

            {/* Trust indicators */}
            <HStack spacing="8" pt="4" divider={<Box w="1px" h="8" bg="surface.border" />}>
              {[
                { value: "5,000+", label: "Frame Styles" },
                { value: "Free", label: "Home Trial" },
                { value: "1 Year", label: "Warranty" },
              ].map((item) => (
                <VStack key={item.label} spacing="0.5" align="flex-start">
                  <Text
                    fontSize="xl"
                    fontWeight="500"
                    color="ink.primary"
                    fontFamily="'Cormorant Garamond', serif"
                    lineHeight="1"
                  >
                    {item.value}
                  </Text>
                  <Text fontSize="2xs" color="ink.muted" letterSpacing="0.1em" textTransform="uppercase">
                    {item.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </GridItem>

        {/* Right: Hero image placeholder / product showcase */}
        <GridItem display={{ base: "none", lg: "block" }}>
          <Box position="relative">
            <AspectRatio ratio={4 / 5} maxW="500px" mx="auto">
              <Box
                bg="surface.card"
                borderRadius="none"
                overflow="hidden"
                position="relative"
              >
                {/* Replace with your actual hero image */}
                <Image
                  src="https://images.unsplash.com/photo-1508296695146-257a814070b4"
                  alt="Premium eyewear"
                  objectFit="cover"
                  w="full"
                  h="full"
                  fallback={
                    <Box
                      w="full"
                      h="full"
                      bg="brand.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color="brand.400" fontSize="sm" letterSpacing="0.1em">
                        EYEWEAR
                      </Text>
                    </Box>
                  }
                />
                {/* Price tag overlay */}
                <Box
                  position="absolute"
                  bottom="8"
                  left="8"
                  bg="white"
                  px="5"
                  py="3"
                  boxShadow="0 8px 32px rgba(0,0,0,0.1)"
                >
                  <Text fontSize="2xs" color="ink.muted" letterSpacing="0.1em" textTransform="uppercase" mb="1">
                    Starting from
                  </Text>
                  <Text fontSize="2xl" fontFamily="'Cormorant Garamond', serif" color="ink.primary" fontWeight="500">
                    ₹999
                  </Text>
                </Box>
              </Box>
            </AspectRatio>

            {/* Floating accent card */}
            <Box
              position="absolute"
              top="-4"
              right="-4"
              bg="ink.primary"
              color="white"
              px="5"
              py="4"
              w="140px"
            >
              <Text fontSize="2xs" letterSpacing="0.15em" textTransform="uppercase" opacity="0.6" mb="1">
                Try at home
              </Text>
              <Text fontSize="sm" fontWeight="300" lineHeight="1.4">
                5 frames, free trial
              </Text>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Container>

    {/* Scroll indicator */}
    <Box
      position="absolute"
      bottom="8"
      left="50%"
      transform="translateX(-50%)"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="2"
      opacity="0.4"
    >
      <Box w="1px" h="12" bg="ink.primary" />
      <Text fontSize="2xs" letterSpacing="0.2em" textTransform="uppercase">
        Scroll
      </Text>
    </Box>
  </Box>
);

// ─── Category Grid ────────────────────────────────────────────────────────────
const categories = [
  {
    label: "Eyeglasses",
    sub: "1,200+ styles",
    path: "/eyeglasses",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
    accent: "surface.warm",
  },
  {
    label: "Sunglasses",
    sub: "Premium UV protection",
    path: "/sunglasses",
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    accent: "brand.900",
    dark: true,
  },
  {
    label: "Computer Glasses",
    sub: "Blue light blocking",
    path: "/computer-glasses",
    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    accent: "surface.card",
  },
  {
    label: "Contact Lenses",
    sub: "Daily & monthly",
    path: "/contact-lenses",
    img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    accent: "brand.100",
  },
];

const CategoryGrid = () => (
  <Box py={{ base: "16", md: "24" }} bg="white">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <VStack spacing="12">
        <VStack spacing="3" textAlign="center">
          <Text
            fontSize="2xs"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="ink.muted"
          >
            Collections
          </Text>
          <Heading
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="300"
            letterSpacing="-0.02em"
          >
            Shop by Category
          </Heading>
        </VStack>

        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "repeat(4, 1fr)" }}
          gap={{ base: "3", md: "4" }}
          w="full"
        >
          {categories.map((cat) => (
            <RouterLink key={cat.path} to={cat.path}>
              <Box
                position="relative"
                overflow="hidden"
                role="group"
                cursor="pointer"
              >
                <AspectRatio ratio={3 / 4}>
                  <Box>
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      objectFit="cover"
                      w="full"
                      h="full"
                      transition="transform 0.6s ease"
                      _groupHover={{ transform: "scale(1.04)" }}
                      fallback={<Box w="full" h="full" bg={cat.accent} />}
                    />
                    {/* Gradient overlay */}
                    <Box
                      position="absolute"
                      inset="0"
                      bg="linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)"
                    />
                    {/* Text */}
                    <VStack
                      position="absolute"
                      bottom="6"
                      left="6"
                      align="flex-start"
                      spacing="1"
                    >
                      <Heading
                        fontSize={{ base: "md", md: "xl" }}
                        color="white"
                        fontWeight="400"
                        fontFamily="'Cormorant Garamond', serif"
                      >
                        {cat.label}
                      </Heading>
                      <Text fontSize="2xs" color="whiteAlpha.700" letterSpacing="0.1em" textTransform="uppercase">
                        {cat.sub}
                      </Text>
                    </VStack>
                    {/* Hover arrow */}
                    <Box
                      position="absolute"
                      top="4"
                      right="4"
                      bg="white"
                      w="8"
                      h="8"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      opacity="0"
                      transition="opacity 0.3s ease"
                      _groupHover={{ opacity: 1 }}
                    >
                      <Text fontSize="sm" color="ink.primary">→</Text>
                    </Box>
                  </Box>
                </AspectRatio>
              </Box>
            </RouterLink>
          ))}
        </Grid>
      </VStack>
    </Container>
  </Box>
);

// ─── Featured Products Strip ──────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  // Adjust field names to match your actual product data shape
  const name = product?.name || product?.productName || "Eyewear Frame";
  const price = product?.price || product?.productPrice || 0;
  const image = product?.image || product?.productImage || product?.images?.[0];
  const id = product?._id || product?.id;

  return (
    <Box role="group" cursor="pointer" as={RouterLink} to={`/product/${id}`}>
      <Box overflow="hidden" bg="surface.card" position="relative" mb="4">
        <AspectRatio ratio={1}>
          <Box>
            <Image
              src={image}
              alt={name}
              objectFit="cover"
              w="full"
              h="full"
              transition="transform 0.5s ease"
              _groupHover={{ transform: "scale(1.05)" }}
              fallback={
                <Box w="full" h="full" bg="surface.card" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="xs" color="ink.muted" letterSpacing="0.1em">EYEWEAR</Text>
                </Box>
              }
            />
            {/* Quick add on hover */}
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              bg="white"
              py="3"
              textAlign="center"
              transform="translateY(100%)"
              transition="transform 0.3s ease"
              _groupHover={{ transform: "translateY(0)" }}
              borderTop="1px solid"
              borderColor="surface.border"
            >
              <Text fontSize="2xs" letterSpacing="0.15em" textTransform="uppercase" color="ink.primary" fontWeight="500">
                View Details
              </Text>
            </Box>
          </Box>
        </AspectRatio>
      </Box>
      <VStack align="flex-start" spacing="1" px="1">
        <Text fontSize="sm" color="ink.primary" fontWeight="400" noOfLines={1} fontFamily="'DM Sans', sans-serif">
          {name}
        </Text>
        <HStack spacing="2" align="center">
          <Text fontSize="sm" fontWeight="500" color="ink.primary">
            ₹{price?.toLocaleString?.() || price}
          </Text>
          {product?.originalPrice && (
            <Text fontSize="xs" color="ink.muted" textDecoration="line-through">
              ₹{product.originalPrice}
            </Text>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

const FeaturedProducts = ({ products = [] }) => (
  <Box py={{ base: "16", md: "24" }} bg="surface.warm">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <Flex justify="space-between" align="flex-end" mb="12">
        <VStack align="flex-start" spacing="2">
          <Text fontSize="2xs" letterSpacing="0.25em" textTransform="uppercase" color="ink.muted">
            Handpicked
          </Text>
          <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="300" letterSpacing="-0.02em">
            Featured Frames
          </Heading>
        </VStack>
        <Button
          variant="ghost"
          size="sm"
          as={RouterLink}
          to="/products"
          color="ink.secondary"
          rightIcon={<Text>→</Text>}
          fontSize="xs"
          letterSpacing="0.1em"
          textTransform="uppercase"
          display={{ base: "none", md: "flex" }}
        >
          View All
        </Button>
      </Flex>

      {products.length > 0 ? (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: "4", md: "6" }}>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </SimpleGrid>
      ) : (
        // Skeleton placeholder when no products are loaded yet
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: "4", md: "6" }}>
          {Array(8).fill(null).map((_, i) => (
            <Box key={i}>
              <AspectRatio ratio={1} mb="4">
                <Box bg="surface.card" />
              </AspectRatio>
              <Box h="3" bg="surface.card" mb="2" w="70%" />
              <Box h="3" bg="surface.card" w="40%" />
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Box textAlign="center" mt="10" display={{ base: "block", md: "none" }}>
        <Button variant="outline" size="md" as={RouterLink} to="/products">
          View All Frames
        </Button>
      </Box>
    </Container>
  </Box>
);

// ─── USP Strip ────────────────────────────────────────────────────────────────
const usps = [
  { icon: "✦", title: "Premium Lenses", desc: "Anti-glare, UV protection & blue light blocking built-in." },
  { icon: "◎", title: "Virtual Try-On", desc: "See how any frame looks on your face before buying." },
  { icon: "◇", title: "Home Trial", desc: "Order 5 frames. Try at home for free. Keep what you love." },
  { icon: "⌀", title: "Eye Checkup", desc: "Free eye test at 1000+ partner stores across India." },
];

const USPStrip = () => (
  <Box py={{ base: "14", md: "20" }} bg="ink.primary" color="white">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="0">
        {usps.map((usp, i) => (
          <Box
            key={usp.title}
            px="8"
            py="8"
            borderRight={{ base: "none", lg: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
            borderBottom={{ base: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none", lg: "none" }}
          >
            <Text fontSize="xl" mb="4" opacity="0.5" lineHeight="1">
              {usp.icon}
            </Text>
            <Heading
              fontSize="md"
              fontWeight="400"
              color="white"
              mb="2"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="xl"
            >
              {usp.title}
            </Heading>
            <Text fontSize="xs" color="whiteAlpha.600" lineHeight="1.8" fontWeight="300">
              {usp.desc}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

// ─── Editorial Banner ─────────────────────────────────────────────────────────
const EditorialBanner = () => (
  <Box py={{ base: "16", md: "24" }} bg="white">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="2">
        {/* Left large panel */}
        <Box position="relative" overflow="hidden" role="group" cursor="pointer">
          <AspectRatio ratio={{ base: 4 / 3, lg: 3 / 4 }}>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=80"
                alt="Sunglasses collection"
                objectFit="cover"
                w="full"
                h="full"
                transition="transform 0.7s ease"
                _groupHover={{ transform: "scale(1.03)" }}
                fallback={<Box w="full" h="full" bg="brand.200" />}
              />
              <Box position="absolute" inset="0" bg="rgba(0,0,0,0.25)" />
              <VStack position="absolute" bottom="10" left="10" align="flex-start" spacing="3">
                <Badge bg="accent.gold" color="white" fontSize="2xs" letterSpacing="0.15em">
                  New Arrivals
                </Badge>
                <Heading
                  fontSize={{ base: "2xl", md: "4xl" }}
                  color="white"
                  fontWeight="300"
                  letterSpacing="-0.01em"
                  lineHeight="1.1"
                >
                  Summer
                  <br />
                  Sunglasses '24
                </Heading>
                <Button
                  variant="outline"
                  size="sm"
                  color="white"
                  borderColor="white"
                  _hover={{ bg: "white", color: "ink.primary" }}
                  as={RouterLink}
                  to="/sunglasses"
                >
                  Shop Now
                </Button>
              </VStack>
            </Box>
          </AspectRatio>
        </Box>

        {/* Right two panels stacked */}
        <VStack spacing="2">
          <Box position="relative" overflow="hidden" role="group" cursor="pointer" w="full">
            <AspectRatio ratio={{ base: 4 / 3, lg: 16 / 9 }}>
              <Box>
                <Image
                  src="https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&q=80"
                  alt="Kids eyewear"
                  objectFit="cover"
                  w="full"
                  h="full"
                  transition="transform 0.7s ease"
                  _groupHover={{ transform: "scale(1.03)" }}
                  fallback={<Box w="full" h="full" bg="brand.100" />}
                />
                <Box position="absolute" inset="0" bg="rgba(0,0,0,0.2)" />
                <HStack position="absolute" bottom="6" left="6" justify="space-between" w="calc(100% - 48px)">
                  <Heading fontSize={{ base: "lg", md: "2xl" }} color="white" fontWeight="300">
                    Kids Collection
                  </Heading>
                  <Text color="white" fontSize="sm">→</Text>
                </HStack>
              </Box>
            </AspectRatio>
          </Box>
          <Box position="relative" overflow="hidden" role="group" cursor="pointer" w="full">
            <AspectRatio ratio={{ base: 4 / 3, lg: 16 / 9 }}>
              <Box>
                <Image
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&q=80"
                  alt="Contact lenses"
                  objectFit="cover"
                  w="full"
                  h="full"
                  transition="transform 0.7s ease"
                  _groupHover={{ transform: "scale(1.03)" }}
                  fallback={<Box w="full" h="full" bg="brand.50" />}
                />
                <Box position="absolute" inset="0" bg="rgba(0,0,0,0.2)" />
                <HStack position="absolute" bottom="6" left="6" justify="space-between" w="calc(100% - 48px)">
                  <Heading fontSize={{ base: "lg", md: "2xl" }} color="white" fontWeight="300">
                    Contact Lenses
                  </Heading>
                  <Text color="white" fontSize="sm">→</Text>
                </HStack>
              </Box>
            </AspectRatio>
          </Box>
        </VStack>
      </Grid>
    </Container>
  </Box>
);

// ─── Testimonials ─────────────────────────────────────────────────────────────
const reviews = [
  { name: "Priya S.", rating: 5, text: "The frames are absolutely stunning. Quality rivals luxury brands at a fraction of the price.", location: "Mumbai" },
  { name: "Rahul M.", rating: 5, text: "Home trial changed everything. I found my perfect pair without leaving the house.", location: "Bengaluru" },
  { name: "Aisha K.", rating: 5, text: "Prescription was perfect, delivery was fast, and the packaging felt genuinely premium.", location: "Delhi" },
];

const Testimonials = () => (
  <Box py={{ base: "16", md: "24" }} bg="surface.card">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <VStack spacing="12">
        <VStack spacing="3" textAlign="center">
          <Text fontSize="2xs" letterSpacing="0.25em" textTransform="uppercase" color="ink.muted">
            Reviews
          </Text>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} fontWeight="300" letterSpacing="-0.02em">
            What Our Customers Say
          </Heading>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" w="full">
          {reviews.map((review) => (
            <Box key={review.name} bg="white" p="8" borderTop="2px solid" borderColor="accent.gold">
              <HStack mb="4" spacing="1">
                {Array(review.rating).fill(null).map((_, i) => (
                  <Text key={i} color="accent.gold" fontSize="xs">★</Text>
                ))}
              </HStack>
              <Text
                fontSize="sm"
                color="ink.secondary"
                fontStyle="italic"
                lineHeight="1.8"
                mb="6"
                fontFamily="'Cormorant Garamond', serif"
                fontSize="lg"
                fontWeight="300"
              >
                "{review.text}"
              </Text>
              <Divider mb="4" borderColor="surface.border" />
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="500" color="ink.primary">{review.name}</Text>
                <Text fontSize="2xs" color="ink.muted" letterSpacing="0.1em" textTransform="uppercase">{review.location}</Text>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  </Box>
);

// ─── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <Box bg="ink.primary" color="white" pt={{ base: "14", md: "20" }} pb="8">
    <Container maxW="1400px" px={{ base: "6", md: "12" }}>
      <Grid templateColumns={{ base: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }} gap="8" mb="16">
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <VStack align="flex-start" spacing="4">
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize="2xl"
              fontWeight="500"
              letterSpacing="0.05em"
            >
              CLEAR<Text as="span" color="accent.gold">DEKHO</Text>
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600" maxW="280px" lineHeight="1.8" fontWeight="300">
              Premium eyewear for the discerning. Crafted with precision, worn with confidence.
            </Text>
            <HStack spacing="4" pt="2">
              {["Instagram", "Twitter", "Facebook"].map((social) => (
                <Text
                  key={social}
                  fontSize="2xs"
                  color="whiteAlpha.500"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  cursor="pointer"
                  _hover={{ color: "white" }}
                  transition="color 0.2s"
                >
                  {social}
                </Text>
              ))}
            </HStack>
          </VStack>
        </GridItem>

        {[
          {
            title: "Shop",
            links: ["Eyeglasses", "Sunglasses", "Computer Glasses", "Contact Lenses", "Kids"],
          },
          {
            title: "Services",
            links: ["Home Trial", "Virtual Try-On", "Eye Checkup", "Corporate Orders"],
          },
          {
            title: "Support",
            links: ["Track Order", "Returns", "FAQ", "Contact Us", "Store Locator"],
          },
        ].map((col) => (
          <GridItem key={col.title}>
            <VStack align="flex-start" spacing="4">
              <Text
                fontSize="2xs"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="whiteAlpha.500"
                fontWeight="500"
              >
                {col.title}
              </Text>
              {col.links.map((link) => (
                <Text
                  key={link}
                  fontSize="sm"
                  color="whiteAlpha.700"
                  fontWeight="300"
                  cursor="pointer"
                  _hover={{ color: "white" }}
                  transition="color 0.2s"
                >
                  {link}
                </Text>
              ))}
            </VStack>
          </GridItem>
        ))}
      </Grid>

      <Divider borderColor="whiteAlpha.100" mb="8" />

      <Flex
        justify="space-between"
        align="center"
        flexDir={{ base: "column", md: "row" }}
        gap="4"
      >
        <Text fontSize="2xs" color="whiteAlpha.400" letterSpacing="0.1em">
          © 2024 CLEAR VISION. All rights reserved.
        </Text>
        <HStack spacing="6">
          {["Privacy Policy", "Terms", "Cookies"].map((item) => (
            <Text key={item} fontSize="2xs" color="whiteAlpha.400" cursor="pointer" _hover={{ color: "white" }} letterSpacing="0.05em">
              {item}
            </Text>
          ))}
        </HStack>
      </Flex>
    </Container>
  </Box>
);

// ─── Main Home Component ───────────────────────────────────────────────────────
const Home = () => {
  const dispatch = useDispatch();
  // Adjust selector to match your Redux store shape
  const products = useSelector(
    (state) =>
      state.productReducer?.products ||
      []
  );

  useEffect(() => {
    // Keep your existing dispatch call here, e.g.:
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Box>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts products={products} />
      <USPStrip />
      <EditorialBanner />
      <Testimonials />
      <Footer />
    </Box>
  );
};

export default Home;
