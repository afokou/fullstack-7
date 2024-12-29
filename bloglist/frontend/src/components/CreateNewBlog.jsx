import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import NotificationContext from '../NotificationContext.jsx'

const CreateNewBlog = ({ blogService, blogCreated }) => {
  const [_, dispatchNotification] = useContext(NotificationContext)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.createBlog({
        title: title,
        url: url,
      })
      setTitle('')
      setUrl('')
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: 'Blog added successfully',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      blogCreated(response)
    } catch (exception) {
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: exception?.response?.data?.error ?? 'Unknown error',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog} role="form">
      <div>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" role="submit">
        create
      </button>
    </form>
  )
}

CreateNewBlog.propTypes = {
  blogCreated: PropTypes.func.isRequired,
}

export default CreateNewBlog
