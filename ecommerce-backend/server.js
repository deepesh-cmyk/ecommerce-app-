const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes =
require("./routes/productRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "https://ecommerce-frontend.onrender.com",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});