import { loadStripe } from '@stripe/stripe-js'

const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

// se a chave não estiver no .env, o checkout mostra um aviso em vez de quebrar
export const stripePromise = publicKey ? loadStripe(publicKey) : null
