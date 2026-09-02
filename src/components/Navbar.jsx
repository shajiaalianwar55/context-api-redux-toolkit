import { useSelector } from 'react-redux'

import { useTheme } from '../context/ThemeContext'
import { selectCartCount } from '../redux/cartSlice'

// This component is the clearest demo of the two systems side by side:
//   theme  -> Context API
//   count  -> Redux store
export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="navbar">
      <h1 className="brand">
        React<span>Mart</span>
      </h1>

      <div className="navbar-right">
        <span className="cart-badge" title="Items in cart (from Redux)">
          Cart: {cartCount}
        </span>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </header>
  )
}
