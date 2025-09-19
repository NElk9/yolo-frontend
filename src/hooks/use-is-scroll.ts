import { useEffect, useState } from 'react'

export default function useIsScroll(y: number = 0) {
  const [isScroll, setIsScroll] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > y)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isScroll
}
