import { render } from '@testing-library/react'
import Home from '.'

describe('renders home page', () => {
  const { asFragment } = render(<Home />)
  const dom = asFragment()

  test('should match the snapshot', () => {
    expect(dom).toMatchSnapshot()
  })
})
