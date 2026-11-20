import { Elements } from '@stripe/react-stripe-js'
import { Navigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { paths } from '../../constants/paths'
import { stripePromise } from '../../services/stripe'
import { formatPrice } from '../../utils/formatPrice'
import CheckoutForm from './CheckoutForm'

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 20px 60px;

  h1 {
    font-family: 'Road Rage', cursive;
    font-weight: 400;
    font-size: 52px;
    color: ${({ theme }) => theme.purple};
    text-align: center;
  }

  .amount {
    text-align: center;
    margin: 6px 0 24px;
    font-size: 18px;

    strong {
      color: ${({ theme }) => theme.purple};
    }
  }

  .card {
    background: ${({ theme }) => theme.white};
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  }

  .hint {
    margin-top: 16px;
    font-size: 13px;
    color: ${({ theme }) => theme.gray};
    text-align: center;
  }

  .warning {
    color: ${({ theme }) => theme.red};
    font-weight: 500;
    text-align: center;
  }
`

export default function Checkout() {
  const { state } = useLocation()

  // sem o clientSecret (ex.: abriu a página direto), volta para o carrinho
  if (!state?.clientSecret) {
    return <Navigate to={paths.cart} replace />
  }

  return (
    <Container>
      <h1>Pagamento</h1>
      <p className="amount">
        Total a pagar: <strong>{formatPrice(state.amount)}</strong>
      </p>

      <div className="card">
        {stripePromise ? (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: state.clientSecret, locale: 'pt-BR' }}
          >
            <CheckoutForm />
          </Elements>
        ) : (
          <p className="warning">
            Falta a chave pública do Stripe no arquivo .env do front-end.
          </p>
        )}
      </div>

      <p className="hint">
        Modo de teste: use o cartão 4242 4242 4242 4242, qualquer data futura e
        qualquer CVC.
      </p>
    </Container>
  )
}
