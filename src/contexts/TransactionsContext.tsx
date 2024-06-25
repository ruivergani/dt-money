import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

// @types
interface Transaction {
  id: number,
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}
interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}
interface TransactionContextType {
  transactions: Transaction[]; // list of transactions
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}
interface TransactionsProviderProps {
  children: ReactNode; // any element valid in React
}

// Creating the Context
export const TransactionsContext = createContext({} as TransactionContextType)

// Export the Context.Provider
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query
        }
      })
      setTransactions(response.data);
    }, [],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;
      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })
      setTransactions(state => [response.data, ...state]);
    }, [],
  )

  useEffect(() => { // useEffect can not be async
    fetchTransactions();
  }, [])

  // Return Code
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
