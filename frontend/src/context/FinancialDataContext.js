import React, { createContext, useState, useContext } from "react";

// Create a context for financial data
const FinancialDataContext = createContext();

// Create a provider component
export const FinancialDataProvider = ({ children }) => {
  const [financialData, setFinancialData] = useState(null);

  return (
    <FinancialDataContext.Provider value={{ financialData, setFinancialData }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

// Custom hook to use the financial data context
export const useFinancialData = () => useContext(FinancialDataContext);