const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true, // Automatically convert to lowercase
      trim: true       // Remove whitespace
    },
    password: { type: String, required: true },
    marital_status: { type: String, default: "single" },
    salary: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    travel: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Convert email to lowercase before saving
userSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase().trim();
  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = mongoose.model("User", userSchema);