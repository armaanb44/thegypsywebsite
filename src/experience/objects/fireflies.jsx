import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import firefliesVertexShader from '../../shaders/fireflies/vertex.glsl'
import firefliesFragmentShader from '../../shaders/fireflies/fragment.glsl'
import useResize from '../utils/useResize'
//import GUI from '../utils/gui'


export default function Fireflies({ count = 100 }) {
  const pointsRef = useRef()

//create buffer geometry for fireflies
const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        posArray[i * 3 + 0] = (Math.random() -0.5) * 70
        posArray[i * 3 + 1] = Math.random() * 8 + 3
        posArray[i * 3 + 2] = (Math.random() * -0.5) * 70
    }
    return posArray
}, [count])

const ascale = useMemo(() => {
    const scaleArray = new Float32Array(count)
    for (let i = 0; i < count; i++) {
        scaleArray[i] = Math.random() 
    }
    
    return scaleArray
    
}, [count])



// create shader uniforms

const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 500 }
}), [])

/*useEffect(() => {
    const sizeController = GUI.add(uniforms.uSize, 'value')
    
      .min(0)
      .max(500)
      .step(1)
      .name('fireflies size')
      return () => {
        sizeController.destroy() // ✅ This is the correct method
      }
  }, [])
*/
// update uPixelRatio on resize
useResize(() => {
    uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

useFrame ((_, delta) => {
    if(pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.1 // rotate the fireflies
    }
})

return (
    <points ref ={pointsRef}>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={positions.length / 3}
                array={positions}
                itemSize={3}
            />
            <bufferAttribute
                attach="attributes-scale"
                count={ascale.length}
                array={ascale}
                itemSize={1}
                />
        </bufferGeometry>
        <shaderMaterial
  uniforms={uniforms}
  vertexShader={firefliesVertexShader}
  fragmentShader={firefliesFragmentShader}
  transparent = {true}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>
    </points>
)

}




