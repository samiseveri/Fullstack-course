import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import { useBlogStore } from '../store'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useBlogStore((state) => state.setUser)
  const setNotification = useBlogStore((state) => state.setNotification)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const user = await loginService.login({ username, password })
    if (!user.token) {
      setNotification('wrong username or password')
      return
    }
    setUser(user)
    setNotification(`welcome ${user.name}`)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
