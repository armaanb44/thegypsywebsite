import { useGLTF } from '@react-three/drei'

export default function GypsySignBoard(props) {
  const { scene } = useGLTF('/models/gypsySignBoard.gltf')
  return <primitive object={scene} {...props} />
}
