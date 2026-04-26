const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET = "mysecretkey"; 

// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation: Ensure password exists before hashing
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ FIXED: Added the password field here
      role,
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    // Send specific error message if email exists
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Signup error", error: err.message });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userData } = user.toJSON();

    res.json({
      message: "Login successful",
      token,
      user: userData
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;