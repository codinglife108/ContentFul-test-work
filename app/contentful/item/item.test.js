import '@testing-library/jest-dom'
import { render, screen } from '../../../__test-utils__/test-utils'
import PageItem from './item'

const data = {
  title: "Title",
  fileName: "File Name"
}

describe('Page component:', () => {
  test('Page header rendered successfully', () => {
    render(<PageItem item={data} />)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
