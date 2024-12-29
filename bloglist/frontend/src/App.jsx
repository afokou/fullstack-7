import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogsList from './components/BlogsList.jsx'
import blogService from './services/blogs.js'

const App = () => {
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

  return <BlogsList user={user} />
}

export default App
