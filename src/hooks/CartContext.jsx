import { createContext, useContext, useState } from 'react'

const CART_KEY = 'devburger:cartInfo'
const CartContext = createContext({})

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(readCart)

  const updateCart = (newCart) => {
    setCartProducts(newCart)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
  }

  const putProductInCart = (product) => {
    const exists = cartProducts.find((item) => item.id === product.id)

    if (exists) {
      updateCart(
        cartProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      )
    } else {
      updateCart([...cartProducts, { ...product, quantity: 1 }])
    }
  }

  const increaseProduct = (id) => {
    updateCart(
      cartProducts.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decreaseProduct = (id) => {
    const item = cartProducts.find((product) => product.id === id)

    if (item?.quantity > 1) {
      updateCart(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      )
    } else {
      deleteProduct(id)
    }
  }

  const deleteProduct = (id) => {
    updateCart(cartProducts.filter((item) => item.id !== id))
  }

  const clearCart = () => updateCart([])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductInCart,
        increaseProduct,
        decreaseProduct,
        deleteProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
