/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ( { user, msgText, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
      user: user._id
    }
    const response = await blogService.create(blog)
    msgText(`a new blog ${response.title} by ${response.author} added`)
    setTitle('')
    setAuthor('')
    setUrl('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleCreate}>
      <h1>create new blog</h1>
      <div>
      title <input type="text" value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
      author <input type="text" value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url <input type="text" value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog