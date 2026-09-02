import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="layout">
        <ProductList />
        <Cart />
      </main>

      <footer className="footer">
        Theme via <strong>Context API</strong> · products &amp; cart via{' '}
        <strong>Redux Toolkit</strong>
      </footer>
    </div>
  )
}
