import { useEffect, useMemo, useReducer, useState } from 'react'
import { SourceRaw, SourceParsed } from '../types'

export enum Action {
  PUSH = 'PUSH',
  SHIFT = 'SHIFT'
}

interface Actions {
  push: () => void
  shift: () => void
}

interface Payload {
  remaining: number
  total: number
  status: string
}

const normalize = (locations: string): SourceParsed['map'] => {
  return Object.entries(locations).map(([map]) => {
    let match = map.match(/([^,],[^,])/g)
    if (!match) {
      return [[]]
    }
  
    return match.map(n => n.split(',').map(Number))
  })
}

export const parse = (source: SourceRaw): SourceParsed => ({
  grid: source.character_grid,
  origin: source.word,
  map: normalize(source.word_locations),
})

export const reducer = (state: SourceParsed[], action: { type: Action }) => {
  let next = [ ...state ]
  switch (action.type) {
    case Action.PUSH:
      const [first, ...rest] = next
      return [...rest, first]
    case Action.SHIFT:
      next.shift()
      return next
    default:
      return state
  }
}

export const useTranslationSource = (data: SourceRaw[]): [SourceParsed, Actions, Payload] => {
  const source = useMemo(() => data.map(parse), [data])
  const [words, dispatch] = useReducer(reducer, source)
  const [word, setWord] = useState(words[0])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    setStatus('out')
    const emit = setTimeout(() => {
      const [word] = words
      setWord(word)
      setStatus('in')
    }, 1200)
    const stop = setTimeout(() => {
      setStatus('idle')
    }, 2600)
    return () => {
      clearTimeout(emit)
      clearTimeout(stop)
    }
  }, [words, setWord, setStatus])

  return [
    word, 
    { 
      push: () => dispatch({ type: Action.PUSH }),
      shift: () => dispatch({ type: Action.SHIFT }) 
    }, 
    { remaining: words.length, total: source.length, status }
  ]
}

export default useTranslationSource