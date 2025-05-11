import gsap from "gsap"

export default function aboutButtonAnimation({ camera, controls, onComplete }) {
  if (!camera || !controls) {
    console.warn("🚨 camera or controls not available")
    return
  }

  // 🔍 Check for mobile screen
  const isMobile = window.innerWidth <= 768

  // 🎯 Set mobile or desktop camera position and target
  const targetPosition = isMobile
    ? { x: 2.146, y: 17.935, z: -11.721 } // <- Tweak this for your mobile layout
    : { x: 1.963, y: 17.194, z: -10.497}

  const targetLookAt = isMobile
    ? { x: -.533, y: 10.912, z: 15.051 } // <- Tweak this to match mobile focus point
    : { x: -0.404, y: 9.694, z: 14.723 }

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

