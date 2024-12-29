import Nav from 'react-bootstrap/Nav'
import UserContext from '../UserContext.jsx'
import { useContext } from 'react'
import { Button, Navbar } from 'react-bootstrap'

const Menu = () => {
  const [user] = useContext(UserContext)

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Nav.Link href="/">Blogs</Nav.Link>
      <Nav.Link href="/users">Users</Nav.Link>
      <div>
        {user.name} logged in{' '}
        <Button
          variant="info"
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            window.location.reload()
          }}
        >
          logout
        </Button>
      </div>
    </Navbar>
  )
}

export default Menu
