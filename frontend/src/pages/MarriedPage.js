import React, { useState } from "react";

const MarriedPage = () => {
  const [income, setIncome] = useState([]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setIncome([...income, value]); // Add to the array
    } else {
      setIncome(income.filter((item) => item !== value)); // Remove from the array
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Income:", income);
    alert(`Selected Income: ${income.join(", ")}`);
  };

  return (
    <div>
      <h2>Married Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            value="Less than 50,000"
            onChange={handleCheckboxChange}
          />
          Less than 50,000
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="50,000 - 1,00,000"
            onChange={handleCheckboxChange}
          />
          50,000 - 1,00,000
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="1,00,000 - 2,00,000"
            onChange={handleCheckboxChange}
          />
          1,00,000 - 2,00,000
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            value="More than 2,00,000"
            onChange={handleCheckboxChange}
          />
          More than 2,00,000
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MarriedPage;