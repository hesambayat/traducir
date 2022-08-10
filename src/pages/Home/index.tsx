import { useCallback, useEffect, useReducer } from 'react'
import { Button, Keypad } from '../../componentes'
import { Congrats } from '../../pages'
import { useTranslationSource } from '../../hooks'
import Score from './Score'
import Question from './Question'
import words from '../../words.json'

enum Action {
  ADD = 'ADD',
  REMOVE = 'REMOVE'
}

const reducer = (state: number[][], action: { type: Action, payload?: number[][] }) => {
  switch (action.type) {
    case Action.ADD:
      return action.payload || []
    case Action.REMOVE:
      return []
    default:
      return state
  }
}

export const Home = () => {
  const [source, action, { remaining, total, status }] = useTranslationSource(words)
  const [highlights, dispatch] = useReducer(reducer, [])
  const onDone = useCallback((selected: number[][]) => {
    const { map } = source
    const payload = [...highlights, ...selected].filter((n, i, s) => s.indexOf(n) === i)
    const visited = payload.map(n => n.toString())
    const solved = map.flat().every(n => visited.includes(n.toString()))
    if (solved) {
      dispatch({ type: Action.REMOVE })
      action.shift()
    } else {
      dispatch({ type: Action.ADD, payload })
    }
  }, [source, highlights, action, dispatch])

  useEffect(() => {
    dispatch({ type: Action.REMOVE })
  }, [source, dispatch])

  if (!source) {
    return <Congrats />
  }

  return (
    <div className="home">
      <Score total={total} remaining={remaining} />
      <main>
        <Question answers={source.map.length} origin={source.origin} transforming={status !== 'idle'} />
        <Keypad {...source} highlights={highlights} onDone={onDone} transforming={status} />
        <div className="home__actions">
          <Button label="Skip &#10230;" disabled={remaining < 2 || status !== 'idle'} onClick={action.push} />
        </div>
      </main>
    </div>
  )
}

export default Home
