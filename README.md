# ReactMart — Context API + Redux Toolkit

A small React store app built for the **React masterclass — Context API & Redux Toolkit** task.
It is deliberately minimal: one page, no router, plain CSS — so the state management is the
only thing on show.

- **Theme (light/dark)** is shared state managed with the **Context API**.
- **Products and cart** are managed by a **Redux Toolkit** store with **two slices**.
- Products are fetched from a public API with **`createAsyncThunk`**.

---

## Where the code lives

| # | Requirement | File |
|---|---|---|
| 1 | App uses **Context API** for shared state | [`src/context/ThemeContext.jsx`](src/context/ThemeContext.jsx) |
| 2 | Redux store with **at least 2 slices** | [`src/redux/store.js`](src/redux/store.js) → [`productsSlice.js`](src/redux/productsSlice.js) + [`cartSlice.js`](src/redux/cartSlice.js) |
| 3 | **`createAsyncThunk`** used for an API call | [`src/redux/productsSlice.js`](src/redux/productsSlice.js) (`fetchProducts`) |

---

## 1. Context API section

`src/context/ThemeContext.jsx` creates the context, exposes a `ThemeProvider`, and exports a
`useTheme()` hook.

```jsx
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) || 'light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const value = useMemo(() => ({ theme, toggleTheme }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
```

The provider wraps the app in [`src/main.jsx`](src/main.jsx). `Navbar` reads it with `useTheme()`
to render the toggle — no props are passed down for the theme. The value is written to
`<html data-theme="...">`, which drives the CSS variables in
[`src/styles/theme.css`](src/styles/theme.css), and mirrored into `localStorage` so the choice
survives a refresh.

## 2. Redux Toolkit section

`configureStore` combines the two slices:

```js
export const store = configureStore({
  reducer: {
    products: productsReducer, // slice 1 — async, from the API
    cart: cartReducer,         // slice 2 — synchronous, local
  },
})
```

**`cartSlice`** holds `items: [{ id, title, price, image, quantity }]` with the reducers
`addToCart`, `removeFromCart`, `increaseQty`, `decreaseQty`, `clearCart`, plus the selectors
`selectCartItems`, `selectCartCount` and `selectCartTotal`. Reducers "mutate" state directly —
Redux Toolkit's built-in Immer converts that into an immutable update.

## 3. createAsyncThunk

`fetchProducts` in `productsSlice.js` calls the free [Fake Store API](https://fakestoreapi.com)
(no API key needed):

```js
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8')
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
```

The thunk dispatches `pending` / `fulfilled` / `rejected` automatically; `extraReducers` maps
those to `status` and `error`, and `ProductList` renders a loading message, an error message with
a retry button, or the product grid.

---

## Project structure

```
src/
├── main.jsx                 # <Provider store> → <ThemeProvider> → <App>
├── App.jsx
├── context/                 # ← Context API section
│   └── ThemeContext.jsx
├── redux/                   # ← Redux Toolkit section
│   ├── store.js
│   ├── productsSlice.js     # createAsyncThunk lives here
│   └── cartSlice.js
├── components/
│   ├── Navbar.jsx           # theme (Context) + cart count (Redux)
│   ├── ProductList.jsx      # dispatches the thunk on mount
│   ├── ProductCard.jsx
│   └── Cart.jsx
└── styles/
    ├── theme.css            # light/dark CSS variables
    └── index.css
```

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview the build
```

Requires Node 18+ and an internet connection for the product API.

## Tech

React 18 · Redux Toolkit 2 · React-Redux 9 · Vite 6 · plain CSS
