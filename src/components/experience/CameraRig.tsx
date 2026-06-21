/* eslint-disable react-hooks/immutability -- Three.js camera objects are intentionally mutated by the render loop. */
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

type Keyframe = { at: number; position: THREE.Vector3; target: THREE.Vector3; fov: number }
const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
const frames: Keyframe[] = [
  { at: 0, position: v(0, 0.2, 10), target: v(0, 0, 0), fov: 42 },
  { at: 0.18, position: v(0, 0.1, 7), target: v(0, 0, 0), fov: 40 },
  { at: 0.36, position: v(-2.4, 0.7, 5.8), target: v(0.4, 0, 0), fov: 38 },
  { at: 0.55, position: v(2.7, -0.4, 4.8), target: v(-0.3, 0, 0), fov: 42 },
  { at: 0.73, position: v(-1.2, 0.15, 3.4), target: v(0, 0, 0), fov: 48 },
  { at: 0.88, position: v(0, 0, 2.2), target: v(0, 0, 0), fov: 55 },
  { at: 1, position: v(0, 0, 0.28), target: v(0, 0, -0.25), fov: 70 },
]

function sample(progress: number) {
  let index = frames.findIndex((frame) => frame.at >= progress)
  if (index <= 0) index = 1
  const a = frames[index - 1]
  const b = frames[index]
  const t = THREE.MathUtils.smoothstep((progress - a.at) / (b.at - a.at), 0, 1)
  return {
    position: a.position.clone().lerp(b.position, t),
    target: a.target.clone().lerp(b.target, t),
    fov: THREE.MathUtils.lerp(a.fov, b.fov, t),
  }
}

type Props = { reducedMotion: boolean; mobile: boolean }

export function CameraRig({ reducedMotion, mobile }: Props) {
  const { camera, pointer } = useThree()
  const lookTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    camera.position.copy(frames[0].position)
    camera.lookAt(frames[0].target)
  }, [camera])

  useFrame((_, delta) => {
    const progress = reducedMotion ? 0.3 : Math.min(scrollStore.progress, mobile ? 0.955 : 1)
    const desired = sample(progress)
    const influence = mobile || reducedMotion ? 0 : 0.1
    desired.position.x += pointer.x * influence
    desired.position.y += pointer.y * influence * 0.6
    camera.position.lerp(desired.position, 1 - Math.exp(-delta * 4))
    lookTarget.current.lerp(desired.target, 1 - Math.exp(-delta * 5))
    camera.lookAt(lookTarget.current)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, desired.fov, 4, delta)
      camera.updateProjectionMatrix()
    }
  })

  return null
}
