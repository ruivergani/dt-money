import { createContext, ReactNode, useEffect, useState } from "react";

// @types
interface Transaction {
  id: number,
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}
interface TransactionContextType {
  transactions: Transaction[]; // list of transactions
}
interface TransactionsProviderProps {
  children: ReactNode; // any element valid in React
}

// Creating the Context
export const TransactionsContext = createContext({} as TransactionContextType)

// Export the Context.Provider
export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => { // useEffect can not be async
    async function loadTransactions() {
      const response = await fetch('http://localhost:3000/transactions')
      const data = await response.json();
      setTransactions(data);
    }
    loadTransactions();
  }, [])

  // Return Code
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
