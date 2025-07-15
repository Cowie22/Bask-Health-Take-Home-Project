'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface WidgetStyle {
  bgColor: string
  textColor: string
  borderColor: string
  borderColorEdit: string
  borderRadius: string
  accentColor: string
}

interface ThemeStyles {
  light: WidgetStyle
  dark: WidgetStyle
}

interface AppContextState {
  currentPage: string
  updateCurrentPage: (val: string) => void
  isDark: boolean
  toggleTheme: () => void
  initialDashboard: Array<object>
  resetDashboard: () => void
  editMode: boolean
  toggleEditMode: () => void
  lastUpdated: number | null
  updateLastUpdated: () => void
  autoFetch: boolean
  toggleAutoFetch: () => void
  themeStyles: ThemeStyles | null
  setThemeStyles: (styles: ThemeStyles) => void
}

const AppContext = createContext<AppContextState | undefined>(undefined)

interface AppWrapperProps {
  children: ReactNode
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [currentPage, handleCurrentPage] = useState<string>('')
  const [isDark, setIsDark] = useState<boolean>(false)
  const [initialDashboard, setInitialDashboard] = useState<Array<object>>([
    { i: 'summary', w: 2, h: 1, x: 0, y: 0 },
    { i: 'products', w: 2, h: 1, x: 2, y: 0 },
    { i: 'engagement', w: 2, h: 1, x: 4, y: 0 },
    { i: 'chart', w: 3, h: 1, x: 0, y: 1 },
    { i: 'table', w: 3, h: 1, x: 3, y: 1 },
    { i: 'map', w: 6, h: 2, x: 0, y: 2 },
  ])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [autoFetch, setAutoFetch] = useState<boolean>(true)
  const [themeStyles, setThemeStyles] = useState<ThemeStyles | null>(null)

  // Handle the current page of the site
  const updateCurrentPage = useCallback((val: string) => {
    handleCurrentPage(val)
  }, [])

  // Load persisted theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  // Update <html> class when isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  // Reset the dashboard layout to initial state, which is triggered in the header
  const resetDashboard = useCallback(() => {
    setInitialDashboard([
      { i: 'summary', w: 2, h: 1, x: 0, y: 0 },
      { i: 'products', w: 2, h: 1, x: 2, y: 0 },
      { i: 'engagement', w: 2, h: 1, x: 4, y: 0 },
      { i: 'chart', w: 3, h: 1, x: 0, y: 1 },
      { i: 'table', w: 3, h: 1, x: 3, y: 1 },
      { i: 'map', w: 6, h: 2, x: 0, y: 2 },
    ])
    localStorage.removeItem('layout')
  }, [])

  // Toggle edit mode for the dashboard layout, which is triggered in the header
  const toggleEditMode = useCallback(() => {
    setEditMode((prev) => !prev)
  }, [])

  const updateLastUpdated = useCallback(() => {
    setLastUpdated(Date.now())
  }, [])

  const toggleAutoFetch = useCallback(() => {
    setAutoFetch((prev) => !prev)
  }, [])

  useEffect(() => {
    fetch('/api/styles')
      .then((res) => res.json())
      .then((styles) => {
        setThemeStyles(styles)
      })
      .catch((err) => {
        console.error('Failed to load theme styles', err)
      })
  }, [])

  useEffect(() => {
    if (!themeStyles) return
    const theme = isDark ? themeStyles.dark : themeStyles.light
    const root = document.documentElement

    const adjustColor = (hex: string, amount: number): string => {
      return (
        '#' +
        hex
          .replace(/^#/, '')
          .match(/.{2}/g)!
          .map((c) =>
            Math.min(255, Math.max(0, parseInt(c, 16) + amount))
              .toString(16)
              .padStart(2, '0')
          )
          .join('')
      )
    }

    root.style.setProperty('--background', theme.bgColor)
    root.style.setProperty('--foreground', theme.textColor)
    root.style.setProperty('--border-color', theme.borderColor)
    root.style.setProperty('--border-color-edit', theme.borderColorEdit)
    root.style.setProperty('--accent-color', theme.accentColor)

    const surfaceColor = isDark
      ? adjustColor(theme.bgColor, 30)
      : adjustColor(theme.bgColor, -70)

    root.style.setProperty('--surface', surfaceColor)
  }, [themeStyles, isDark])

  const sharedState: AppContextState = {
    currentPage,
    updateCurrentPage,
    isDark,
    toggleTheme,
    initialDashboard,
    resetDashboard,
    editMode,
    toggleEditMode,
    lastUpdated,
    updateLastUpdated,
    autoFetch,
    toggleAutoFetch,
    themeStyles,
    setThemeStyles,
  }

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  )
}

// Custom hook to use the AppContext
const useAppContext = () => {
  const state = useContext(AppContext)
  if (state === undefined) {
    throw new Error('useAppContext must be used within an AppWrapper')
  }
  return state
}

export { AppContext, AppWrapper, useAppContext }
