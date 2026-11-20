import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { paths } from '../../constants/paths'
import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../Button'

export const DELIVERY_FEE = 500 // R$ 5,00 em centavos

const Box = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  h3 {
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.white};
    padding: 16px 20px;
    font-size: 16px;
  }

  .lines {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      display: flex;
      justify-content: space-between;
      color: ${({ theme }) => theme.dark};
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    border-top: 1px solid ${({ theme }) => theme.lightGray};
    font-size: 20px;
    font-weight: 800;
  }

  .actions {
    padding: 0 20px 20px;
  }
`

export default function CartResume() {
  const { cartProducts } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // reduce: soma preço x quantidade de todos os itens
  const subtotal = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  )

  const submitOrder = async () => {
    if (cartProducts.length === 0) {
      toast.info('Adicione algum produto ao carrinho primeiro.')
      return
    }

    const products = cartProducts.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }))

    try {
      setLoading(true)
      const { data } = await api.post('/create-payment-intent', { products })

      navigate(paths.checkout, {
        state: { clientSecret: data.clientSecret, amount: data.amount },
      })
    } catch (err) {
      toast.error(
        err.response?.data?.error || 'Não foi possível iniciar o pagamento.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <h3>Resumo do pedido</h3>
      <div className="lines">
        <p>
          <span>Itens</span>
          <span>{formatPrice(subtotal)}</span>
        </p>
        <p>
          <span>Taxa de entrega</span>
          <span>{formatPrice(cartProducts.length ? DELIVERY_FEE : 0)}</span>
        </p>
      </div>
      <div className="total">
        <span>Total</span>
        <span>
          {formatPrice(subtotal + (cartProducts.length ? DELIVERY_FEE : 0))}
        </span>
      </div>
      <div className="actions">
        <Button type="button" onClick={submitOrder} disabled={loading}>
          {loading ? 'Aguarde...' : 'Finalizar pedido'}
        </Button>
      </div>
    </Box>
  )
}
