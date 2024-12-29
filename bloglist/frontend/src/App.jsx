import { useEffect, useReducer, useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogsList from './components/BlogsList.jsx'
import blogService from './services/blogs.js'
import Notification from './components/Notification.jsx'
import NotificationContext, {
  notificationReducer,
} from './NotificationContext.jsx'
import { useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null,
  )
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }
    blogService.setToken(user.token)
  }, [user])

  if (!user) {
    return <LoginForm setUser={setUser} />
  }

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      <Notification />
      <BlogsList user={user} />
    </NotificationContext.Provider>
  )
}

export default App
