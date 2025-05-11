import { useGLTF } from '@react-three/drei'

export default function slide4(props) {
  const { scene } = useGLTF('/models/slide4.gltf')
  return <primitive object={scene} {...props} />
}
