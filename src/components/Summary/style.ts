import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;

  margin-top: -5rem;
  z-index: 2;
`;

// Using interface to create a variant variable for the cards
interface SummaryCardProps {
  variant?: 'green';
}

export const SummaryCard = styled.div<SummaryCardProps>`
  width: 100%;
  max-width: 352px;
  padding: 24px 24px 24px 32px;
  background: ${props => props.theme['gray-600']};
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  header{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      color: ${props => props.theme['gray-300']};
      font-size: 16px;
      font-weight: 400;
      line-height: 160%; /* 25.6px */
    }
  }
  strong{
    color: ${props => props.theme['gray-100']};
    font-size: 32px;
    font-weight: 700;
    line-height: 140%;
  }
  ${props => props.variant === 'green' && css`
    background-color: ${props.theme['green-700']};
  `}
`;