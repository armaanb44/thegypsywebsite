// components/CrossfadeSlides.jsx
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function CrossfadeSlides({ CurrentSlide, PreviousSlide, onFadeComplete }) {
  const currentRef = useRef()
  const previousRef = useRef()

  useEffect(() => {
    if (currentRef.current) {
      gsap.fromTo(
        currentRef.current.material,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          onComplete: onFadeComplete
        }
      )
    }

    if (previousRef.current) {
      gsap.to(previousRef.current.material, {
        opacity: 0,
        duration: 1,
        ease: 'power2.in'
      })
    }
  }, [CurrentSlide])

  return (
    <>
      {PreviousSlide && (
        <group>
          <PreviousSlide />
        </group>
      )}
      {CurrentSlide && (
        <group>
          <CurrentSlide />
        </group>
      )}
    </>
  )
}
