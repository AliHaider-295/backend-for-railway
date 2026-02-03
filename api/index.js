import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import orderRouter from "../routes/orderRoute.js";

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://mega-mart-frontend-vercel.vercel.app", "http://localhost:5173"],
  credentials: true
}));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Api Working");
});

// --- Connect DB and Cloudinary safely for serverless ---
let isDBConnected = false;
async function initServices() {
  if (!isDBConnected) {
    try {
      await connectDB();
      console.log("MongoDB connected");
      await connectCloudinary();
      console.log("Cloudinary connected");
      isDBConnected = true;
    } catch (err) {
      console.error("Initialization error:", err);
    }
  }
}

// Export as default for Vercel
export default async function handler(req, res) {
  // Initialize services on first request
  await initServices();

  // Pass request to Express app
  app(req, res);
}
