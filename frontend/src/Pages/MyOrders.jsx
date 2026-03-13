import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Badge,
  Divider,
  Spinner,
  Center,
  Icon,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from "react-icons/fi";

const statusConfig = {
  Placed: { color: "blue", icon: FiClock, label: "Order Placed" },
  Processing: { color: "yellow", icon: FiPackage, label: "Processing" },
  Shipped: { color: "purple", icon: FiTruck, label: "Shipped" },
  Delivered: { color: "green", icon: FiCheckCircle, label: "Delivered" },
};

const OrderCard = ({ order }) => {
  const status = statusConfig[order.status] || statusConfig["Placed"];

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)", transition: "all 0.2s" }}
      transition="all 0.2s"
    >
      <HStack spacing={0} align="stretch">
        <Box w="140px" minW="140px" bg="gray.50" p={3}>
          <Image
            src={order.image}
            alt={order.title}
            w="100%"
            h="110px"
            objectFit="contain"
            fallbackSrc="https://via.placeholder.com/140x110?text=No+Image"
          />
        </Box>

        <Box flex={1} p={4}>
          <Flex justify="space-between" align="flex-start">
            <Box flex={1} mr={3}>
              <Text
                fontWeight="600"
                fontSize="md"
                color="gray.800"
                noOfLines={2}
                lineHeight="1.4"
              >
                {order.title}
              </Text>
              <HStack spacing={4} mt={2}>
                <Text fontSize="sm" color="gray.500">
                  Qty: <Text as="span" fontWeight="600" color="gray.700">{order.quantity}</Text>
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Price: <Text as="span" fontWeight="700" color="teal.600">₹{order.price}</Text>
                </Text>
              </HStack>
              {order.paymentMethod && (
                <Text fontSize="xs" color="gray.400" mt={1}>
                  Payment: {order.paymentMethod}
                </Text>
              )}
            </Box>

            <Badge
              colorScheme={status.color}
              px={3}
              py={1}
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
            >
              <HStack spacing={1}>
                <Icon as={status.icon} boxSize={3} />
                <Text>{order.status || "Placed"}</Text>
              </HStack>
            </Badge>
          </Flex>

          <Divider mt={3} mb={2} />

          <HStack justify="space-between">
            <Text fontSize="xs" color="gray.400">
              Customer: {order.userName}
            </Text>
            <Text fontSize="sm" fontWeight="700" color="gray.800">
              Total: ₹{(order.price * order.quantity).toFixed(2)}
            </Text>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        const userID = userData._id || userData.id || "guest";
        const res = await axios.get(`${process.env.REACT_APP_BASEURL}/orders`);
        const userOrders = res.data.filter(o => o.userID === userID);
        setOrders(userOrders);
      } catch (err) {
        setError("Could not load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="3xl">
        <Box mb={8}>
          <HStack spacing={3} mb={1}>
            <Icon as={FiPackage} boxSize={6} color="teal.500" />
            <Heading size="lg" color="gray.800" fontWeight="700">
              My Orders
            </Heading>
          </HStack>
          <Text color="gray.500" fontSize="sm">
            Track all your ClearDekho purchases
          </Text>
        </Box>

        {!loading && !error && orders.length > 0 && (
          <SimpleGrid columns={2} spacing={4} mb={6}>
            <Box bg="teal.50" borderRadius="xl" p={4} border="1px solid" borderColor="teal.100">
              <Text fontSize="xs" color="teal.600" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
                Total Orders
              </Text>
              <Text fontSize="2xl" fontWeight="800" color="teal.700">{orders.length}</Text>
            </Box>
            <Box bg="purple.50" borderRadius="xl" p={4} border="1px solid" borderColor="purple.100">
              <Text fontSize="xs" color="purple.600" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
                Total Spent
              </Text>
              <Text fontSize="2xl" fontWeight="800" color="purple.700">₹{totalSpent.toFixed(2)}</Text>
            </Box>
          </SimpleGrid>
        )}

        {loading ? (
          <Center py={20}>
            <VStack spacing={3}>
              <Spinner size="xl" color="teal.500" thickness="3px" />
              <Text color="gray.400">Loading your orders...</Text>
            </VStack>
          </Center>
        ) : error ? (
          <Center py={20}>
            <VStack spacing={3}>
              <Icon as={FiPackage} boxSize={10} color="red.300" />
              <Text color="red.400" fontWeight="500">{error}</Text>
            </VStack>
          </Center>
        ) : orders.length === 0 ? (
          <Center py={20}>
            <VStack spacing={4}>
              <Icon as={FiPackage} boxSize={14} color="gray.200" />
              <Text color="gray.400" fontSize="lg" fontWeight="500">No orders yet</Text>
              <Text color="gray.300" fontSize="sm">Your placed orders will appear here</Text>
            </VStack>
          </Center>
        ) : (
          <VStack spacing={4} align="stretch">
            {orders.map((order, i) => (
              <OrderCard key={order._id || i} order={order} />
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default MyOrders;