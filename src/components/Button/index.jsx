import styled from 'styled-components'

import { theme } from '../../styles/globalStyles'

const StyledButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 6px;
  background: ${theme.purple};
  color: ${theme.white};
  font-family: 'Road Rage', cursive;
  font-size: 28px;
  transition: background 0.2s, transform 0.1s;

  &:hover {
    background: ${theme.purpleDark};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>
}
