import { render } from '@testing-library/react'
import Question from './Question'

describe('renders home page feature, question', () => {
  const { asFragment } = render(<Question answers={3} origin={'do'} transforming={false} />)
  const dom = asFragment()
  test('should match the snapshot', () => {
    expect(dom).toMatchSnapshot()
  })
})
