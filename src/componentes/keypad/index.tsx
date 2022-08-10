import { CSSProperties, useCallback, useEffect, useMemo, useReducer } from 'react'
import { Move, SourceParsed } from '../../types'
import Key from '../key'

interface KeypadProps extends SourceParsed {
  transforming?: string
  highlights?: number[][]
  onDone?: (map: number[][]) => void
}

interface KeypadReducerAction {
  type: string
  target: number[]
}

const reducer = (state: number[][], action: KeypadReducerAction) => {
  switch (action.type) {
    case Move.DOWN:
      return [action.target]
    case Move.MOVE:
      const [first] = state
      const [ax, ay] = first
      const [bx, by] = action.target
      const hor = Math.abs(ax - bx)
      const ver = Math.abs(ay - by)
      const length = hor && ver ? Math.min(hor, ver) : hor || ver
      if (!length) {
        return [action.target]
      }

      return [
        first,
        ...Array.from({ length }, (_, i) => [((i + 1) * Math.sign(ax - bx) * -1) + ax, ((i + 1) * Math.sign(ay - by) * -1) + ay])
      ]
    case Move.UP:
      return []
    default:
      throw new Error('Action not supported')
  }
}

export const Keypad = ({ origin, grid, map, highlights, transforming, onDone }: KeypadProps) => {
  
  const [trace, dispatch] = useReducer(reducer, [])
  const columns = useMemo(() => {
    const [first] = grid
    return { style: { '--grid': first.length } as CSSProperties }
  }, [grid])
  const onStart = useCallback((target: KeypadReducerAction['target']) => {
    return () => dispatch({ type: Move.DOWN, target })
  }, [dispatch])
  const onEnd = useCallback((target: KeypadReducerAction['target']) => {
    return () => {
      const traceString = trace.slice().map(n => n.toString()).sort().toString()
      map.find((check) => {
        const checkString = check.map(n => n.toString()).sort().toString()
        if (checkString === traceString) {
          onDone && onDone(check)
          return true
        }
        
        return false
      })

      dispatch({ type: Move.UP, target })
    }
  }, [dispatch, trace, map, onDone])
  const onMove = useCallback((target: KeypadReducerAction['target']) => {
    return () => {
      if (trace.length) {
        dispatch({ type: Move.MOVE, target })
      }
    }
  }, [dispatch, trace])
  const isSelected = useCallback((target: KeypadReducerAction['target']) => {
    return [...trace, ...(highlights || [])].map(n => n.toString()).includes(target.toString())
  }, [trace, highlights])

  useEffect(() => {
    dispatch({ type: Move.UP, target: [] })
  }, [origin])

  return (
    <div className="keypad" {...columns}>
      {grid.map((row, rowIndex) => (
          row.map((letter, columnIndex) => {
            const target = [columnIndex, rowIndex]
            return (
              <Key
                key={`${letter}-${columnIndex}`} 
                label={letter}
                selected={isSelected(target)}
                onStart={onStart(target)}
                onEnd={onEnd(target)}
                onMove={onMove(target)}
                status={transforming}
              />
            )
          })
      ))}
    </div>
  )
}

export default Keypad
