import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import styles from '../styles/Register.module.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password);
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['form-card']}>
        <h2>Register</h2>
        {error && <p className={styles['error-text']}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles['form-input']}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles['form-input']}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles['form-input']}
          />
          <button type="submit" className={styles['submit-button']}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
