import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { BlackHoleModel } from './BlackHoleModel'
import { CameraRig } from './CameraRig'
import { SceneLights } from './SceneLights'
import { SpaceParticles } from './SpaceParticles'

type Props = { reducedMotion: boolean }

export function ExperienceCanvas({ reducedMotion }: Props) {
  const mobile = window.matchMedia('(max-width: 700px)').matches
  const constrainedDevice = mobile || (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4)
  const highDpr = Math.min(window.devicePixelRatio, constrainedDevice ? 1 : 1.5)
  const [dpr, setDpr] = useState(highDpr)

  return (
    <Canvas
      dpr={dpr}
      frameloop={reducedMotion ? 'demand' : 'always'}
      camera={{ position: [0, 0.2, 10], fov: 42, near: 0.05, far: 100 }}
      gl={{ antialias: !constrainedDevice, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor('#030303', 1)
      }}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(highDpr)}
      />
      <Suspense fallback={null}>
        <BlackHoleModel reducedMotion={reducedMotion} mobile={constrainedDevice} />
      </Suspense>
      <SpaceParticles reducedMotion={reducedMotion} mobile={constrainedDevice} />
      <SceneLights />
      <CameraRig reducedMotion={reducedMotion} mobile={constrainedDevice} />
    </Canvas>
  )
}
