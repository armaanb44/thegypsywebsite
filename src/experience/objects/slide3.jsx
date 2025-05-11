import { useGLTF } from '@react-three/drei'

export default function slide3(props) {
  const { scene } = useGLTF('/models/slide3.gltf')
  return <primitive object={scene} {...props} />
}
