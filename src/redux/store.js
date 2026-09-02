import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import cartReducer from './cartSlice'

// One store, two slices — visible side by side in Redux DevTools.
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
})
