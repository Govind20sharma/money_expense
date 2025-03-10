const asyncHandler = require("express-async-handler");
const {calculateBudget} =require("../services/budgetService")

const getBudgetPlan = asyncHandler(async (req, res) => {
  const { salary, rent, food, travel, marital_status } = req.body;

  try {
    // Additional expenses for married users (if applicable)
    const additionalExpenses = marital_status === "married" ? 10000 : 0; // Example: Add ₹10,000 for married users

    // Calculate budget
    const budgetPlan = calculateBudget(salary, rent, food, travel, marital_status, additionalExpenses);

    // Send response
    res.status(200).json({
      message: "Budget plan calculated successfully",
      budgetPlan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { getBudgetPlan };