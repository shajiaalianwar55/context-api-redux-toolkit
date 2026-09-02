import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './redux/store'
import { ThemeProvider } from './context/ThemeContext'
import './styles/theme.css'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux store wraps the app... */}
    <Provider store={store}>
      {/* ...and the Context provider sits inside it. */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
