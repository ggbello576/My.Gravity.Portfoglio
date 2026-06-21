import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'

type Props = { onComplete: () => void }

export function Loader({ onComplete }: Props) {
  const { active, progress } = useProgress()
  const [leaving, setLeaving] = useState(false)
  const completed = useRef(false)

  useEffect(() => {
    if (active || progress < 100 || completed.current) return
    completed.current = true
    setLeaving(true)
  }, [active, progress])

  return (
    <div className={`loader${leaving ? ' is-complete' : ''}`} onTransitionEnd={(event) => {
      if (leaving && event.target === event.currentTarget) onComplete()
    }}>
      <div className="loader-inner">
        <p>INITIALIZING GRAVITY</p>
        <div className="loader-number">{Math.round(progress).toString().padStart(3, '0')}</div>
        <div className="loader-track"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
    </div>
  )
}
