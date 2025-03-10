const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUserProfile,
  updateExpenses,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/userAuthMiddleware");

router.post("/register", register); // ✅ No auth needed
router.post("/login", login); // ✅ No auth needed

// Protected Routes (Require valid JWT token)
router.post("/logout", protect, logout);
router.get("/profile", protect, getUserProfile);
router.put("/expenses", protect, updateExpenses);

module.exports = router;
