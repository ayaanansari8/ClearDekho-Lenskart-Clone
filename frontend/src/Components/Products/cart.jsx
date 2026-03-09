// src/Components/Products/cart.jsx
import React from "react";
import {
  Box, Flex, Text, Button, VStack, HStack, Image,
  Divider, IconButton, Container,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// ── swap these imports for your actual Redux actions ──────────────────────────
// import { removeFromCart, updateCartQuantity } from "../../redux/cartReducer/action";
// ─────────────────────────────────────────────────────────────────────────────

const RemoveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Adjust selector to match your store shape
  const cartItems = useSelector(
    (state) => state.cart?.cartItems || state.cartReducer?.cartItems || []
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || item.discountPrice || 0) * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleRemove = (id) => {
    // dispatch(removeFromCart(id));
    console.log("Remove item:", id);
  };

  const handleQuantity = (id, qty) => {
    if (qty < 1) return;
    // dispatch(updateCartQuantity({ id, quantity: qty }));
    console.log("Update qty:", id, qty);
  };

  if (cartItems.length === 0) {
    return (
      <Box minH="70vh" bg="surface.warm">
        <Container maxW="1200px" py="20">
          <VStack spacing="6" textAlign="center">
            <Text
              fontFamily="'Cormorant Garamond', serif"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="400"
              color="ink.primary"
            >
              Your cart is empty
            </Text>
            <Text color="ink.muted" fontFamily="'DM Sans', sans-serif" fontSize="sm">
              Discover our curated collection of premium eyewear.
            </Text>
            <Button
              as={RouterLink}
              to="/eyeglasses"
              variant="solid"
              size="lg"
              mt="4"
            >
              Shop Eyeglasses
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="70vh" bg="surface.warm">
      {/* Header */}
      <Box borderBottom="1px solid" borderColor="surface.border" bg="white">
        <Container maxW="1200px" py="8">
          <Text
            fontFamily="'Cormorant Garamond', serif"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="400"
            color="ink.primary"
            letterSpacing="0.02em"
          >
            Shopping Cart
            <Text as="span" fontSize="xl" color="ink.muted" ml="3" fontFamily="'DM Sans', sans-serif" fontWeight="300">
              ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
            </Text>
          </Text>
        </Container>
      </Box>

      <Container maxW="1200px" py="10">
        <Flex gap="10" direction={{ base: "column", lg: "row" }}>

          {/* Cart Items */}
          <Box flex="1">
            <VStack spacing="0" align="stretch">
              {cartItems.map((item, i) => (
                <Box key={item._id || item.id || i}>
                  <Flex py="6" gap="5" align="flex-start">
                    {/* Image */}
                    <Box
                      w="100px"
                      h="80px"
                      flexShrink="0"
                      bg="surface.card"
                      overflow="hidden"
                    >
                      <Image
                        src={item.image || item.images?.[0] || "https://via.placeholder.com/100x80"}
                        alt={item.name || item.productName}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>

                    {/* Details */}
                    <Box flex="1">
                      <Text
                        fontFamily="'Cormorant Garamond', serif"
                        fontSize="lg"
                        fontWeight="500"
                        color="ink.primary"
                        lineHeight="1.2"
                      >
                        {item.name || item.productName || "Eyewear Frame"}
                      </Text>
                      {item.brand && (
                        <Text fontSize="xs" color="ink.muted" fontFamily="'DM Sans', sans-serif" letterSpacing="0.08em" textTransform="uppercase" mt="1">
                          {item.brand}
                        </Text>
                      )}

                      {/* Quantity + Remove */}
                      <HStack mt="4" spacing="4">
                        <HStack spacing="0" border="1px solid" borderColor="surface.border">
                          <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label="Decrease"
                            borderRadius="0"
                            onClick={() => handleQuantity(item._id || item.id, (item.quantity || 1) - 1)}
                            icon={<Text fontSize="lg" lineHeight="1">−</Text>}
                          />
                          <Text
                            px="3"
                            fontSize="sm"
                            fontFamily="'DM Sans', sans-serif"
                            minW="8"
                            textAlign="center"
                          >
                            {item.quantity || 1}
                          </Text>
                          <IconButton
                            size="xs"
                            variant="ghost"
                            aria-label="Increase"
                            borderRadius="0"
                            onClick={() => handleQuantity(item._id || item.id, (item.quantity || 1) + 1)}
                            icon={<Text fontSize="lg" lineHeight="1">+</Text>}
                          />
                        </HStack>

                        <IconButton
                          size="sm"
                          variant="ghost"
                          aria-label="Remove"
                          color="ink.muted"
                          _hover={{ color: "red.500" }}
                          onClick={() => handleRemove(item._id || item.id)}
                          icon={<RemoveIcon />}
                        />
                      </HStack>
                    </Box>

                    {/* Price */}
                    <Text
                      fontFamily="'Cormorant Garamond', serif"
                      fontSize="xl"
                      fontWeight="500"
                      color="ink.primary"
                      flexShrink="0"
                    >
                      ₹{((item.price || item.discountPrice || 0) * (item.quantity || 1)).toLocaleString()}
                    </Text>
                  </Flex>
                  <Divider borderColor="surface.border" />
                </Box>
              ))}
            </VStack>

            <Button
              as={RouterLink}
              to="/eyeglasses"
              variant="outline"
              size="sm"
              mt="6"
              fontFamily="'DM Sans', sans-serif"
              letterSpacing="0.08em"
              borderColor="ink.primary"
              color="ink.primary"
              borderRadius="0"
            >
              ← Continue Shopping
            </Button>
          </Box>

          {/* Order Summary */}
          <Box w={{ base: "full", lg: "360px" }} flexShrink="0">
            <Box bg="white" border="1px solid" borderColor="surface.border" p="6">
              <Text
                fontFamily="'Cormorant Garamond', serif"
                fontSize="xl"
                fontWeight="500"
                color="ink.primary"
                mb="5"
                letterSpacing="0.02em"
              >
                Order Summary
              </Text>

              <VStack spacing="3" align="stretch">
                <Flex justify="space-between">
                  <Text fontSize="sm" color="ink.secondary" fontFamily="'DM Sans', sans-serif">Subtotal</Text>
                  <Text fontSize="sm" fontFamily="'DM Sans', sans-serif" color="ink.primary">₹{subtotal.toLocaleString()}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm" color="ink.secondary" fontFamily="'DM Sans', sans-serif">Shipping</Text>
                  <Text fontSize="sm" fontFamily="'DM Sans', sans-serif" color={shipping === 0 ? "green.500" : "ink.primary"}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </Text>
                </Flex>
                {shipping > 0 && (
                  <Text fontSize="xs" color="ink.muted" fontFamily="'DM Sans', sans-serif">
                    Free shipping on orders above ₹999
                  </Text>
                )}
              </VStack>

              <Divider my="4" borderColor="surface.border" />

              <Flex justify="space-between" mb="6">
                <Text fontFamily="'Cormorant Garamond', serif" fontSize="lg" fontWeight="500">Total</Text>
                <Text fontFamily="'Cormorant Garamond', serif" fontSize="xl" fontWeight="500">₹{total.toLocaleString()}</Text>
              </Flex>

              <Button
                w="full"
                size="lg"
                variant="solid"
                onClick={() => navigate("/payment")}
                fontFamily="'DM Sans', sans-serif"
                letterSpacing="0.1em"
                borderRadius="0"
                h="14"
              >
                Proceed to Checkout
              </Button>

              <Text fontSize="xs" color="ink.muted" textAlign="center" mt="3" fontFamily="'DM Sans', sans-serif">
                Secure checkout · Free returns
              </Text>
            </Box>
          </Box>

        </Flex>
      </Container>
    </Box>
  );
};

export default Cart;
