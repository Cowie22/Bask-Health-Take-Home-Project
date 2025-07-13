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
  isDark: boolean,
  toggleTheme: () => void,
}

const AppContext = createContext<AppContextState | undefined>(undefined)

interface AppWrapperProps {
  children: ReactNode
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [currentPage, handleCurrentPage] = useState<string>('')
  const [isDark, setIsDark] = useState<boolean>(false)

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

  const sharedState: AppContextState = {
    currentPage,
    updateCurrentPage,
    isDark,
    toggleTheme,
  }

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
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
