// routes/payment.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { OrderModel } = require("../model/Orders.model");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, orderId, customerName, customerEmail } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `optics_order_${orderId || Date.now()}`,
      notes: {
        customerName: customerName || "Customer",
        customerEmail: customerEmail || "",
        orderId: orderId || "",
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
});

// POST /api/payment/verify
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderItems } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Verify signature using HMAC SHA256
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed. Invalid signature." });
    }

    // Save orders to MongoDB after successful payment
    if (orderItems && orderItems.length > 0) {
      const ordersToSave = orderItems.map(item => ({
        ...item,
        status: "Placed"
      }));
      await OrderModel.insertMany(ordersToSave);
    }

    res.json({
      success: true,
      message: "Payment verified and order saved!",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ success: false, message: "Verification failed", error: error.message });
  }
});

// GET /api/payment/status/:paymentId
router.get("/status/:paymentId", async (req, res) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);
    res.json({
      success: true,
      status: payment.status,
      amount: payment.amount / 100,
      method: payment.method,
      email: payment.email,
      contact: payment.contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch payment", error: error.message });
  }
});

module.exports = router;