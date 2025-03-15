import React, { useState } from "react";
import authService from "../services/authService"; // Import the service
import { useNavigate } from "react-router-dom";

const ExpensesForm = () => {
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    marital_status: "single",
    salary: 0,
    rent: 0,
    food: 0,
    travel: 0,
    extras: 0,
  });

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the submitExpenses function from the service
      const response = await authService.submitExpenses(formData);
      navigate('/output')

      alert("Expenses submitted successfully!");
    } catch (error) {
      console.error("Error submitting expenses:", error);
      alert(error.message || "Failed to submit expenses. Please try again.");
    }
  };

  return (
    <div>
      <h2>Expenses Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Marital Status:
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </label>
        <br />
        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Rent:
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Food:
          <input
            type="number"
            name="food"
            value={formData.food}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Travel:
          <input
            type="number"
            name="travel"
            value={formData.travel}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Extras:
          <input
            type="number"
            name="extras"
            value={formData.extras}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpensesForm;