import { useCallback, useEffect, useReducer } from 'react'
import { Button, Keypad } from '../../componentes'
import { Congrats } from '../../pages'
import { useTranslationSource } from '../../hooks'
import { useModal } from '../../context/modal'
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
  const [source, action, { remaining, total }] = useTranslationSource(words)
  const [highlights, dispatch] = useReducer(reducer, [])
  const { setModal } = useModal()
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
      <header>
        <button className="home__score" onClick={setModal}>
          <span>?</span> You got {total - remaining}/{total}
        </button>
      </header>
      <main>
        <h1 className="home__question">{source.map.length > 1 ? `What are ${source.map.length} Spanish words for` : `What's Spanish for`} <span>{source.origin}</span></h1>
        <Keypad {...source} highlights={highlights} onDone={onDone} />
        <div className="home__actions">
          <Button label="Skip &#10230;" disabled={remaining < 2} onClick={action.push} />
        </div>
      </main>
    </div>
  )
}

export default Home
