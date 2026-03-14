import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Text, VStack, HStack, Image, Divider,
  Spinner, Flex, SimpleGrid,
} from "@chakra-ui/react";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from "react-icons/fi";

const darkStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .mo-page { background: #0a0a0a; min-height: 100vh; color: #f5f5f0; }
  .mo-card {
    background: #111; border: 1px solid rgba(255,255,255,0.07);
    transition: border-color 0.2s;
  }
  .mo-card:hover { border-color: rgba(201,168,76,0.3); }
  .mo-stat { background: #111; border: 1px solid rgba(255,255,255,0.07); padding: 24px 28px; }

  .cancel-btn {
    background: transparent;
    border: 1px solid rgba(239,68,68,0.4);
    color: rgba(239,68,68,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cancel-btn:hover {
    border-color: #ef4444;
    color: #ef4444;
    background: rgba(239,68,68,0.05);
  }
  .confirm-btn {
    background: #ef4444;
    border: 1px solid #ef4444;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .confirm-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .no-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(245,245,240,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .no-btn:hover { border-color: rgba(255,255,255,0.4); color: #f5f5f0; }
`;

const statusConfig = {
  Placed:     { color: '#C9A84C', label: 'Placed',     icon: FiClock },
  Processing: { color: '#60a5fa', label: 'Processing', icon: FiPackage },
  Shipped:    { color: '#a78bfa', label: 'Shipped',    icon: FiTruck },
  Delivered:  { color: '#34d399', label: 'Delivered',  icon: FiCheckCircle },
  Cancelled:  { color: '#ef4444', label: 'Cancelled',  icon: FiXCircle },
};

const OrderCard = ({ order, onCancel }) => {
  const [confirming, setConfirming] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const status = statusConfig[order.status] || statusConfig['Placed'];
  const StatusIcon = status.icon;
  const canCancel = order.status === 'Placed';

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASEURL}/orders/update/${order._id}`,
        { status: 'Cancelled' }
      );
      onCancel(order._id);
    } catch {
      alert("Could not cancel order. Please try again.");
    } finally {
      setCancelling(false);
      setConfirming(false);
    }
  };

  return (
    <div className="mo-card">
      <Flex>
        {/* Image */}
        <Box w="120px" minW="120px" bg="#161616" flexShrink="0">
          <Image
            src={order.image}
            alt={order.title}
            w="full" h="100px"
            objectFit="contain"
            p="3"
            fallback={
              <Box w="full" h="100px" bg="#161616" display="flex" alignItems="center" justifyContent="center">
                <Text fontSize="9px" color="rgba(245,245,240,0.2)" letterSpacing="0.2em" fontFamily="'DM Sans'">NO IMAGE</Text>
              </Box>
            }
          />
        </Box>

        {/* Info */}
        <Box flex="1" p="5">
          <Flex justify="space-between" align="flex-start" mb="3">
            <Box flex="1" mr="4">
              <Text fontFamily="'Cormorant Garamond', serif" fontSize="lg" fontWeight="400" color="#f5f5f0" lineHeight="1.3" mb="2">
                {order.title}
              </Text>
              <HStack spacing="4">
                <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" color="rgba(245,245,240,0.4)">
                  Qty: <span style={{ color: '#f5f5f0' }}>{order.quantity}</span>
                </Text>
                <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" color="rgba(245,245,240,0.4)">
                  {order.paymentMethod && `via ${order.paymentMethod.toUpperCase()}`}
                </Text>
              </HStack>
            </Box>

            {/* Status badge */}
            <HStack spacing="2" px="3" py="1.5" border="1px solid" borderColor={status.color} flexShrink="0">
              <StatusIcon size={11} color={status.color} />
              <Text fontFamily="'DM Sans', sans-serif" fontSize="10px" letterSpacing="0.15em" textTransform="uppercase" color={status.color} fontWeight="500">
                {order.status || 'Placed'}
              </Text>
            </HStack>
          </Flex>

          <Divider borderColor="rgba(255,255,255,0.07)" mb="3" />

          <Flex justify="space-between" align="center">
            <Box>
              <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" color="rgba(245,245,240,0.35)" mb="2">
                {order.userName}
              </Text>

              {/* Cancel flow */}
              {canCancel && !confirming && (
                <button className="cancel-btn" onClick={() => setConfirming(true)}>
                  Cancel Order
                </button>
              )}

              {canCancel && confirming && (
                <HStack spacing="2">
                  <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" color="rgba(245,245,240,0.5)" mr="1">
                    Sure?
                  </Text>
                  <button className="confirm-btn" onClick={handleCancel} disabled={cancelling}>
                    {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                  </button>
                  <button className="no-btn" onClick={() => setConfirming(false)}>
                    No
                  </button>
                </HStack>
              )}
            </Box>

            <Text fontFamily="'Bebas Neue', sans-serif" fontSize="22px" color="#C9A84C" letterSpacing="0.04em" lineHeight="1">
              ₹{(order.price * order.quantity).toFixed(0)}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </div>
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
        setOrders(res.data.filter((o) => o.userID === userID));
      } catch {
        setError("Could not load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Update order status locally after cancel (no refetch needed)
  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => o._id === orderId ? { ...o, status: 'Cancelled' } : o)
    );
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <Box className="mo-page">
      <style>{darkStyles}</style>

      <Box maxW="900px" mx="auto" px={{ base: '6', md: '12' }} py={{ base: '10', md: '16' }}>
        {/* Heading */}
        <Box mb="10" borderBottom="1px solid rgba(255,255,255,0.07)" pb="8">
          <Text fontFamily="'Bebas Neue', sans-serif" fontSize="clamp(40px,5vw,64px)" letterSpacing="0.02em" color="#f5f5f0" lineHeight="1" mb="2">
            My Orders
          </Text>
          <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.35)" letterSpacing="0.15em" textTransform="uppercase">
            Track all your Clear Vision purchases
          </Text>
        </Box>

        {/* Stats */}
        {!loading && !error && orders.length > 0 && (
          <SimpleGrid columns={2} spacing="3" mb="10">
            <div className="mo-stat">
              <Text fontFamily="'DM Sans', sans-serif" fontSize="10px" color="rgba(245,245,240,0.35)" letterSpacing="0.25em" textTransform="uppercase" mb="2">Total Orders</Text>
              <Text fontFamily="'Bebas Neue', sans-serif" fontSize="42px" color="#C9A84C" letterSpacing="0.04em" lineHeight="1">{orders.length}</Text>
            </div>
            <div className="mo-stat">
              <Text fontFamily="'DM Sans', sans-serif" fontSize="10px" color="rgba(245,245,240,0.35)" letterSpacing="0.25em" textTransform="uppercase" mb="2">Total Spent</Text>
              <Text fontFamily="'Bebas Neue', sans-serif" fontSize="42px" color="#C9A84C" letterSpacing="0.04em" lineHeight="1">₹{totalSpent.toFixed(0)}</Text>
            </div>
          </SimpleGrid>
        )}

        {/* States */}
        {loading ? (
          <Flex py="24" justify="center" align="center" direction="column" gap="4">
            <Spinner size="lg" color="#C9A84C" thickness="2px" />
            <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.3)" letterSpacing="0.15em" textTransform="uppercase">Loading orders...</Text>
          </Flex>
        ) : error ? (
          <Flex py="24" justify="center" align="center" direction="column" gap="4">
            <FiPackage size={40} color="rgba(245,245,240,0.15)" />
            <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="rgba(245,245,240,0.4)">{error}</Text>
          </Flex>
        ) : orders.length === 0 ? (
          <Flex py="24" justify="center" align="center" direction="column" gap="4">
            <FiPackage size={48} color="rgba(245,245,240,0.1)" />
            <Text fontFamily="'Cormorant Garamond', serif" fontSize="2xl" color="rgba(245,245,240,0.25)" fontWeight="300">No orders yet</Text>
            <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.2)">Your placed orders will appear here</Text>
          </Flex>
        ) : (
          <VStack spacing="3" align="stretch">
            {orders.map((order, i) => (
              <OrderCard key={order._id || i} order={order} onCancel={handleCancelOrder} />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MyOrders;