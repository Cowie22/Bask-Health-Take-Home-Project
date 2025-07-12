import { useState, useCallback, Dispatch, SetStateAction } from 'react'

const useHover = (initialState: boolean): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isHovered, setIsHovered] = useState<boolean>(initialState)

  const hover = useCallback<Dispatch<SetStateAction<boolean>>>((val: SetStateAction<boolean>) => {
    setIsHovered(val)
  }, [])

  return [isHovered, hover]
}

export default useHover
