import { useGLTF } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export default function ContactInformation(props) {
  const { scene } = useGLTF('/models/contactInformation.gltf')
  const groupRef = useRef()
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    const customMaterial = new THREE.MeshBasicMaterial({
      color: 'pink',
      transparent: true,
      opacity: 0, // start fully invisible
    })

    const assignedMaterials = []

    scene.traverse((child) => {
      if (child.isMesh && child.name !== 'Plane001') {
        child.material = customMaterial
        assignedMaterials.push(child.material)
      }
    })

    setMaterials(assignedMaterials) // Save references for fading in
  }, [scene])

  useEffect(() => {
    // Slide upward
    if (groupRef.current) {
      gsap.to(groupRef.current.position, {
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.1,
      })
    }

    // Fade in all materials
    if (materials.length > 0) {
      materials.forEach((mat) => {
        gsap.to(mat, {
          opacity: 0.7,
          duration: 1.2,
          ease: 'power1.out',
          delay: 1.2, // delay to sync with upward motion
        })
      })
    }
  }, [materials])

  return (
    <group ref={groupRef} position={[0, -10, 0]} {...props}>
      <primitive object={scene} />
    </group>
  )
}
