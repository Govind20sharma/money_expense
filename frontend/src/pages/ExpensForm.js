import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateExpenses } from "../api/userApi";

const ExpenseForm = ({ maritalStatus }) => {
  const [formData, setFormData] = useState({
    salary: "",
    rent: "",
    food: "",
    travel: "",
  });

  // Fetch Existing Data
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await fetchUserProfile(token);
        if (data.marital_status === maritalStatus) {
          setFormData({
            salary: data.salary || "",
            rent: data.rent || "",
            food: data.food || "",
            travel: data.travel || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getUserData();
  }, [maritalStatus]);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await updateExpenses(token, { marital_status: maritalStatus, ...formData });
      alert(`${maritalStatus} Details Updated Successfully!`);
    } catch (error) {
      alert("Error updating expenses");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{maritalStatus === "single" ? "Bachelor Details" : "Married Details"}</h2>

      <label>Salary:</label>
      <input
        type="text"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        required
      />

      <label>Rent:</label>
      <input
        type="text"
        name="rent"
        value={formData.rent}
        onChange={handleChange}
        required
      />

      <label>Food:</label>
      <input
        type="text"
        name="food"
        value={formData.food}
        onChange={handleChange}
        required
      />

      <label>Travel:</label>
      <input
        type="text"
        name="travel"
        value={formData.travel}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ExpenseForm;
