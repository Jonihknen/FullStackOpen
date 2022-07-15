import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleBlogForm = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleBlogForm={handleBlogForm} />)

  const titleInput = screen.getByPlaceholderText('titleinput')
  const authorInput = screen.getByPlaceholderText('authorinput')
  const urlInput = screen.getByPlaceholderText('urlinput')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'hehehe')
  await user.type(urlInput, 'test.com')
  await user.click(sendButton)

  expect(handleBlogForm.mock.calls).toHaveLength(1)
  expect(handleBlogForm.mock.calls[0][0].content).toBe('testing a form...')
})