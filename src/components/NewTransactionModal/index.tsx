import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

// Schema
const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  //type: zod.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export default function NewTransactionModal() {

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // resolver a promessa apos 2 segundos com objetivo simular API

    console.log(data)
  }

  return (
    <Dialog.Portal>
      <Overlay/>
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24}/>
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
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

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp size={24} />
              Income
            </TransactionTypeButton>
            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown size={24} />
              Outcome
            </TransactionTypeButton>
          </TransactionType>

          <button type='submit' disabled={isSubmitting}>
            Register
          </button>
        </form>

      </Content>
    </Dialog.Portal>
  )
}