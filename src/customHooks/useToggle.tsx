import { useState, useCallback } from 'react'

const useToggle = (initialState: boolean) => {
  const [isToggled, setIsToggled] = useState(initialState)

  const toggle = useCallback(() => setIsToggled((state) => !state), [])

  return [isToggled, toggle] as const
}

export default useToggle
