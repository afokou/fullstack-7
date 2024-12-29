import NotificationContext from '../NotificationContext.jsx'
import { useContext } from 'react'
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (!notification) return null

  return <Alert variant="info">{notification}</Alert>
}

export default Notification
