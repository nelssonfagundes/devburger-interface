import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 22px 20px;
  text-align: center;
  background: ${({ theme }) => theme.purple};
  color: ${({ theme }) => theme.white};
  font-size: 14px;
`

export default function Footer() {
  return (
    <StyledFooter>
      Desenvolvido por Nelsson Fagundes · DevBurger © {new Date().getFullYear()}
    </StyledFooter>
  )
}
