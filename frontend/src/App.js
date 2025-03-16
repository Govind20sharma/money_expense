import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MarriedPage from "./pages/MarriedPage";
import Output from "./pages/Output";
import { FinancialDataProvider } from "./context/FinancialDataContext"; // Import the context provider

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  return user ? children : <Navigate to="/login" />; // Redirect to login if user is not authenticated
};

const App = () => {
  return (
    <FinancialDataProvider> {/* Wrap the app with the context provider */}
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/married"
            element={
              <ProtectedRoute>
                <MarriedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/output" element={<Output />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </FinancialDataProvider>
  );
};

export default App;