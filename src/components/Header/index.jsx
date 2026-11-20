import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { paths } from '../../constants/paths'
import { useCart } from '../../hooks/CartContext'
import { useUser } from '../../hooks/UserContext'
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
  background: ${({ theme }) => theme.darker};
`

const Brand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.white};
  font-family: 'Road Rage', cursive;
  font-size: 30px;
  text-decoration: none;

  span {
    color: ${({ theme }) => theme.purple};
  }

  @media (max-width: 620px) {
    p {
      display: none;
    }
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 24px;

  a {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
    font-weight: 500;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.purple};
    }

    &.active {
      color: ${({ theme }) => theme.purple};
      border-color: ${({ theme }) => theme.purple};
    }
  }

  @media (max-width: 620px) {
    gap: 14px;
    font-size: 14px;
  }
`

const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.white};
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.purple};
  }

  .logout {
    background: none;
    border: none;
    color: ${({ theme }) => theme.red};
    font-weight: 700;
  }

  .admin {
    color: ${({ theme }) => theme.green};
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 860px) {
    .hello {
      display: none;
    }
  }
`

const CartLink = styled(NavLink)`
  position: relative;
  display: flex;
  color: ${({ theme }) => theme.white};

  span {
    position: absolute;
    top: -8px;
    right: -10px;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    padding: 0 5px;
    background: ${({ theme }) => theme.purple};
    color: ${({ theme }) => theme.white};
    font-size: 12px;
    font-weight: 700;
    display: grid;
    place-items: center;
  }
`

export default function Header() {
  const { userInfo, logout } = useUser()
  const { cartProducts } = useCart()
  const navigate = useNavigate()

  const totalItems = cartProducts.reduce((acc, item) => acc + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigate(paths.login)
  }

  return (
    <Bar>
      <Brand to={paths.home}>
        <Logo size={44} showName={false} />
        <p>
          Dev<span>Burger</span>
        </p>
      </Brand>

      <Nav>
        <NavLink to={paths.home} end>
          Home
        </NavLink>
        <NavLink to={paths.menu}>Cardápio</NavLink>
      </Nav>

      <UserArea>
        {userInfo.admin && (
          <NavLink to={paths.admin} className="admin">
            Admin
          </NavLink>
        )}
        <p className="hello">
          Olá, <strong>{userInfo.name?.split(' ')[0]}</strong>
        </p>
        <CartLink to={paths.cart} aria-label="Carrinho">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6 5 3H2" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
          {totalItems > 0 && <span>{totalItems}</span>}
        </CartLink>
        <button type="button" className="logout" onClick={handleLogout}>
          Sair
        </button>
      </UserArea>
    </Bar>
  )
}
