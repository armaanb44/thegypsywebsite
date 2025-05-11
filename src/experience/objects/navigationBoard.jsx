import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useNavigate } from 'react-router-dom'


export default function NavigationBoard({ onContactClick, onAboutClick, ...props }) {
  const { scene, nodes } = useGLTF('/models/navigationBoard.gltf')
  const ref = useRef()

  const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
  const lampNames = ['rightLampShade', 'leftLampShade']
  const navigate = useNavigate()


  useEffect(() => {
    scene.traverse((child) => {
      console.log(child.name)
     
      if (child.isMesh && lampNames.includes(child.name)) {
        child.material = poleLightMaterial
      }
    })

    // Optionally hide card5 from base scene so it doesn't double-render
    const card = scene.getObjectByName('card5')
    if (card) card.visible = false
  }, [scene])


  // hide card4 from base scene so it doesn't double-render
  useEffect(() => {
    const card5001 = scene.getObjectByName('card5001')
    if (card5001) card5001.visible = false
  }, [scene])

  return (
    <>
      {/* Render full nav board */}
      <primitive object={scene} ref={ref} {...props} />

      {/* Render 'card5 and card6' separately with R3F support */}

      
      {nodes.card5 && (
        <mesh
          geometry={nodes.card5.geometry}
          material={nodes.card5.material}
          position={nodes.card5.position}
          rotation={nodes.card5.rotation}
          scale={nodes.card5.scale}
          onClick={() => {
            console.log('✅ card5 clicked')
            if (onContactClick) onContactClick()
          }}
        />
      )}

      {nodes.card5001 && (
        <mesh
          geometry={nodes.card5001.geometry}
          material={nodes.card5001.material}
          position={nodes.card5001.position}
          rotation={nodes.card5001.rotation}
          scale={nodes.card5001.scale}
          onClick={() => {
            console.log('✅ card5001 (about) clicked')
            if (onAboutClick) onAboutClick()
          }}
        />
      )}  

        
      {nodes.card4 && (
        <mesh
          geometry={nodes.card4.geometry}
          material={nodes.card4.material}
          position={nodes.card4.position}
          rotation={nodes.card4.rotation}
          scale={nodes.card4.scale}
          onClick={() => {navigate ('/booking')
            console.log('✅ card5 clicked')
            if (onContactClick) onContactClick()
          }}
        />
      )}

    </>
  )
}
