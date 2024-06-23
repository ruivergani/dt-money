import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';

// Schema
const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export default function NewTransactionModal() {

  const {createTransaction} = useContext(TransactionsContext)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    //await new Promise(resolve => setTimeout(resolve, 2000)) // resolver a promessa apos 2 segundos com objetivo simular API
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay/>
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder='Description'
            required
            {... register('description')}
          />
          <input
            type="number"
            placeholder='Price'
            required
            {... register('price', {valueAsNumber: true})}
          />
          <input
            type="text"
            placeholder='Category'
            required
            {... register('category')}
          />

          <Controller
            control={control}
            name='type'
            render={({field}) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>
                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Outcome
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type='submit' disabled={isSubmitting}>
            Register
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}