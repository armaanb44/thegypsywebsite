import { useGLTF } from '@react-three/drei'

export default function slide5(props) {
  const { scene } = useGLTF('/models/slide5.gltf')
  return <primitive object={scene} {...props} />
}
