import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { paths } from '../../constants/paths'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;
  text-align: center;

  .check {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.green};
    color: ${({ theme }) => theme.white};
    font-size: 48px;
    font-weight: 800;
  }

  h1 {
    color: ${({ theme }) => theme.dark};
  }

  p {
    color: ${({ theme }) => theme.gray};
  }

  a {
    margin-top: 10px;
    color: ${({ theme }) => theme.purple};
    font-weight: 700;
  }
`

export default function CompletePayment() {
  const { state } = useLocation()

  return (
    <Container>
      <div className="check">✓</div>
      <h1>Pedido realizado com sucesso!</h1>
      {state?.orderId && <p>Número do pedido: {state.orderId}</p>}
      <p>Seu hambúrguer já está sendo preparado. 🍔</p>
      <Link to={paths.menu}>Fazer outro pedido</Link>
    </Container>
  )
}
