import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import World from './world'
import * as THREE from 'three'

export default function Experience() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        gl={{
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: 'darkgrey' }}
      >
        <Suspense fallback={null}>
          <World />
        </Suspense>
      </Canvas>
    </div>
  )
}
