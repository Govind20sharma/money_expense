import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MarriedPage from "./pages/MarriedPage";
import Output from "./pages/Output";
// import BachelorPage from "./pages/BachelorPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
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
        {/* <Route
          path="/bachelor"
          element={
            <ProtectedRoute>
              <BachelorPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/output" element={<Output />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;