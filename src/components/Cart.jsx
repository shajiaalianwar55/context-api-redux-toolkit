import { useDispatch, useSelector } from 'react-redux'

import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../redux/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <aside className="cart">
      <div className="cart-header">
        <h2>Your cart</h2>
        {items.length > 0 && (
          <button
            type="button"
            className="link-button"
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">Nothing here yet — add a product.</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />

                <div className="cart-item-body">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="qty">
                    <button
                      type="button"
                      onClick={() => dispatch(decreaseQty(item.id))}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseQty(item.id))}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="link-button remove"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </aside>
  )
}
