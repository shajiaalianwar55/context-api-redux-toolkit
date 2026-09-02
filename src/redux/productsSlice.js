import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ─── Slice 1 of 2: products (async) ──────────────────────────────────────────
// createAsyncThunk wraps the API call and automatically dispatches
// pending / fulfilled / rejected actions for us.

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8')
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  // extraReducers listens to the three actions the thunk dispatches.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message
      })
  },
})

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer
