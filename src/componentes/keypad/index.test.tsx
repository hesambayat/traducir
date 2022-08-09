import { render, screen } from '@testing-library/react'
import { parse } from '../../hooks/useTranslationSource'
import * as mock from '../../mock'
import Keypad from './index'

describe('component Keypad', () => {
  const [source] = mock.data.map(parse)
  render(<Keypad {...source} />)
  const keys = screen.getAllByTestId('key')
  const totalKeys = source.grid.reduce((total, row) => total + row.length, 0)

  test('should keys be rendered', () => {
    expect(keys.length).toEqual(totalKeys)
  })
})
