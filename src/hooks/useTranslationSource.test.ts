import { parse, reducer, Action } from './useTranslationSource'
import * as mock from '../mock'

describe('translation source hook parse and actions', () => {
  const normalized = mock.data.map(parse)
  const [source] = normalized
  const [parsed] = mock.parsed
  const [, pushed] = reducer([...normalized], { type: Action.PUSH })
  const shifted = reducer([...normalized], { type: Action.SHIFT })

  test('action shift should remove the first item', () => {
    expect(shifted.length).toEqual(normalized.length - 1)
  })

  test('action push should move the first item to the end', () => {
    expect(pushed).toEqual(parsed)
  })

  test('source parse should match', () => {
    expect(source).toEqual(parsed)
  })
})
