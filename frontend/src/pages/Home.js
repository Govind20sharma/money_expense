import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to the Home Page!</h2>
      <p>You are logged in.</p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => navigate("/married")}>Married</button>
        {/* <button onClick={() => navigate("/bachelor")}>Bachelor</button> */}
      </div>
    </div>
  );
};

export default Home;