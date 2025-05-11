import { useGLTF } from '@react-three/drei'

export default function GWagon(props) {
  const { scene } = useGLTF('/models/gwagon1.gltf')
  return <primitive object={scene} {...props} />
}
