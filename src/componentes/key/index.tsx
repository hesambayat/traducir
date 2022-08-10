import { CSSProperties, useMemo } from 'react'

interface KeyProps {
  label: string
  selected?: boolean
  status?: string
  onStart?: () => void
  onEnd?: () => void
  onMove?: () => void
}

export const Key = ({ label, selected, status = 'idle', onStart, onEnd, onMove }: KeyProps) => {
  const style = useMemo(() => ({ '--delay': `${(Math.floor(Math.random() * 9) + 1) * 100}ms` } as CSSProperties), [])

  return <button
    data-testid="key"
    className={`key key--${status} ${selected ? 'key--selected' : ''}`}
    style={style}
    onMouseDown={onStart}
    onMouseUp={onEnd} 
    onMouseMove={onMove}>{label}</button>
}

export default Key
