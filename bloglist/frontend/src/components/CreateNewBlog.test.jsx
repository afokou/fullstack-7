import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNewBlog from './CreateNewBlog'

test('new blog form calls event handler with correct details', async () => {
  const blogCreatedHandler = vi.fn()
  const mockBlogService = {
    createBlog: vi.fn((newBlog) => newBlog),
  }
  render(<CreateNewBlog blogService={mockBlogService} blogCreated={blogCreatedHandler} />)

  const titleInput = screen.getByLabelText('title')
  const urlInput = screen.getByLabelText('url')
  const submit = screen.getByRole('submit')

  await userEvent.type(titleInput, 'React patterns')
  await userEvent.type(urlInput, 'https://reactpatterns.com/')
  await userEvent.click(submit)

  await waitFor(() => {
    expect(blogCreatedHandler).toHaveBeenCalledTimes(1)
    expect(blogCreatedHandler).toHaveBeenCalledWith({
      title: 'React patterns',
      url: 'https://reactpatterns.com/',
    })
  })
})
