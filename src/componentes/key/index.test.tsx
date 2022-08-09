import { render, screen } from '@testing-library/react'
import Key from './index'

describe('component key', () => {
  render(<Key label="Button" selected={true} />)
  const key = screen.getByTestId('key')

  test('should be rendered', () => {
    expect(key).toBeInTheDocument()
  })
})
