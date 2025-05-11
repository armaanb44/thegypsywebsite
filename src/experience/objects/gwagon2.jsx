import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function GWagon2({ shouldAnimate, playDirection = 1, ...props }) {
  const { scene, animations } = useGLTF('/models/gwagon2.gltf')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    const action = actions['gWagon2Animation']
    if (shouldAnimate && action) {
      action.reset().setLoop(THREE.LoopOnce)
      action.clampWhenFinished = true
      action.paused = false
      action.timeScale = playDirection

      // For reverse, start from the end
      if (playDirection === -1) {
        action.time = action.getClip().duration
      }

      action.play()
    }
  }, [shouldAnimate, playDirection, actions])

  return <primitive object={scene} {...props} />
}
