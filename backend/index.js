import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
