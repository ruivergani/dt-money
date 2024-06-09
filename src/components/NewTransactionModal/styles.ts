import { styled } from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh; // height of screen
  inset: 0; // top: 0 - left: 0 - bottom: 0 - right: 0
  background: rgba(0, 0, 0, 0.75);
  transition: background-color .2s;
`;
export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme["gray-800"]};
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.80);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  form{
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input{
      border-radius: 6px;
      border: 0;
      background: ${props => props.theme["gray-900"]};
      color: ${props => props.theme["gray-300"]};
      padding: 1rem;
      &::placeholder{
        color: ${props => props.theme["gray-500"]};
      }
    }
    button[type="submit"]{
      padding: 1rem 2rem;
      border-radius: 6px;
      border: 0;
      background: ${props => props.theme['green-500']};
      color: ${props => props.theme.white};
      margin-top: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: all .2s;
      &:hover{
        filter: brightness(0.8);
      }
    }
  }
`;
export const CloseButton = styled(Dialog.Close)`
  background: transparent;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  border: 0;
  line-height: 0;
  cursor: pointer;
  font-size: 0;
  color: ${props => props.theme['gray-500']};
`;
export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`;
interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome';
}
export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  background: ${props => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${props => props.theme['gray-100']};
  transition: all .2s;
  // Based on the variant change icon color
  svg{
    color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    transition: all .2s;
  }

  // Data State Styles (checked or unchecked)
  &[data-state='checked']{
    color: ${props => props.theme['white']};
    background: ${props => props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};

    svg{
      color: ${props => props.theme['white']};
    }
  }
  &[data-state='unchecked']:hover{
    background:${props => props.theme['gray-600']};
  }
`;