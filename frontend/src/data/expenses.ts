export interface Expense {
    category: string;
    amount: number;
    color: string;
  }
  
  const expenses: Expense[] = [
    { category: "Rent", amount: 1200, color: "#ff6384" },
    { category: "Shopping", amount: 400, color: "#36a2eb" },
    { category: "Food", amount: 150, color: "#ffce56" },
    { category: "Entertainment", amount: 200, color: "#4bc0c0" },
    { category: "Health", amount: 180, color: "#9840eb" },
  ];
  
  export default expenses;
  