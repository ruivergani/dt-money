import { styled } from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  input{
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    padding: 13px 20px;
    &::placeholder{
      color: ${props => props.theme['gray-500']};
    }
  }
  button{
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 13px 32px;
    border-radius: 6px;
    border: 1px solid ${props => props.theme['green-300']};
    background-color: transparent;
    font-weight: 700;
    line-height: 160%; /* 25.6px */
    color: ${props => props.theme['green-300']};
    cursor: pointer;
    transition: all .2s;

    &:hover{
      color: ${props => props.theme.white};
      border-color: ${props => props.theme['green-500']};
      background-color: ${props => props.theme['green-500']};
    }
  }
`;