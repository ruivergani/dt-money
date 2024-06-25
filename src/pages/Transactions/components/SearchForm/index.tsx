import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from 'react';


/**
 * Por que que um component renderiza?
 * - Hooks changed (mudou estado, contexto, reducer)
 * - Props changes (mudou propriedades)
 * - Parent rerendered (component pai renderizou)
 *
 * Qual o fluxo de renderizacao?
 * 1. O React recria o HTML da interface daquele componente
 * 2. Compara a versao do HTML recriada com a versao anterior
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1: Comparar com a versao anterior dos hooks e this.props
 * 0.2: SE mudou algo, ele vai permitir a nova renderizacao SE NAO mudar nada nao entra no fluxo acima
 */


// Schema
const searchFormSchema = zod.object({
  query: zod.string(),
})

// Return type of our schema in the form
type SearchFormInputs = zod.infer<typeof searchFormSchema>;

function SearchFormComponent() {

  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Search for a transaction"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent);