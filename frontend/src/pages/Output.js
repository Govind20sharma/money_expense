import React from "react";
import { useFinancialData } from "../context/FinancialDataContext"; // Import the context hook

const Output = () => {
  const { financialData } = useFinancialData(); // Use the context to get financial data

  return (
    <div>
      <h1>Financial Advice</h1>
      {financialData ? (
        <div>
          <p>{financialData}</p>
        </div>
      ) : (
        <p>No financial advice available. Please submit your expenses first.</p>
      )}
    </div>
  );
};

export default Output;