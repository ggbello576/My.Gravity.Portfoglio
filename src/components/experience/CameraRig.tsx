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

function sample(progress: number, position: THREE.Vector3, target: THREE.Vector3) {
  let index = frames.findIndex((frame) => frame.at >= progress)
  if (index <= 0) index = 1
  const a = frames[index - 1]
  const b = frames[index]
  const t = THREE.MathUtils.smoothstep((progress - a.at) / (b.at - a.at), 0, 1)
  position.lerpVectors(a.position, b.position, t)
  target.lerpVectors(a.target, b.target, t)
  return THREE.MathUtils.lerp(a.fov, b.fov, t)
}

type Props = { reducedMotion: boolean; mobile: boolean }

export function CameraRig({ reducedMotion, mobile }: Props) {
  const { camera, pointer } = useThree()
  const lookTarget = useRef(new THREE.Vector3())
  const desiredPosition = useRef(new THREE.Vector3())
  const desiredTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    camera.position.copy(frames[0].position)
    camera.lookAt(frames[0].target)
  }, [camera])

  useFrame((_, delta) => {
    const frameDelta = Math.min(delta, 0.05)
    const progress = reducedMotion ? 0.3 : Math.min(scrollStore.progress, mobile ? 0.955 : 1)
    const desiredFov = sample(progress, desiredPosition.current, desiredTarget.current)
    const influence = mobile || reducedMotion ? 0 : 0.1
    desiredPosition.current.x += pointer.x * influence
    desiredPosition.current.y += pointer.y * influence * 0.6
    camera.position.lerp(desiredPosition.current, 1 - Math.exp(-frameDelta * 4))
    lookTarget.current.lerp(desiredTarget.current, 1 - Math.exp(-frameDelta * 5))
    camera.lookAt(lookTarget.current)
    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = THREE.MathUtils.damp(camera.fov, desiredFov, 4, frameDelta)
      if (Math.abs(nextFov - camera.fov) > 0.001) {
        camera.fov = nextFov
        camera.updateProjectionMatrix()
      }
    }
  })

  return null
}
