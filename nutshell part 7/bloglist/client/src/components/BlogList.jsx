import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBlogStore } from '../store'

const BlogList = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const initializeBlogs = useBlogStore((state) => state.initializeBlogs)

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
