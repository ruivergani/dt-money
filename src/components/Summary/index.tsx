import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SummaryCard, SummaryContainer } from "./style";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  // {income: 0, outcome: 0, total: 0} => reduzir o array (transactions) a uma nova estrutura de dados
  const summary = transactions.reduce(
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
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Money In</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Money Out</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff"/>
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}