const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../services/userService");
const { generateFinancialAdvice } = require("../services/aiServices");




/// Register
const register = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;

  try {
    const user = await registerUser({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});



// Logout User (Clears client-side token)
const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, username, email, marital_status, salary, rent, food, travel } = req.user;
  res.status(200).json({ _id, username, email, marital_status, salary, rent, food, travel });
});


const Expenses = asyncHandler(async (req, res) => {
  const { marital_status, salary, rent, food, travel, extras } = req.body;

  try {
    const user = req.user; // Ensure req.user is populated by the auth middleware

    // Update user fields
    if (marital_status) user.marital_status = marital_status;
    if (salary) user.salary = salary;
    if (rent) user.rent = rent;
    if (food) user.food = food;
    if (travel) user.travel = travel;
    if (extras) user.extras = extras;

    // Calculate financial metrics
    const totalExpenses = user.rent + user.food + user.travel + user.extras;
    const disposableIncome = user.salary - totalExpenses;

    // Generate AI advice
    const financialAdvice = await generateFinancialAdvice({
      ...user.toObject(),
      totalExpenses,
      disposableIncome,
    });

    await user.save();

    res.status(200).json({
      message: "Expenses updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        marital_status: user.marital_status,
        salary: user.salary,
        expenses: {
          rent: user.rent,
          food: user.food,
          travel: user.travel,
          extras: user.extras,
          total: totalExpenses,
        },
        disposableIncome,
        financialAdvice,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to update expenses",
    });
  }
});
module.exports = { register, login, logout, getUserProfile, Expenses };
