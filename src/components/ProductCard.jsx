import { useDispatch } from 'react-redux'

import { addToCart } from '../redux/cartSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  return (
    <article className="card">
      <div className="card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <h3 className="card-title">{product.title}</h3>
      <p className="card-category">{product.category}</p>

      <div className="card-footer">
        <span className="card-price">${product.price.toFixed(2)}</span>
        <button type="button" onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
