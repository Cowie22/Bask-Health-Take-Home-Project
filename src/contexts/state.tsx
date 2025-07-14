'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

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
}

const AppContext = createContext<AppContextState | undefined>(undefined)

interface AppWrapperProps {
  children: ReactNode
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [currentPage, handleCurrentPage] = useState<string>('')
  const [isDark, setIsDark] = useState<boolean>(false)
  const [initialDashboard, setInitialDashboard] = useState<Array<object>>([
    { i: 'summary',    w: 2, h: 1, x: 0, y: 0 },
    { i: 'products',   w: 2, h: 1, x: 2, y: 0 },
    { i: 'engagement', w: 2, h: 1, x: 4, y: 0 },
    { i: 'chart',      w: 3, h: 1, x: 0, y: 1 },
    { i: 'table',      w: 3, h: 1, x: 3, y: 1 },
    { i: 'map',        w: 6, h: 2, x: 0, y: 2 },
  ])
  const [editMode, setEditMode] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [autoFetch, setAutoFetch] = useState<boolean>(true)

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
      { i: 'summary',    w: 2, h: 1, x: 0, y: 0 },
      { i: 'products',   w: 2, h: 1, x: 2, y: 0 },
      { i: 'engagement', w: 2, h: 1, x: 4, y: 0 },
      { i: 'chart',      w: 3, h: 1, x: 0, y: 1 },
      { i: 'table',      w: 3, h: 1, x: 3, y: 1 },
      { i: 'map',        w: 6, h: 2, x: 0, y: 2 },
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
