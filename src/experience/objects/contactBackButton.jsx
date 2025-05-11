import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

export default function ContactBackButton({ onClick, ...props }) {
  const gltf = useGLTF('/models/contactBackButton.gltf')
  const [meshes, setMeshes] = useState([])

  useEffect(() => {
    const interactiveNames = ['Text006', 'Plane002']
    const customMaterial = new THREE.MeshBasicMaterial({
      color: 'pink',
      transparent: true,
      opacity: 0.8,
    })

    const foundMeshes = interactiveNames
      .map((name) => gltf.scene.getObjectByName(name))
      .filter((obj) => obj && obj.isMesh)
      .map((mesh) => {
        console.log(mesh.name) // Log the name of the mesh
        // Apply custom material to the mesh

        const material =
        mesh.name == 'Text006'
        ? new THREE.MeshBasicMaterial({
          color: 'pink',
          transparent: true,
          opacity: 0.8,
        })
        :
        new THREE.MeshBasicMaterial({
          color: 'grey',
          transparent: true,
          opacity: 0.8,
        })
        mesh.material = material
        return mesh
      })

    setMeshes(foundMeshes)
  }, [gltf])

  if (meshes.length === 0) return null

  return (
    <>
      {meshes.map((mesh, index) => (
        <mesh
          key={index}
          geometry={mesh.geometry}
          material={mesh.material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          onClick={(e) => {
            e.stopPropagation()
            if (onClick) onClick()
          }}
          {...props}
        />
      ))}
    </>
  )
}
