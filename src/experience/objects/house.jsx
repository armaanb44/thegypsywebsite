import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function House({projectorFlickerEnabled, ...props}) {
  const { scene } = useGLTF('/models/house.gltf')
  const projectorRef = useRef()
  const bakedTexture = useTexture('/models/house.jpg')
  bakedTexture.flipY = false
  bakedTexture.colorSpace = THREE.SRGBColorSpace

  //Custom material for pole lamps
  const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
  const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
  const projectorMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

  //List of mesh names to apply the light material to
  const lampNames = [
    'mainGateRightLampSHADE',
    'mainGateLeftLampSHADE',
    'GypsySignBoardLampSHADE',
    'grandEscapeRightLampSHADE',
    'grandEscapeLeftLampSHADE'
  ]

  const projectorScreenName = 'projectorScreen'

 
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply projector screen material
        if (child.name === projectorScreenName) {
          child.material = projectorMaterial
          projectorRef.current = child
        }
        // Apply lamp material
        else if (lampNames.includes(child.name)) {
          child.material = poleLightMaterial
        } else {
          child.material = bakedMaterial
        }
      }
    })
  }, [scene, bakedTexture])

  
  useFrame(() => {
    if (projectorRef.current) {
      if (!projectorFlickerEnabled.current) return
      const r = Math.random()
      if (r > 0.97) {
        projectorRef.current.material.map = null
        projectorRef.current.material.color.set('pink') // OFF
      } else if (r > 0.93) {
        projectorRef.current.material.map = null
        projectorRef.current.material.color.set('white') // FLASH
      } else {
        projectorRef.current.material.map = bakedTexture
        projectorRef.current.material.color.set('pink')
      }
      projectorRef.current.material.needsUpdate = true
    }
  })
  return <primitive object={scene}  />
}
