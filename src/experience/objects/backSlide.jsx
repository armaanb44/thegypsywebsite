import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function backSlide({onBackSlideClicked, ...props}) { 


  const { scene, nodes } = useGLTF('/models/backSlide.gltf')
  const ref = useRef()

  useEffect(() => {
    scene.traverse((child) => {
        console.log(child.name)
    })
  })
  return (
    <>
      <primitive object={scene} ref= {ref} {...props} />
  
      {/* Render 'backSlide' separately with R3F support */}
      {nodes.backSlide && (
        <mesh
          geometry={nodes.backSlide.geometry}
          material={nodes.backSlide.material}
          position={nodes.backSlide.position}
          rotation={nodes.backSlide.rotation}
          scale={nodes.backSlide.scale}
          onClick={() => {
            console.log('✅ backSlide clicked')
            if (onBackSlideClicked) onBackSlideClicked()
          }}
        />
      )}
    </>
  )
}  