import PropTypes from 'prop-types'
import { useState } from 'react'

const CreateNewBlog = ({ blogService, blogCreated }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
      setSuccessMessage('Blog added successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogCreated(response)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog} role="form">
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
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
      <button type="submit" role="submit">create</button>
    </form>
  )
}

CreateNewBlog.propTypes = {
  blogCreated: PropTypes.func.isRequired,
}

export default CreateNewBlog
