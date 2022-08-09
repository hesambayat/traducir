import { render, screen } from '@testing-library/react'
import Button from './index'

describe('component Button', () => {
  render(
    <div className="buttons">
      <Button label="Im clickable" />
      <Button label="Im not clickable" disabled={true} />
    </div>
  )

  const button = screen.getByText('Im clickable')
  const disabled = screen.getByText('Im not clickable')

  test('should be rendered', () => {
    expect(button).toBeInTheDocument()
    expect(disabled).toBeInTheDocument()
  })

  test('should be clickable', () => {
    expect(button).not.toBeDisabled()
  })

  test('should be disabled', () => {
    expect(disabled).toBeDisabled()
  })
})
