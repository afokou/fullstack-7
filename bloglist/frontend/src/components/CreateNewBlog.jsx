import PropTypes from 'prop-types'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'

const CreateNewBlog = ({ blogService, blogCreated }) => {
  const dispatch = useDispatch()
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
      dispatch(setNotification('Blog added successfully', 5))
      blogCreated(response)
    } catch (exception) {
      dispatch(
        setNotification(exception?.response?.data?.error ?? 'Unknown error', 5),
      )
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
