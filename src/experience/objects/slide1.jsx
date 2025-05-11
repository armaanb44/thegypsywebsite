import { useGLTF } from '@react-three/drei'

export default function slide1(props) {
  const { scene } = useGLTF('/models/slide1.gltf')
  return <primitive object={scene} {...props} />
}
