import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { BlackHoleModel } from './BlackHoleModel'
import { CameraRig } from './CameraRig'
import { SceneLights } from './SceneLights'
import { SpaceParticles } from './SpaceParticles'

type Props = { reducedMotion: boolean }

function getDeviceProfile() {
  const compact = window.matchMedia('(max-width: 900px)').matches
  const lowCoreCount = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4
  const constrained = compact || lowCoreCount
  return {
    compact,
    constrained,
    maxDpr: Math.min(window.devicePixelRatio || 1, constrained ? 1.25 : 1.5),
  }
}

export function ExperienceCanvas({ reducedMotion }: Props) {
  const [profile, setProfile] = useState(getDeviceProfile)
  const profileRef = useRef(profile)
  const [dpr, setDpr] = useState(profile.maxDpr)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== 'hidden')

  useEffect(() => {
    let frame = 0
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const next = getDeviceProfile()
        const current = profileRef.current
        if (current.compact === next.compact && current.constrained === next.constrained && current.maxDpr === next.maxDpr) return
        profileRef.current = next
        setProfile(next)
        setDpr(next.maxDpr)
      })
    }
    const compactQuery = window.matchMedia('(max-width: 900px)')
    compactQuery.addEventListener('change', update)
    window.addEventListener('resize', update, { passive: true })
    window.visualViewport?.addEventListener('resize', update, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      compactQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState !== 'hidden')
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return (
    <Canvas
      dpr={dpr}
      frameloop={reducedMotion || !pageVisible ? 'demand' : 'always'}
      camera={{ position: [0, 0.2, 10], fov: 42, near: 0.05, far: 100 }}
      gl={{ antialias: !profile.constrained, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor('#030303', 1)
      }}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(profile.maxDpr)}
      />
      <Suspense fallback={null}>
        <BlackHoleModel reducedMotion={reducedMotion} mobile={profile.compact} />
      </Suspense>
      <SpaceParticles reducedMotion={reducedMotion} mobile={profile.constrained} />
      <SceneLights />
      <CameraRig reducedMotion={reducedMotion} mobile={profile.compact} />
    </Canvas>
  )
}
