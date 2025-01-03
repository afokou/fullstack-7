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
import User from './components/User.jsx'
import Blog from './components/Blog.jsx'
import Menu from './components/Menu.jsx'

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
      <div className="container">
        <UserContext.Provider value={[user, dispatchUser]}>
          <LoginForm />
        </UserContext.Provider>
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <NotificationContext.Provider
          value={[notification, dispatchNotification]}
        >
          <UserContext.Provider value={[user, dispatchUser]}>
            <Menu />
            <Notification />
            <h2>blogs</h2>
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
    </div>
  )
}

export default App
