const User = require("../models/userModel");

// Register User
const registerUser = async ({ username, email, password, marital_status, salary, rent, food, travel }) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) throw new Error("User already exists");

    // Create user
    const user = await User.create({
      username,
      email: normalizedEmail,
      password,
      marital_status,
      salary,
      rent,
      food,
      travel,
    });

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      marital_status: user.marital_status,
      salary: user.salary,
      rent: user.rent,
      food: user.food,
      travel: user.travel,
      token: user.generateToken(),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login User
const loginUser = async (email, password) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await user.comparePassword(password.trim());
    if (!isPasswordValid) throw new Error("Invalid email or password");

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      marital_status: user.marital_status,
      salary: user.salary,
      rent: user.rent,
      food: user.food,
      travel: user.travel,
      token: user.generateToken(),
    };
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

module.exports = { registerUser, loginUser };