import { render } from '@testing-library/react'
import Score from './Score'

describe('renders home page feature / score', () => {
  const { asFragment } = render(<Score total={9} remaining={0} />)
  const dom = asFragment()
  test('should match the snapshot', () => {
    expect(dom).toMatchSnapshot()
  })
})
