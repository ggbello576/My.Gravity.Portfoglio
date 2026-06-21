import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

const MODEL_PATH = '/models/blackhole/scene.gltf'

type Props = { reducedMotion: boolean; mobile: boolean }

export function BlackHoleModel({ reducedMotion, mobile }: Props) {
  const outer = useRef<THREE.Group>(null)
  const animated = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_PATH)
  const clone = useMemo(() => scene.clone(true), [scene])
  const { actions, mixer } = useAnimations(animations, animated)

  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = 4.4 / Math.max(size.x, size.y, size.z)
    return { scale, position: center.multiplyScalar(-scale) }
  }, [clone])

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().fadeIn(0.5).play())
    return () => Object.values(actions).forEach((action) => action?.stop())
  }, [actions])

  useFrame((state, delta) => {
    mixer.update(delta)
    if (!outer.current) return
    const progress = reducedMotion ? 0.34 : scrollStore.progress
    let targetX = 0
    if (progress > 0.18 && progress < 0.42) targetX = mobile ? 0.5 : 1.55
    else if (progress >= 0.42 && progress < 0.67) targetX = mobile ? -0.45 : -1.45
    else if (progress >= 0.67 && progress < 0.84) targetX = mobile ? 0.15 : 0.45
    outer.current.position.x = THREE.MathUtils.damp(outer.current.position.x, targetX, 2.4, delta)
    outer.current.position.y = THREE.MathUtils.damp(outer.current.position.y, progress < 0.15 ? -0.35 : 0, 2, delta)
    outer.current.rotation.z += delta * (reducedMotion ? 0.015 : 0.045)
    outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, 0.12 + progress * 0.12, 2, delta)
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.6) * (reducedMotion ? 0.002 : 0.008)
    outer.current.scale.setScalar(pulse)
  })

  return (
    <group ref={outer}>
      <group ref={animated} scale={normalized.scale} position={normalized.position}>
        <primitive object={clone} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
