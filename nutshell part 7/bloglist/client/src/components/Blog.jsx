import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogStore } from '../store'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const addComment = useBlogStore((state) => state.addComment)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const removeBlog = useBlogStore((state) => state.removeBlog)
  const user = useBlogStore((state) => state.user)
  const navigate = useNavigate()

  if (!blog) {
    return <p>page not found</p>
  }

  const addedBy = blog.user.name
  const ownBlog = user && blog.user.id === user.id

  const handleComment = async (event) => {
    event.preventDefault()
    await addComment(blog.id, comment)
    setComment('')
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog)
      navigate('/')
    }
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <p>added by {addedBy}</p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => likeBlog(blog)}>like</button>
      </p>
      {ownBlog && <button onClick={handleDelete}>remove</button>}
      <h3>comments</h3>
      <ul>
        {(blog.comments || []).map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

const BlogView = () => {
  const { id } = useParams()
  const blogs = useBlogStore((state) => state.blogs)
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs)

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  if (blogs.length === 0) {
    return null
  }

  return <Blog blog={blogs.find((item) => item.id === id) || null} />
}

export default BlogView
