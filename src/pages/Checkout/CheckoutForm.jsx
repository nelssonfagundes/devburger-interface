import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import { paths } from '../../constants/paths'
import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const { cartProducts, clearCart } = useCart()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      try {
        // pagamento aprovado: salva o pedido no MongoDB
        const products = cartProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        }))
        const { data: order } = await api.post('/orders', { products })

        clearCart()
        navigate(paths.complete, { state: { orderId: order._id } })
      } catch {
        toast.error('Pagamento aprovado, mas houve erro ao salvar o pedido.')
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout: 'tabs' }} />
      <div style={{ marginTop: 24 }}>
        <Button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processando...' : 'Pagar'}
        </Button>
      </div>
    </form>
  )
}
