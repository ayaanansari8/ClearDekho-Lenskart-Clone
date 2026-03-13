import React, { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchIcon } from "@chakra-ui/icons";

const EyeglassesList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const products = useSelector(
    (state) => state.productReducer?.products || []
  );

  const filtered = products
    .filter((p) => {
      const name = (p.title || p.name || "").toLowerCase();
      return name.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <Box bg="white" minH="100vh">
      {/* Header */}
      <Box bg="#f9f7f4" borderBottom="1px solid" borderColor="gray.100" py="10">
        <Container maxW="1400px" px={{ base: "6", md: "12" }}>
          <Heading
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="300"
            letterSpacing="-0.02em"
            fontFamily="'Cormorant Garamond', serif"
            mb="2"
          >
            Eyeglasses
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {filtered.length} styles
          </Text>
        </Container>
      </Box>

      {/* Filters bar */}
      <Box borderBottom="1px solid" borderColor="gray.100" py="4">
        <Container maxW="1400px" px={{ base: "6", md: "12" }}>
          <Flex align="center" gap="4" wrap="wrap">
            <InputGroup maxW="280px" size="sm">
              <InputLeftElement>
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search frames..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                border="1px solid"
                borderColor="gray.200"
                _focus={{ borderColor: "black", boxShadow: "none" }}
                borderRadius="none"
              />
            </InputGroup>
            <Spacer />
            <HStack spacing="3">
              <Text fontSize="xs" color="gray.500" letterSpacing="0.08em">
                SORT BY
              </Text>
              <Select
                size="sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="none"
                maxW="180px"
                _focus={{ boxShadow: "none", borderColor: "black" }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Select>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Product Grid */}
      <Container maxW="1400px" px={{ base: "6", md: "12" }} py="12">
        {filtered.length === 0 ? (
          <VStack py="20" spacing="4">
            <Text fontSize="lg" color="gray.400">No products found</Text>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearch("")}
              borderRadius="none"
            >
              Clear Search
            </Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: "4", md: "8" }}>
            {filtered.map((product) => (
              <RouterLink key={product._id} to={`/eyeglasses/${product._id}`}>
                <Box role="group" cursor="pointer">
                  {/* Image */}
                  <Box
                    overflow="hidden"
                    bg="#f9f7f4"
                    mb="4"
                    position="relative"
                  >
                    <Box pb="100%" position="relative">
                      <Image
                        src={product.image}
                        alt={product.title || product.name}
                        position="absolute"
                        top="0" left="0"
                        w="full" h="full"
                        objectFit="contain"
                        p="4"
                        transition="transform 0.4s ease"
                        _groupHover={{ transform: "scale(1.04)" }}
                        fallback={
                          <Box
                            position="absolute"
                            top="0" left="0"
                            w="full" h="full"
                            bg="#f0ede8"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="xs" color="gray.400">No image</Text>
                          </Box>
                        }
                      />
                    </Box>
                    {product.color && (
                      <Badge
                        position="absolute"
                        top="3" left="3"
                        bg="white"
                        color="gray.600"
                        fontSize="2xs"
                        letterSpacing="0.08em"
                        px="2" py="1"
                        fontWeight="400"
                      >
                        {product.color}
                      </Badge>
                    )}
                  </Box>

                  {/* Info */}
                  <VStack align="flex-start" spacing="1">
                    <Text
                      fontSize="xs"
                      color="gray.400"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
                    >
                      {product.shape || "Eyeglasses"}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.800"
                      fontWeight="400"
                      noOfLines={2}
                      lineHeight="1.4"
                    >
                      {product.title || product.name}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="500"
                      color="gray.900"
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize="md"
                    >
                      ₹{(product.price || 0).toLocaleString()}
                    </Text>
                  </VStack>
                </Box>
              </RouterLink>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default EyeglassesList;