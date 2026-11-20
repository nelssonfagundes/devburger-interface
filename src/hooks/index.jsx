import { CartProvider } from './CartContext'
import { UserProvider } from './UserContext'

// junta todos os contextos da aplicação
export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  )
}
