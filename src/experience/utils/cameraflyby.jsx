import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function CameraFlyby({ onComplete }) {
  const { camera, controls } = useThree()

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    // Initial camera and target
    camera.position.set(-25, 34, -28)
    controls?.target.set(0, 0, 0)
    controls?.update()

    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => controls?.update()
      }
    })

    if (isMobile) {
      tl.to(camera.position, { x: -20, y: 36, z: -30 })
        .to(camera.position, { x: 18, y: 17, z: -35 })
        .to(camera.position, { x: 20.32, y: 4.45, z: 43.38 })
    } else {
      tl.to(camera.position, { x: -25, y: 36, z: -30 })
        .to(camera.position, { x: 27, y: 21, z: -45 })
        .to(camera.position, { x: 22.05, y: 4.45, z: 42.50 })
    }

    tl.eventCallback('onComplete', () => {
      if (onComplete) onComplete()
    })
  }, [])

  return null
}
