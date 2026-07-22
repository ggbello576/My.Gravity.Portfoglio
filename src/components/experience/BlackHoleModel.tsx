import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { scrollStore } from '../../lib/scrollStore'

const MODEL_PATH = '/models/blackhole/scene.gltf'
const MODEL_ROTATION_SPEED = Math.PI * 0.2

type Props = { reducedMotion: boolean; mobile: boolean }

export function BlackHoleModel({ reducedMotion, mobile }: Props) {
  const outer = useRef<THREE.Group>(null)
  const animated = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const gl = useThree((state) => state.gl)

  const normalized = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const scale = 4.4 / Math.max(size.x, size.y, size.z)
    return { scale, position: center.multiplyScalar(-scale) }
  }, [scene])

  useLayoutEffect(() => {
    const anisotropy = Math.max(1, Math.min(gl.capabilities.getMaxAnisotropy(), mobile ? 2 : 4))
    const textures = new Set<THREE.Texture>()

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      const materials = Array.isArray(object.material) ? object.material : [object.material]

      materials.forEach((material) => {
        if (material.name === 'Blackhole_ring') material.forceSinglePass = true
        if (!(material instanceof THREE.MeshStandardMaterial)) return
        if (material.map) textures.add(material.map)
        if (material.emissiveMap) textures.add(material.emissiveMap)
      })
    })

    textures.forEach((texture) => {
      if (texture.anisotropy === anisotropy) return
      texture.anisotropy = anisotropy
      texture.needsUpdate = true
    })
  }, [gl, mobile, scene])

  useFrame((state, delta) => {
    if (!outer.current) return
    const frameDelta = Math.min(delta, 0.05)
    if (animated.current && !reducedMotion) {
      animated.current.rotation.y = (animated.current.rotation.y + frameDelta * MODEL_ROTATION_SPEED) % (Math.PI * 2)
    }
    const progress = reducedMotion ? 0.34 : scrollStore.progress
    let targetX = 0
    if (progress > 0.18 && progress < 0.42) targetX = mobile ? 0.5 : 1.55
    else if (progress >= 0.42 && progress < 0.67) targetX = mobile ? -0.45 : -1.45
    else if (progress >= 0.67 && progress < 0.84) targetX = mobile ? 0.15 : 0.45
    outer.current.position.x = THREE.MathUtils.damp(outer.current.position.x, targetX, 2.4, frameDelta)
    outer.current.position.y = THREE.MathUtils.damp(outer.current.position.y, progress < 0.15 ? -0.35 : 0, 2, frameDelta)
    outer.current.rotation.z += frameDelta * (reducedMotion ? 0.015 : 0.045)
    outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, 0.12 + progress * 0.12, 2, frameDelta)
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.6) * (reducedMotion ? 0.002 : 0.008)
    outer.current.scale.setScalar(pulse)
  })

  return (
    <group ref={outer}>
      <group ref={animated} scale={normalized.scale} position={normalized.position}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_PATH)
