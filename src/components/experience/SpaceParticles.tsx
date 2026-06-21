import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

type Props = { reducedMotion: boolean; mobile: boolean }

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

export function SpaceParticles({ reducedMotion, mobile }: Props) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.PointsMaterial>(null)
  const positions = useMemo(() => {
    const count = mobile ? 520 : 1200
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 7 + pseudoRandom(i * 3 + 1) * 25
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i * 3 + 3) - 1)
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      values[i * 3 + 2] = radius * Math.cos(phi)
    }
    return values
  }, [mobile])

  useFrame((_, delta) => {
    if (!points.current || !material.current) return
    const progress = scrollStore.progress
    points.current.rotation.y += delta * (reducedMotion ? 0.002 : 0.008 + progress * 0.008)
    material.current.opacity = THREE.MathUtils.damp(
      material.current.opacity,
      progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.15) * 0.5 : 0.18 + progress * 0.32,
      3,
      delta,
    )
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={material} color="#d9c6ac" size={mobile ? 0.025 : 0.032} transparent opacity={0.18} depthWrite={false} />
    </points>
  )
}
