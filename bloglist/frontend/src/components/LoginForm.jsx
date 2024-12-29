import { useContext, useState } from 'react'
import loginService from '../services/login.js'
import UserContext from '../UserContext.jsx'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const [_, dispatchUser] = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatchUser({ type: 'SET_USER', payload: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
