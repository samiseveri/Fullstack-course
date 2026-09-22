import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import BlogView from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <Router>
      <Menu />
      <Notification />
      <ErrorBoundary>
        <div className="content">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="*" element={<p>page not found</p>} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  )
}

export default App
