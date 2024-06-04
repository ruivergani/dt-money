import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

// Images
import LogoImage from '../../assets/logo.svg';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImage} alt="" />
        <NewTransactionButton>
          New Transaction
        </NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}