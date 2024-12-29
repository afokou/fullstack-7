import { useEffect, useReducer } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogsList from './components/BlogsList.jsx'
import blogService from './services/blogs.js'
import Notification from './components/Notification.jsx'
import NotificationContext, {
  notificationReducer,
} from './NotificationContext.jsx'
import UserContext, { userReducer } from './UserContext.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users.jsx'
import User from './components/User.jsx';
import Blog from './components/Blog.jsx';

const App = () => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null,
  )
  const [user, dispatchUser] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: 'SET_USER', payload: user })
    }
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }
    blogService.setToken(user.token)
  }, [user])

  if (!user) {
    return (
      <UserContext.Provider value={[user, dispatchUser]}>
        <LoginForm />
      </UserContext.Provider>
    )
  }

  return (
    <Router>
      <NotificationContext.Provider
        value={[notification, dispatchNotification]}
      >
        <UserContext.Provider value={[user, dispatchUser]}>
          <Notification />
          <h2>blogs</h2>
          <div>
            {user.name} logged in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                window.location.reload()
              }}
            >
              logout
            </button>
          </div>
          <div>&nbsp;</div>
          <Routes>
            <Route path="/" element={<BlogsList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </UserContext.Provider>
      </NotificationContext.Provider>
    </Router>
  )
}

export default App
