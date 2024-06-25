import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { useMemo } from 'react';

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  });

  // {income: 0, outcome: 0, total: 0} => reduzir o array (transactions) a uma nova estrutura de dados
  const summary = useMemo(() => {
    transactions.reduce(
      (accumulator, transaction) => {
        // Check if the transaction is of type 'income'
        if (transaction.type === 'income') {
          // Add the transaction price to the income and total
          accumulator.income += transaction.price;
          accumulator.total += transaction.price;
        } else {
          // Otherwise, add the transaction price to the outcome and subtract it from the total
          accumulator.outcome += transaction.price;
          accumulator.total -= transaction.price;
        }
        // Return the accumulator for the next iteration
        return accumulator;
      },
      {
        // Initial value of the accumulator
        income: 0,
        outcome: 0,
        total: 0
      }
    );
  },[transactions]
  )

  return summary;
}