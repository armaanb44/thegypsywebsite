import { useGLTF } from '@react-three/drei'

export default function slide2(props) {
  const { scene } = useGLTF('/models/slide2.gltf')
  return <primitive object={scene} {...props} />
}
