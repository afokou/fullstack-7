import { Link } from 'react-router-dom'
import UserContext from '../UserContext.jsx'
import { useContext } from 'react'

const Menu = () => {
  const [user] = useContext(UserContext)

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
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
    </div>
  )
}

export default Menu
