import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useFinancialData } from "../context/FinancialDataContext";
import styles from '../styles/FormPage.module.css';


const ExpensesForm = () => {
  const navigate = useNavigate();
  const { setFinancialData } = useFinancialData();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    marital_status: "single",
    salary: "",
    rent: "",
    food: "",
    travel: "",
    extras: "",
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
    setLoading(true);

    try {
      const response = await authService.submitExpenses(formData);
      console.log("response", response);
      const financialAdvice = response?.user?.financialAdvice;
      console.log("financialAdvice", financialAdvice);

      if (financialAdvice) {
        setFinancialData(financialAdvice);
        navigate("/output");
      } else {
        throw new Error("Financial advice not found in the response.");
      }
    } catch (error) {
      alert(error.message || "Failed to submit expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Add a unique class for this page's container
    <div className={styles.expensesPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Expenses Form</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Form fields... */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Marital Status</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your salary"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Rent</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your rent"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Food</label>
              <input
                type="number"
                name="food"
                value={formData.food}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your food expenses"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Travel</label>
              <input
                type="number"
                name="travel"
                value={formData.travel}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your travel expenses"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Extras</label>
              <input
                type="number"
                name="extras"
                value={formData.extras}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter any extra expenses"
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {loading && (
            <div className={styles.popupOverlay}>
              <div className={styles.popupContent}>
                <div className={styles.loadingSpinner}></div>
                <p>Ready to manage your money until it redirects to the next page...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensesForm;
