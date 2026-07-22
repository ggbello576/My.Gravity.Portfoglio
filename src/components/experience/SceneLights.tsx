type Props = { mobile: boolean }

export function SceneLights({ mobile }: Props) {
  return (
    <>
      <hemisphereLight args={['#6c7187', '#170b05', 0.18]} />
      <directionalLight color="#e28c45" intensity={1.1} position={[3, 4, 5]} />
      {!mobile && <pointLight color="#6984b8" intensity={4} distance={12} position={[-4, 1, -1]} />}
    </>
  )
}
