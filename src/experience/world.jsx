import React, { useState, Suspense, lazy, useRef, useEffect } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Lights from './lights'
import House from './objects/house'
import Mountains from './objects/mountains'
import NavigationBoard from './objects/navigationBoard'
import GWagon from './objects/gwagon'
import GypsySignBoard from './objects/gypsySignBoard'
import Fireflies from './objects/fireflies'
import ContactInformation from './objects/contactInformation'
import ContactBackButton from './objects/contactBackButton'

import contactInformationAnimation from './utils/contactInformationAnimation'
import contactBackButtonAnimation from './utils/contactBackButtonAnimation'
import aboutButtonAnimation from './utils/aboutButtonAnimation'
import DebugCameraLogger from './utils/debugcameralogger'
import CameraFlyby from './utils/cameraflyby'
import slideBackButtonAnimation from './utils/slideBackButtonAnimation'

const LazyGWagon2 = lazy(() => import('./objects/gwagon2'))
const LazyReplaySlide = lazy(() => import('./objects/replaySlide'))
const LazyBackSlide = lazy(() => import('./objects/backSlide'))

const slideModules = [
  () => import('./objects/slide1'),
  () => import('./objects/slide2'),
  () => import('./objects/slide3'),
  () => import('./objects/slide4'),
  () => import('./objects/slide5')
]

export default function World() {
  const { camera, controls } = useThree()

  const [gwagonPlayDirection, setGwagonPlayDirection] = useState(1)
  const [shouldAnimateGwagon2, setShouldAnimateGwagon2] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false)
  const [showBackButtonMesh, setShowBackButtonMesh] = useState(false)
  const projectorFlickerEnabled = useRef(true)

  const [LoadedSlide, setLoadedSlide] = useState(null)
  const [PreviousSlide, setPreviousSlide] = useState(null)
  const [showFinalButtons, setShowFinalButtons] = useState(false)

  // Preload essential GLTFs
  useGLTF.preload('/models/contactInformation.gltf')
  useGLTF.preload('/models/contactBackButton.gltf')
  useGLTF.preload('/models/slide1.gltf')
  useGLTF.preload('/models/slide2.gltf')
  useGLTF.preload('/models/slide3.gltf')
  useGLTF.preload('/models/slide4.gltf')
  useGLTF.preload('/models/slide5.gltf')

  const preloadAllSlides = async () => {
    for (let i = 0; i < slideModules.length; i++) {
      const preloadFn = () => slideModules[i]().then(() => {
        console.log(`Slide ${i + 1} preloaded`)
      })
      if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadFn)
      } else {
        preloadFn()
      }
    }
  }

  /* hybrid preloadAllSlides() that loads the first 2 slides immediately and then idle loads slides 345 in the background (can use this if gsap animation starts to get laggy)

  const preloadAllSlides = () => {
  for (let i = 0; i < slideModules.length; i++) {
    const preloadFn = () =>
      slideModules[i]().then(() => {
        console.log(`Slide ${i + 1} preloaded`)
      })

    if (i < 2) {
      // Immediately load first 2 slides
      preloadFn()
    } else if ('requestIdleCallback' in window) {
      // Idle-load the rest
      requestIdleCallback(preloadFn)
    } else {
      // Fallback if idleCallback isn't available (Safari)
      setTimeout(preloadFn, 1000)
    }
  }
}

  */

  const handleSlideBackButtonClick = () => {
    slideBackButtonAnimation({
      camera,
      controls,
      onComplete: () => {
        setLoadedSlide(null)
        setShowFinalButtons(false)
        projectorFlickerEnabled.current = true
      }
    })
  }

  const handleSlideReplayButtonClick = () => {
    setShowFinalButtons(false)
    setLoadedSlide(null)
    setPreviousSlide(null)
    setTimeout(() => startSlideshow(), 300)
  }

  const startSlideshow = async () => {
    for (let i = 0; i < slideModules.length; i++) {
      if (i === slideModules.length - 2) {
        useGLTF.preload('/models/replaySlide.gltf')
        useGLTF.preload('/models/backSlide.gltf')
      }

      setShowFinalButtons(false)
      const { default: Slide } = await slideModules[i]()
      setPreviousSlide(() => LoadedSlide)
      setLoadedSlide(() => Slide)

      await new Promise((res) => setTimeout(res, 8000))
      setPreviousSlide(null)
    }

    // Show final buttons instead of putting them inside a slide
    projectorFlickerEnabled.current = true
    setShowFinalButtons(true)
    setLoadedSlide(null)
  }

  const handleAboutClick = () => {
    setShowFinalButtons(false)
    setLoadedSlide(null)
    setPreviousSlide(null)
    projectorFlickerEnabled.current = false
    preloadAllSlides()
    aboutButtonAnimation({ camera, controls })
    setTimeout(startSlideshow, 500)
  }

  const handleContactClick = () => {
    setGwagonPlayDirection(1)
    setShouldAnimateGwagon2(true)
    setShowContact(true)

    contactInformationAnimation({
      camera,
      controls,
      onComplete: () => {
        setShowBackButtonMesh(true)
      }
    })
  }

  const handleContactBackClick = () => {
    setGwagonPlayDirection(-1)
    setShouldAnimateGwagon2(true)
    setTimeout(() => {
      setShowContact(false)
      setShowBackButtonMesh(false)
      contactBackButtonAnimation({ camera, controls })
    }, 300)
  }

  return (
    <>
      {!hasIntroPlayed && (
        <CameraFlyby onComplete={() => setHasIntroPlayed(true)} />
      )}

      <DebugCameraLogger />
      <Lights />
      <House projectorFlickerEnabled={projectorFlickerEnabled} />
      <NavigationBoard
        onContactClick={handleContactClick}
        onAboutClick={handleAboutClick}
      />
      <Mountains />
      <GWagon />
      <Fireflies count={50} />
      <GypsySignBoard />

      <Suspense fallback={null}>
        {PreviousSlide && <PreviousSlide />}
        {LoadedSlide && <LoadedSlide />}
        {showFinalButtons && (
          <>
            <LazyReplaySlide onReplaySlideClicked={handleSlideReplayButtonClick} />
            <LazyBackSlide onBackSlideClicked={handleSlideBackButtonClick} />
          </>
        )}
      </Suspense>

      <OrbitControls makeDefault />

      <Suspense fallback={null}>
        <LazyGWagon2
          shouldAnimate={shouldAnimateGwagon2}
          playDirection={gwagonPlayDirection}
        />
      </Suspense>

      {showBackButtonMesh && (
        <ContactBackButton onClick={handleContactBackClick} />
      )}
      {showContact && <ContactInformation />}

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </>
  )
}
