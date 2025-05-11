import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function backSlide({onReplaySlideClicked, ...props}) { 


  const { scene, nodes } = useGLTF('/models/replaySlide.gltf')
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
      {nodes.replaySlide && (
        <mesh
          geometry={nodes.replaySlide.geometry}
          material={nodes.replaySlide.material}
          position={nodes.replaySlide.position}
          rotation={nodes.replaySlide.rotation}
          scale={nodes.replaySlide.scale}
          onClick={() => {
            console.log('✅ replaySlide clicked')
            if (onReplaySlideClicked) onReplaySlideClicked()
          }}
        />
      )}
    </>
  )
}  