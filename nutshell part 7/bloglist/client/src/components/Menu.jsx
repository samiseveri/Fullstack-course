import { Link } from 'react-router-dom'
import { useBlogStore } from '../store'

const Menu = () => {
  const user = useBlogStore((state) => state.user)
  const logout = useBlogStore((state) => state.logout)

  return (
    <div className="nav">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user
        ? (
          <>
            <Link to="/create">new blog</Link>
            <span>{user.name} logged in</span>
            <button onClick={logout}>logout</button>
          </>
        )
        : <Link to="/login">login</Link>}
    </div>
  )
}

export default Menu
