import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Base URL for user-related endpoints
// const EXPENSES_API_URL = "http://localhost:5000/api/users/expenses"; // URL for expenses endpoint

// Register user
const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
  }
  return response.data;
};

// Submit expenses data
const submitExpenses = async (formData) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  const token = user?.token; // Extract the JWT token

  if (!token) {
    throw new Error("User not authenticated. Please log in.");
  }

  try {
    const response = await axios.put(`${API_URL}/expenses`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting expenses:", error);
    throw error; // Throw the error to handle it in the component
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout, submitExpenses };

export default authService;