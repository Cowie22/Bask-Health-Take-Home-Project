import { useState, useEffect } from 'react'

const useScreenWidth = (): number | undefined => {
  const [width, handleWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const updateWidth = () => {
      const currentWidth = window.innerWidth
      handleWidth(currentWidth)
    }

    window.addEventListener('resize', updateWidth)

    updateWidth()

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return width
}

export default useScreenWidth
