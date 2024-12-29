import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import NotificationContext from '../NotificationContext.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form } from 'react-bootstrap';

const CreateNewBlog = ({ blogService }) => {
  const [_, dispatchNotification] = useContext(NotificationContext)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  const createBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      setTitle('')
      setUrl('')
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: 'Blog added successfully',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: error?.response?.data?.error || 'Failed to add blog',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
  })

  const addBlog = async (event) => {
    event.preventDefault()
    createBlogMutation.mutate({ title, url })
  }

  return (
    <Form onSubmit={addBlog} role="form">
      <Form.Group>
        <Form.Label htmlFor="title">title</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="url">url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" role="submit">
        create
      </Button>
    </Form>
  )
}

export default CreateNewBlog
