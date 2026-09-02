import { createSlice } from '@reduxjs/toolkit'

// ─── Slice 2 of 2: cart (synchronous) ────────────────────────────────────────
// Redux Toolkit uses Immer under the hood, so "mutating" state here is safe —
// it is turned into an immutable update for us.

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // [{ id, title, price, image, quantity }]
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        // Dropping below 1 removes the line entirely.
        state.items = state.items.filter((i) => i.id !== action.payload)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default cartSlice.reducer
