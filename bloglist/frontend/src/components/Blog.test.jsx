import { test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title but not url or likes by default', async () => {
  const user = {
    username: 'tester'
  }

  const blog = {
    'title': 'React patterns',
    'url': 'https://reactpatterns.com/',
    'likes': 16,
    'author': {
      'username': 'michaelchan',
      'name': 'Michael Chan',
      'id': '676dc7dbf003d2c4658c91d9'
    },
    'id': '5a422a851b54a676234d17f7'
  }

  const blogUpdatedHandler = vi.fn()
  render(<Blog blog={blog} blogUpdated={blogUpdatedHandler} user={user} />)

  const element = screen.getByText('React patterns')
  expect(element).toBeDefined()

  // Ensure url and likes are not rendered
  expect(screen.queryByText('https://reactpatterns.com/')).toBeNull()
  expect(screen.queryByText('likes 16')).toBeNull()
})

test('renders url and likes after view button clicked', async () => {
  const user = {
    username: 'tester'
  }

  const blog = {
    'title': 'React patterns',
    'url': 'https://reactpatterns.com/',
    'likes': 16,
    'author': {
      'username': 'michaelchan',
      'name': 'Michael Chan',
      'id': '676dc7dbf003d2c4658c91d9'
    },
    'id': '5a422a851b54a676234d17f7'
  }

  const blogUpdatedHandler = vi.fn()
  render(<Blog blog={blog} blogUpdated={blogUpdatedHandler} user={user} />)

  const userSession = userEvent.setup()
  const button = screen.getByText('view')
  await userSession.click(button)

  // Ensure url and likes are rendered
  await waitFor(() => screen.getByText('https://reactpatterns.com/'))
  expect(screen.getByText('https://reactpatterns.com/')).toBeDefined()
  expect(screen.getByText('likes 16')).toBeDefined()
})

test('like button clicked twice calls event handler twice', async () => {
  const user = {
    username: 'tester'
  }

  const blog = {
    'title': 'React patterns',
    'url': 'https://reactpatterns.com/',
    'likes': 16,
    'author': {
      'username': 'michaelchan',
      'name': 'Michael Chan',
      'id': '676dc7dbf003d2c4658c91d9'
    },
    'id': '5a422a851b54a676234d17f7'
  }

  const blogUpdatedHandler = vi.fn()
  const mockBlogService = {
    updateBlog: vi.fn()
  }

  render(<Blog blog={blog} blogService={mockBlogService} blogUpdated={blogUpdatedHandler} user={user} />)

  const userSession = userEvent.setup()
  const button = screen.getByText('view')
  await userSession.click(button)
  await waitFor(() => screen.getByText('https://reactpatterns.com/'))

  const likeButton = screen.getByText('like')
  await userSession.click(likeButton)
  expect(mockBlogService.updateBlog.mock.calls).toHaveLength(1)

  await userSession.click(likeButton)
  expect(mockBlogService.updateBlog.mock.calls).toHaveLength(2)
})
