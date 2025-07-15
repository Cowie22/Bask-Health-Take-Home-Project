'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

import { LayoutItem, WidgetStyle } from '@/types'

interface ThemeStyles {
  light: WidgetStyle
  dark: WidgetStyle
}

interface AppContextState {
  currentPage: string
  updateCurrentPage: (val: string) => void
  isDark: boolean
  toggleTheme: () => void
  layout: LayoutItem[]
  setLayout: (layout: LayoutItem[]) => void
  activeWidgets: string[]
  setActiveWidgets: (keys: string[]) => void
  resetDashboard: () => void
  editMode: boolean
  toggleEditMode: () => void
  lastUpdated: number | null
  updateLastUpdated: () => void
  autoFetch: boolean
  toggleAutoFetch: () => void
  themeStyles: ThemeStyles | null
  setThemeStyles: (styles: ThemeStyles) => void
  removeWidget: (key: string) => void
  restoreWidget: (key: string) => void
}

const AppContext = createContext<AppContextState | undefined>(undefined)

const defaultLayout: LayoutItem[] = [
  { i: 'summary', w: 2, h: 1, x: 0, y: 0 },
  { i: 'products', w: 2, h: 1, x: 2, y: 0 },
  { i: 'engagement', w: 2, h: 1, x: 4, y: 0 },
  { i: 'chart', w: 3, h: 1, x: 0, y: 1 },
  { i: 'table', w: 3, h: 1, x: 3, y: 1 },
  { i: 'map', w: 6, h: 2, x: 0, y: 2 },
]

const allWidgetKeys = defaultLayout.map((widget) => widget.i)

interface AppWrapperProps {
  children: ReactNode
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('')
  const [isDark, setIsDark] = useState<boolean>(false)
  const [layout, setLayout] = useState<LayoutItem[]>(defaultLayout)
  const [activeWidgets, setActiveWidgets] = useState<string[]>(allWidgetKeys)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [autoFetch, setAutoFetch] = useState<boolean>(true)
  const [themeStyles, setThemeStyles] = useState<ThemeStyles | null>(null)

  // Handle the current page of the site
  const updateCurrentPage = useCallback((val: string) => {
    setCurrentPage(val)
  }, [])

  // Load layout and activeWidgets from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('layout')
    if (savedLayout) {
      try {
        setLayout(JSON.parse(savedLayout))
      } catch {}
    }
    const savedActiveWidgets = localStorage.getItem('activeWidgets')
    if (savedActiveWidgets) {
      try {
        setActiveWidgets(JSON.parse(savedActiveWidgets))
      } catch {}
    }
  }, [])

  // Save layout to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(layout))
  }, [layout])

  // Save activeWidgets to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('activeWidgets', JSON.stringify(activeWidgets))
  }, [activeWidgets])

  // Reset dashboard to default layout and all widgets active
  const resetDashboard = useCallback(() => {
    setLayout(defaultLayout)
    setActiveWidgets(allWidgetKeys)
    localStorage.removeItem('layout')
    localStorage.removeItem('activeWidgets')
  }, [])

  // Remove widget key from activeWidgets only (hide widget)
  const removeWidget = useCallback((key: string) => {
    setActiveWidgets((prev) => prev.filter((widgetKey) => widgetKey !== key))
  }, [])

  // Add widget key back to activeWidgets (show widget)
  const restoreWidget = useCallback((key: string) => {
    setActiveWidgets((prev) => {
      if (prev.includes(key)) return prev
      return [...prev, key]
    })
  
    setLayout((prevLayout) => {
      if (prevLayout.some((item) => item.i === key)) {
        return prevLayout
      }
      const widget = defaultLayout.find((w) => w.i === key)
      return widget ? [...prevLayout, widget] : prevLayout
    })
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
    layout,
    setLayout,
    activeWidgets,
    setActiveWidgets,
    resetDashboard,
    editMode,
    toggleEditMode,
    lastUpdated,
    updateLastUpdated,
    autoFetch,
    toggleAutoFetch,
    themeStyles,
    setThemeStyles,
    removeWidget,
    restoreWidget,
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
