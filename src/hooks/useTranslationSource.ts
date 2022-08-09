import { useReducer } from 'react'
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

export const reducer = (state: SourceParsed[], action: { type: string }) => {
  let next = [ ...state ]
  switch (action.type) {
    case Action.PUSH:
      const [first, ...rest] = next
      return [...rest, first]
    case Action.SHIFT:
      next.shift()
      return next
  }
  return state
}

const useTranslationSource = (data: SourceRaw[]): [SourceParsed, Actions, Payload] => {
  const [words, dispatch] = useReducer(reducer, data.map(parse))

  return [
    words[0], 
    { 
      push: () => dispatch({ type: Action.PUSH }),
      shift: () => dispatch({ type: Action.SHIFT }) 
    }, 
    { remaining: words.length }
  ]
}

export default useTranslationSource