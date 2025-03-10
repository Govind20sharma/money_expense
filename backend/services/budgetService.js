const calculateBudget = (salary, rent, food, travel, marital_status, additionalExpenses = 0) => {
    // Calculate total expenses
    let totalExpenses = rent + food + travel;
  
    // Add additional expenses for married users
    if (marital_status === "married") {
      totalExpenses += additionalExpenses;
    }
  
    // Calculate disposable income
    const disposableIncome = salary - totalExpenses;
  
    // Suggest budget allocations
    let budget = {};
  
    if (marital_status === "single") {
      // For bachelors
      budget = {
        savings: disposableIncome * 0.3, // 30% of disposable income
        investments: disposableIncome * 0.2, // 20% of disposable income
        discretionarySpending: disposableIncome * 0.5, // 50% of disposable income
      };
    } else if (marital_status === "married") {
      // For married users
      budget = {
        savings: disposableIncome * 0.5, // 50% of disposable income
        investments: disposableIncome * 0.3, // 30% of disposable income
        discretionarySpending: disposableIncome * 0.2, // 20% of disposable income
      };
    }
  
    return {
      totalExpenses,
      disposableIncome,
      budget,
    };
  };
  
  module.exports = calculateBudget;