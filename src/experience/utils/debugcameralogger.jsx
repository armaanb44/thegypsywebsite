import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

export default function DebugCameraLogger() {
  const { camera, controls } = useThree()

  useEffect(() => {
    const handleLog = (e) => {
      if (e.key === 'l') {
        console.log('📸 Camera Position:', camera.position)
        if (controls?.target) {
          console.log('🎯 Target:', controls.target)
        }
      }
    }

    window.addEventListener('keydown', handleLog)
    return () => window.removeEventListener('keydown', handleLog)
  }, [camera, controls])

  return null
}
