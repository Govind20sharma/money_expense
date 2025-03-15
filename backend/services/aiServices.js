require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const financialAdvisorModel = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-latest",
  systemInstruction: `
    You are a senior financial advisor with 10+ years of experience.Your role is to:
    1. Analyze users' financial situation (salary, expenses, marital status)
    2. Provide personalized budgeting advice
    3. Suggest investment strategies
    4. Recommend savings plans
    5. Highlight potential financial risks
    
    Guidelines:
    - Use simple language anyone can understand
    - Provide specific percentage allocations
    - Suggest concrete financial products when relevant
    - Consider Indian financial context (tax laws, investment options)
    - Format response with clear sections and emojis
  `
});

async function generateFinancialAdvice(userData) {
  try {
    const prompt = `
      User Financial Profile:
      - Marital Status: ${userData.marital_status}
      - Monthly Salary: ₹${userData.salary}
      - Monthly Expenses:
        • Rent: ₹${userData.rent}
        • Food: ₹${userData.food}
        • Travel: ₹${userData.travel}
        • Extras: ₹${userData.extras}
      - Total Expenses: ₹${userData.totalExpenses}
      - Disposable Income: ₹${userData.disposableIncome}

      Please provide:
      1. Budget allocation recommendations
      2. Emergency fund advice
      3. Investment suggestions (short & long term)
      4. Tax-saving recommendations
      5. Risk assessment
    `;

    const result = await financialAdvisorModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate financial advice");
  }
}

module.exports = { generateFinancialAdvice };