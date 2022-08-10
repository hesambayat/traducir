import { render } from '@testing-library/react'
import Splash from './Splash'

describe('renders home page feature / splash', () => {
  const { asFragment } = render(<Splash />)
  const dom = asFragment()
  test('should match the snapshot', () => {
    expect(dom).toMatchSnapshot()
  })
})
