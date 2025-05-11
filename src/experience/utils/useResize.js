import { useEffect } from 'react'

export default function useResize(callback) {
  useEffect(() => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [callback])
}
