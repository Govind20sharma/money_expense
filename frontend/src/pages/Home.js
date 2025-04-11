import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.module.css"; // We'll create this CSS file next


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to the Home Page!</h2>
        <p>You are logged in.</p>
        <div className="button-container">
          <button className="action-button" onClick={() => navigate("/married")}>Let's Go</button>
        </div>
      </div>
    </div>
  );
};

export default Home;