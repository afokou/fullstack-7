import { useState } from 'react'
import blogService from '../services/blogs.js'
import Blog from './Blog.jsx'
import CreateNewBlog from './CreateNewBlog.jsx'
import Togglable from './Togglable.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const BlogsList = ({ user }) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const queryClient = useQueryClient()
  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  if (blogs.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h2>blogs</h2>
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
      <div>&nbsp;</div>
      <Togglable
        visible={createBlogVisible}
        setVisible={setCreateBlogVisible}
        buttonLabel="new blog"
      >
        <CreateNewBlog blogService={blogService} />
      </Togglable>
      <div>&nbsp;</div>
      <div className="blogs">
        {blogs.data.map((blog) => (
          <Blog
            key={blog.id}
            blogService={blogService}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogsList
