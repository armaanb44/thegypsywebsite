import gsap from "gsap"

export default function contactInformationAnimation({ camera, controls, onComplete }) {
  if (!camera || !controls) {
    console.warn("🚨 camera or controls not available")
    return
  }

  // 🔍 Check for mobile screen
  const isMobile = window.innerWidth <= 768

  // 🎯 Set mobile or desktop camera position and target
  const targetPosition = isMobile
    ? { x: -0.866, y: 51.368, z: 28.845 } // <- Tweak this for your mobile layout
    : { x: -0.808, y: 27.941, z: 32.258 }

  const targetLookAt = isMobile
    ? { x: -.703, y: 4.660, z: 6.521 } // <- Tweak this to match mobile focus point
    : { x: -0.804, y: 1.784, z: 9.999 }

  // 🎥 Animate camera position
  gsap.to(camera.position, {
    ...targetPosition,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => controls.update(),
    onComplete,
  })

  // 🎯 Animate controls target
  gsap.to(controls.target, {
    ...targetLookAt,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => controls.update(),
  })
}

