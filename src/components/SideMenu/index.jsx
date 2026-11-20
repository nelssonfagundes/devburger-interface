import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { paths } from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import Logo from '../Logo'

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px;
  background: ${({ theme }) => theme.darker};

  .brand {
    margin-bottom: 20px;
  }

  a,
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.white};
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    text-align: left;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      background: ${({ theme }) => theme.purple};
    }
  }

  .bottom {
    margin-top: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 12px;
  }

  .logout {
    color: ${({ theme }) => theme.red};
  }

  @media (max-width: 860px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px;

    .brand {
      display: none;
    }

    .bottom {
      margin: 0;
      border: none;
      padding: 0;
      display: flex;
    }
  }
`

export default function SideMenu() {
  const { logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(paths.login)
  }

  return (
    <Aside>
      <div className="brand">
        <Logo size={90} />
      </div>

      <NavLink to={paths.adminOrders}>🧾 Pedidos</NavLink>
      <NavLink to={paths.adminProducts}>🍔 Produtos</NavLink>
      <NavLink to={paths.adminNewProduct}>➕ Novo produto</NavLink>

      <div className="bottom">
        <NavLink to={paths.home} end>
          🏠 Ver loja
        </NavLink>
        <button type="button" className="logout" onClick={handleLogout}>
          🚪 Sair
        </button>
      </div>
    </Aside>
  )
}
