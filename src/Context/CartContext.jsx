/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'novamarket-cart-items'

const initialCartItems = [
  {
    id: 'nova-watch-s9',
    name: 'Nova Watch S9',
    category: 'Wearable',
    price: 189,
    quantity: 1,
    accent: 'emerald',
    detail: 'Bateria 7 dias',
  },
  {
    id: 'aeropods-max',
    name: 'AeroPods Max',
    category: 'Audio',
    price: 129,
    quantity: 2,
    accent: 'cyan',
    detail: 'Cancelacion activa de ruido',
  },
  {
    id: 'pixeldock-3-en-1',
    name: 'PixelDock 3 en 1',
    category: 'Carga',
    price: 79,
    quantity: 1,
    accent: 'amber',
    detail: 'Carga rapida 45W',
  },
  {
    id: 'visioncam-4k',
    name: 'VisionCam 4K',
    category: 'Streaming',
    price: 119,
    quantity: 1,
    accent: 'sky',
    detail: 'Auto focus inteligente',
  },
]

const CartContext = createContext(null)

function getStoredCartItems() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return initialCartItems
    }

    const parsedCart = JSON.parse(storedCart)

    if (!Array.isArray(parsedCart)) {
      return initialCartItems
    }

    return parsedCart
  } catch {
    return initialCartItems
  }
}

function normalizeCartProduct(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    accent: product.accent,
    detail: product.detail,
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCartItems)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addItem = useCallback((product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...items, { ...normalizeCartProduct(product), quantity: 1 }]
    })
  }, [])

  const increaseItem = useCallback((itemId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    )
  }, [])

  const decreaseItem = useCallback((itemId) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    )
  }, [])

  const removeItem = useCallback((itemId) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
  }, [])

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const discount = subtotal >= 450 ? subtotal * 0.12 : 0
    const shipping = subtotal - discount >= 300 || subtotal === 0 ? 0 : 18
    const tax = (subtotal - discount) * 0.08
    const total = subtotal - discount + shipping + tax

    return { subtotal, itemCount, discount, shipping, tax, total }
  }, [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      cartItemCount: totals.itemCount,
      totals,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
    }),
    [addItem, cartItems, decreaseItem, increaseItem, removeItem, totals],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}
