import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Mountains(props) {
  const { scene } = useGLTF('/models/mountains.gltf')
  const bakedTexture = useTexture('/models/mountains.jpg')
  bakedTexture.flipY = false
  bakedTexture.colorSpace = THREE.SRGBColorSpace

 
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ map: bakedTexture })
      }
    })
  }, [scene, bakedTexture])

  return <primitive object={scene} {...props} />
}
