import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    text-decoration: none;
    list-style: none;
    border: none;
  }
  html{
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  body{
    -webkit-font-smoothing: antialiased;
    background-color: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
  }
  :focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
  }
  body, input, textarea, button{
    font: 400 1rem Roboto, sans-serif; // weight - size - family
  }
`;