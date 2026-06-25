const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
// Register API
router.post("/register", async (req, res) => {

  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
  name,
  email,
  password: hashedPassword,
  role
});

  await user.save();

  res.json({
    message: "User Registered"
  });

});

// Paste Step 6 here ↓

// Login API
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Password"
    });
  }

  const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  "mysecretkey",
  { expiresIn: "1d" }
);

  res.json({ token });

});
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route Accessed"
    });
});
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);
module.exports = router;