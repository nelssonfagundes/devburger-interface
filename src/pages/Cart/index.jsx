import { Link } from 'react-router-dom'
import styled from 'styled-components'

import CartItems from '../../components/CartItems'
import CartResume from '../../components/CartResume'
import { paths } from '../../constants/paths'

const Container = styled.div`
  padding: 40px clamp(16px, 5vw, 60px) 60px;

  h1 {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: 56px;
    color: ${({ theme }) => theme.purple};
    text-align: center;
    margin-bottom: 30px;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;
  }

  .back {
    display: inline-block;
    margin-top: 20px;
    color: ${({ theme }) => theme.purple};
    font-weight: 700;
  }

  @media (max-width: 960px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
`

export default function Cart() {
  return (
    <Container>
      <h1>Checkout - Pedido</h1>
      <div className="content">
        <div>
          <CartItems />
          <Link className="back" to={paths.menu}>
            ← Continuar comprando
          </Link>
        </div>
        <CartResume />
      </div>
    </Container>
  )
}
