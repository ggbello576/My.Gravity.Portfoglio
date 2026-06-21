import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BlackHoleModel } from './BlackHoleModel'
import { CameraRig } from './CameraRig'
import { SceneLights } from './SceneLights'
import { SpaceParticles } from './SpaceParticles'

type Props = { reducedMotion: boolean }

export function ExperienceCanvas({ reducedMotion }: Props) {
  const mobile = window.matchMedia('(max-width: 700px)').matches

  return (
    <Canvas
      dpr={mobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0.2, 10], fov: 42, near: 0.05, far: 100 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#030303', 1)
      }}
    >
      <Suspense fallback={null}>
        <BlackHoleModel reducedMotion={reducedMotion} mobile={mobile} />
      </Suspense>
      <SpaceParticles reducedMotion={reducedMotion} mobile={mobile} />
      <SceneLights />
      <CameraRig reducedMotion={reducedMotion} mobile={mobile} />
    </Canvas>
  )
}
