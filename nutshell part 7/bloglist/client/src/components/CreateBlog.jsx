import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogStore } from '../store'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const createBlog = useBlogStore((state) => state.createBlog)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createBlog({ title, author, url })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        author
        <input value={author} onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div>
        url
        <input value={url} onChange={(event) => setUrl(event.target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog
