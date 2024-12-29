import { useEffect, useReducer } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogsList from './components/BlogsList.jsx'
import blogService from './services/blogs.js'
import Notification from './components/Notification.jsx'
import NotificationContext, {
  notificationReducer,
} from './NotificationContext.jsx'
import UserContext, { userReducer } from './UserContext.jsx'

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
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      <UserContext.Provider value={[user, dispatchUser]}>
        <Notification />
        <BlogsList user={user} />
      </UserContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App
