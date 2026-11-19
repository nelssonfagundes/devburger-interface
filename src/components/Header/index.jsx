import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useUser } from '../../hooks/UserContext'
import { theme } from '../../styles/globalStyles'
import Logo from '../Logo'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px clamp(16px, 5vw, 60px);
  background: ${theme.darker};
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${theme.white};
  font-family: 'Road Rage', cursive;
  font-size: 30px;

  span {
    color: ${theme.purple};
  }
`

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${theme.white};
  font-size: 14px;

  strong {
    color: ${theme.purple};
  }

  button {
    background: none;
    border: 1px solid ${theme.purple};
    color: ${theme.white};
    border-radius: 6px;
    padding: 6px 14px;
    font-weight: 500;
    transition: background 0.2s;

    &:hover {
      background: ${theme.purple};
    }
  }

  @media (max-width: 520px) {
    p {
      display: none;
    }
  }
`

export default function Header() {
  const { userInfo, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Bar>
      <Brand>
        <Logo size={44} showName={false} />
        <p>
          Dev<span>Burger</span>
        </p>
      </Brand>

      <UserArea>
        <p>
          Olá, <strong>{userInfo.name?.split(' ')[0]}</strong>
        </p>
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </UserArea>
    </Bar>
  )
}
