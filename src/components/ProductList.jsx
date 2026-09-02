import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from './ProductCard'
import {
  fetchProducts,
  selectAllProducts,
  selectProductsError,
  selectProductsStatus,
} from '../redux/productsSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  // Fire the async thunk once, on mount.
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'loading' || status === 'idle') {
    return <p className="status">Loading products…</p>
  }

  if (status === 'failed') {
    return (
      <div className="status status-error">
        <p>Could not load products: {error}</p>
        <button type="button" onClick={() => dispatch(fetchProducts())}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <section className="products">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
