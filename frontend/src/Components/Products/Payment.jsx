import React, { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, SimpleGrid, Divider } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartReducer/action';
import axios from 'axios';

const darkStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .pay-page { background: #0a0a0a; min-height: 100vh; color: #f5f5f0; }
  .pay-input {
    width: 100%; background: #161616;
    border: 1px solid rgba(255,255,255,0.07);
    color: #f5f5f0; font-family: 'DM Sans', sans-serif; font-size: 13px;
    padding: 12px 14px; outline: none; transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .pay-input:focus { border-color: #C9A84C; }
  .pay-input::placeholder { color: rgba(245,245,240,0.25); }
  .pay-select {
    width: 100%; background: #161616;
    border: 1px solid rgba(255,255,255,0.07);
    color: #f5f5f0; font-family: 'DM Sans', sans-serif; font-size: 13px;
    padding: 12px 14px; outline: none; transition: border-color 0.2s; cursor: pointer;
  }
  .pay-select:focus { border-color: #C9A84C; }
  .pay-select option { background: #161616; }
  .pay-label {
    font-family: 'DM Sans', sans-serif; font-size: 10px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(245,245,240,0.4); display: block; margin-bottom: 8px;
  }
  .pay-method-card {
    border: 1px solid rgba(255,255,255,0.07); padding: 16px 20px;
    cursor: pointer; transition: border-color 0.2s; display: flex;
    align-items: center; gap: 12px;
  }
  .pay-method-card.active { border-color: #C9A84C; }
  .pay-method-card:hover { border-color: rgba(201,168,76,0.4); }
  .pay-radio {
    width: 16px; height: 16px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s;
  }
  .pay-radio.active { border-color: #C9A84C; }
  .pay-radio-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #C9A84C;
  }
  .pay-tag {
    font-family: 'DM Sans', sans-serif; font-size: 9px;
    letter-spacing: 0.1em; padding: 3px 8px; font-weight: 500;
  }
  .pay-progress-track {
    height: 2px; background: rgba(255,255,255,0.07); position: relative; overflow: hidden;
  }
  .pay-progress-fill {
    height: 100%; background: #C9A84C; transition: width 0.4s ease;
  }
  .phone-input-wrapper {
    display: flex; gap: 0;
  }
  .phone-code {
    background: #1e1e1e; border: 1px solid rgba(255,255,255,0.07);
    border-right: none; color: #C9A84C;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    padding: 12px 14px; white-space: nowrap; min-width: 60px;
    display: flex; align-items: center;
  }
`;

const countryCodes = {
  India: '+91',
  'United States': '+1',
  Canada: '+1',
  'United Kingdom': '+44',
  Australia: '+61',
  Germany: '+49',
  France: '+33',
  UAE: '+971',
  Singapore: '+65',
};

const FormField = ({ label, children }) => (
  <Box mb="5">
    <label className="pay-label">{label}</label>
    {children}
  </Box>
);

const ShippingForm = ({ shippingData, setShippingData }) => {
  const handleCountryChange = (e) => {
    setShippingData({ ...shippingData, country: e.target.value });
  };

  return (
    <Box>
      <Text fontFamily="'Bebas Neue', sans-serif" fontSize="32px" letterSpacing="0.04em" color="#f5f5f0" mb="8">Shipping Address</Text>
      <FormField label="Country / Region">
        <select className="pay-select" value={shippingData.country} onChange={handleCountryChange}>
          {Object.keys(countryCodes).map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Street Address">
        <input className="pay-input" type="text" placeholder="House no., Street name"
          value={shippingData.street}
          onChange={e => setShippingData({ ...shippingData, street: e.target.value })} />
      </FormField>
      <SimpleGrid columns={3} spacing="4">
        <FormField label="City">
          <input className="pay-input" type="text" placeholder="Mumbai"
            value={shippingData.city}
            onChange={e => setShippingData({ ...shippingData, city: e.target.value })} />
        </FormField>
        <FormField label="State">
          <input className="pay-input" type="text" placeholder="Maharashtra"
            value={shippingData.state}
            onChange={e => setShippingData({ ...shippingData, state: e.target.value })} />
        </FormField>
        <FormField label="PIN Code">
          <input className="pay-input" type="text" placeholder="400001"
            value={shippingData.pin}
            onChange={e => setShippingData({ ...shippingData, pin: e.target.value })} />
        </FormField>
      </SimpleGrid>
      <FormField label="Phone Number">
        <div className="phone-input-wrapper">
          <span className="phone-code">{countryCodes[shippingData.country] || '+91'}</span>
          <input className="pay-input" type="tel" placeholder="XXXXX XXXXX"
            value={shippingData.phone}
            onChange={e => setShippingData({ ...shippingData, phone: e.target.value })} />
        </div>
      </FormField>
    </Box>
  );
};

const PaymentForm = ({ paymentMethod, setPaymentMethod }) => {
  const [showCVV, setShowCVV] = useState(false);

  const methods = [
    { id: 'razorpay', label: 'Pay Online (Razorpay)', tags: [{ label: 'VISA', bg: '#1a56db' }, { label: 'UPI', bg: '#15803d' }, { label: 'MC', bg: '#e02424' }] },
    { id: 'cod', label: 'Cash on Delivery', tags: [] },
  ];

  return (
    <Box>
      <Text fontFamily="'Bebas Neue', sans-serif" fontSize="32px" letterSpacing="0.04em" color="#f5f5f0" mb="8">Payment</Text>

      <label className="pay-label" style={{ marginBottom: 12 }}>Select Payment Method</label>
      <VStack spacing="3" align="stretch" mb="8">
        {methods.map((m) => (
          <div
            key={m.id}
            className={`pay-method-card ${paymentMethod === m.id ? 'active' : ''}`}
            onClick={() => setPaymentMethod(m.id)}
          >
            <div className={`pay-radio ${paymentMethod === m.id ? 'active' : ''}`}>
              {paymentMethod === m.id && <div className="pay-radio-dot" />}
            </div>
            <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="#f5f5f0" flex="1">{m.label}</Text>
            <HStack spacing="1">
              {m.tags.map((t) => (
                <span key={t.label} className="pay-tag" style={{ background: t.bg, color: 'white' }}>{t.label}</span>
              ))}
            </HStack>
          </div>
        ))}
      </VStack>

      <Divider borderColor="rgba(255,255,255,0.07)" mb="6" />

      {paymentMethod === 'razorpay' && (
        <Box border="1px solid rgba(201,168,76,0.2)" bg="rgba(201,168,76,0.05)" p="5">
          <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="#C9A84C" mb="2" fontWeight="500">Razorpay Secure Checkout</Text>
          <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.4)" lineHeight="1.8">
            You will be redirected to Razorpay's secure payment page. Supports Cards, UPI, Net Banking & Wallets.
          </Text>
        </Box>
      )}

      {paymentMethod === 'cod' && (
        <Box border="1px solid rgba(201,168,76,0.2)" bg="rgba(201,168,76,0.05)" p="5">
          <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="#C9A84C" mb="2" fontWeight="500">Cash on Delivery</Text>
          <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.4)" lineHeight="1.8">Pay with cash when your order is delivered. Additional ₹49 COD fee applies. Available for orders up to ₹10,000.</Text>
        </Box>
      )}
    </Box>
  );
};

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [shippingData, setShippingData] = useState({
    country: 'India', street: '', city: '', state: '', pin: '', phone: ''
  });
  const cartItems = useSelector((state) => state.cartReducer?.cartItems || []);

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const userID = userData._id || userData.id || "guest";
  const userName = userData.name || userData.username || "Guest User";

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const orderPayload = cartItems.map((item) => ({
    title: item.title || item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity || 1,
    status: 'Placed',
    userID,
    userName,
  }));

  const handleRazorpayPayment = async () => {
    try {
      // Load Razorpay script dynamically
      await new Promise((resolve, reject) => {
        if (window.Razorpay) return resolve();
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      // Step 1: Create order on backend
      const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/api/payment/create-order`, {
        amount: totalAmount,
        customerName: userName,
      });
      if (!data.success) throw new Error('Failed to create order');

      // Step 2: Open Razorpay popup
      const options = {
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'ClearVision Optics',
        description: 'Eyewear Purchase',
        order_id: data.order.id,
        handler: async function (response) {
          // Step 3: Verify payment on backend and save order
          try {
            const verifyRes = await axios.post(`${process.env.REACT_APP_BASEURL}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderItems: orderPayload,
            });

            if (verifyRes.data.success) {
              Swal.fire({
                title: 'Payment Successful!',
                text: 'Your order has been placed successfully.',
                icon: 'success',
                confirmButtonColor: '#C9A84C',
                background: '#111',
                color: '#f5f5f0',
              }).then(() => {
                dispatch(clearCart());
                navigate('/myorders');
              });
            }
          } catch (err) {
            Swal.fire({ title: 'Verification Failed', text: 'Please contact support.', icon: 'error', background: '#111', color: '#f5f5f0' });
          }
        },
        prefill: {
          name: userName,
          contact: `${countryCodes[shippingData.country]}${shippingData.phone}`,
        },
        theme: { color: '#C9A84C' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Payment error:', err);
      Swal.fire({ title: 'Payment Failed', text: 'Something went wrong. Please try again.', icon: 'error', background: '#111', color: '#f5f5f0' });
    }
  };

  const handleCOD = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/orders`, orderPayload);
      Swal.fire({
        title: 'Order Placed!',
        text: 'Your order will be delivered in 2–3 business days.',
        icon: 'success',
        confirmButtonColor: '#C9A84C',
        background: '#111',
        color: '#f5f5f0',
      }).then(() => {
        dispatch(clearCart());
        navigate('/myorders');
      });
    } catch (err) {
      console.error('Order save failed:', err);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleCOD();
    }
  };

  return (
    <Box className="pay-page">
      <style>{darkStyles}</style>
      <Box maxW="700px" mx="auto" px={{ base: '6', md: '12' }} py={{ base: '10', md: '16' }}>

        {/* Steps header */}
        <Flex mb="10" align="center" gap="4">
          {['Shipping', 'Payment'].map((s, i) => (
            <React.Fragment key={s}>
              <Flex align="center" gap="2">
                <Box w="6" h="6" bg={step >= i + 1 ? '#C9A84C' : 'transparent'} border="1px solid" borderColor={step >= i + 1 ? '#C9A84C' : 'rgba(255,255,255,0.15)'} display="flex" alignItems="center" justifyContent="center">
                  <Text fontFamily="'DM Sans', sans-serif" fontSize="10px" color={step >= i + 1 ? '#0a0a0a' : 'rgba(245,245,240,0.3)'} fontWeight="600">{i + 1}</Text>
                </Box>
                <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" letterSpacing="0.15em" textTransform="uppercase" color={step >= i + 1 ? '#f5f5f0' : 'rgba(245,245,240,0.3)'}>{s}</Text>
              </Flex>
              {i < 1 && <Box flex="1" h="1px" bg={step > 1 ? '#C9A84C' : 'rgba(255,255,255,0.07)'} />}
            </React.Fragment>
          ))}
        </Flex>

        {/* Progress */}
        <Box mb="10">
          <div className="pay-progress-track">
            <div className="pay-progress-fill" style={{ width: step === 1 ? '50%' : '100%' }} />
          </div>
        </Box>

        {/* Form */}
        <Box mb="10">
          {step === 1
            ? <ShippingForm shippingData={shippingData} setShippingData={setShippingData} />
            : <PaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          }
        </Box>

        {/* Order summary */}
        <Box mb="6" p="4" border="1px solid rgba(255,255,255,0.07)">
          <Text fontFamily="'DM Sans', sans-serif" fontSize="11px" letterSpacing="0.15em" textTransform="uppercase" color="rgba(245,245,240,0.4)" mb="3">Order Summary</Text>
          {cartItems.map((item, i) => (
            <Flex key={i} justify="space-between" mb="2">
              <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="rgba(245,245,240,0.7)">{item.title || item.name} × {item.quantity || 1}</Text>
              <Text fontFamily="'DM Sans', sans-serif" fontSize="12px" color="#f5f5f0">₹{(item.price * (item.quantity || 1)).toLocaleString()}</Text>
            </Flex>
          ))}
          <Divider borderColor="rgba(255,255,255,0.07)" my="3" />
          <Flex justify="space-between">
            <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="#f5f5f0" fontWeight="500">Total</Text>
            <Text fontFamily="'DM Sans', sans-serif" fontSize="13px" color="#C9A84C" fontWeight="500">₹{totalAmount.toLocaleString()}</Text>
          </Flex>
        </Box>

        {/* Buttons */}
        <Flex justify="space-between" pt="6" borderTop="1px solid rgba(255,255,255,0.07)">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
              color: step === 1 ? 'rgba(245,245,240,0.2)' : '#f5f5f0',
              fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', padding: '14px 28px', cursor: step === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Back
          </button>

          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              style={{
                background: '#C9A84C', border: 'none', color: '#0a0a0a',
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 500, padding: '14px 32px', cursor: 'pointer',
              }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              style={{
                background: '#C9A84C', border: 'none', color: '#0a0a0a',
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 500, padding: '14px 32px', cursor: 'pointer',
              }}
            >
              {paymentMethod === 'razorpay' ? 'Pay Now →' : 'Place Order →'}
            </button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}