import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
const orderRouter = express.Router();
// Admin features
orderRouter.post("/list", allOrders);
orderRouter.post("/status", updateStatus);

// payment features
orderRouter.post("/place", placeOrder);
orderRouter.post("/stripe", placeOrderStripe);
// orderRouter.post("/stripe", verifyStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User features
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe", verifyStripe);
export default orderRouter;
