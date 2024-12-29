import { useContext, useState } from 'react'
import blogService from '../services/blogs.js'
import Blog from './Blog.jsx'
import CreateNewBlog from './CreateNewBlog.jsx'
import Togglable from './Togglable.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from '../UserContext.jsx'

const BlogsList = () => {
  const [user] = useContext(UserContext)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const allBlogs = await blogService.getAll()
      allBlogs.sort((a, b) => b.likes - a.likes)
      return allBlogs
    },
  })

  if (blogs.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
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
