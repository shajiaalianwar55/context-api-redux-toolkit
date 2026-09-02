import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// ─── Context API section ──────────────────────────────────────────────────────
// Shared state (the colour theme) lives here and is read by any component in the
// tree via the useTheme() hook — no prop drilling.

const ThemeContext = createContext(null)

const STORAGE_KEY = 'reactmart-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Restore the last choice so the theme survives a page refresh.
    return localStorage.getItem(STORAGE_KEY) || 'light'
  })

  // Apply the theme to <html data-theme="..."> so plain CSS variables can react.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // Memoised so consumers don't re-render when the provider re-renders for
  // unrelated reasons.
  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Custom hook — the only way components should read the context.
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme() must be used inside a <ThemeProvider>')
  }
  return context
}
