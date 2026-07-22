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
  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const lowMemory = deviceMemory !== undefined && deviceMemory <= 4
  const constrained = lowCoreCount || lowMemory
  const maxDpr = Math.min(window.devicePixelRatio || 1, constrained ? 1.35 : 1.5)
  const initialDpr = Math.min(maxDpr, compact ? (constrained ? 1.25 : 1.35) : maxDpr)

  return {
    compact,
    constrained,
    initialDpr,
    maxDpr,
    minDpr: Math.min(maxDpr, constrained ? 1 : 1.15),
  }
}

export function ExperienceCanvas({ reducedMotion }: Props) {
  const [profile, setProfile] = useState(getDeviceProfile)
  const profileRef = useRef(profile)
  const [dpr, setDpr] = useState(profile.initialDpr)
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState !== 'hidden')

  useEffect(() => {
    let frame = 0
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const next = getDeviceProfile()
        const current = profileRef.current
        if (
          current.compact === next.compact
          && current.constrained === next.constrained
          && current.initialDpr === next.initialDpr
          && current.maxDpr === next.maxDpr
          && current.minDpr === next.minDpr
        ) return
        profileRef.current = next
        setProfile(next)
        setDpr(next.initialDpr)
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
      gl={{
        antialias: profile.maxDpr <= 1.1,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#030303', 1)
      }}
    >
      <PerformanceMonitor
        bounds={(refreshRate) => {
          return refreshRate > 90 ? [55, 90] : [45, 58]
        }}
        onDecline={() => setDpr((current) => Math.max(profile.minDpr, Math.round((current - 0.15) * 100) / 100))}
        onIncline={() => setDpr((current) => Math.min(profile.maxDpr, Math.round((current + 0.1) * 100) / 100))}
      />
      <Suspense fallback={null}>
        <BlackHoleModel reducedMotion={reducedMotion} mobile={profile.compact} />
      </Suspense>
      <SpaceParticles reducedMotion={reducedMotion} mobile={profile.compact || profile.constrained} />
      <SceneLights mobile={profile.compact} />
      <CameraRig reducedMotion={reducedMotion} mobile={profile.compact} />
    </Canvas>
  )
}
