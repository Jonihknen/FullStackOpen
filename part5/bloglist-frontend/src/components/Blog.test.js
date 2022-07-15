import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'hehhehe',
    author: 'joniauthori',
    url: 'testiurl.com',
    likes: 5
  }
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
            togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders title and author', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText('hehhehe')
    expect(element).toBeDefined()
    const element2 = screen.getByText('joniauthori')
    expect(element2).toBeDefined()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('renders everything when button is pressed', async () => {
    const component = render(
      <Blog blog={blog}/>
    )

    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    expect(component.container).toHaveTextContent('testiurl.com')
    expect(component.container).toHaveTextContent('5')


  })
  test('if the like button is clicked twice, the event handler is called twice', () => {
    const blog = {
      title: 'hehhehe',
      author: 'joniauthori',
      url: 'testiurl.com',
      likes: 5
    }
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} onClick={mockHandler}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByRole('button', { name: 'like' })
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})