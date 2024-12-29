import { useContext, useState } from 'react'
import blogService from '../services/blogs.js'
import CreateNewBlog from './CreateNewBlog.jsx'
import Togglable from './Togglable.jsx'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../UserContext.jsx'
import { Link } from 'react-router-dom'

const BlogsList = () => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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
        {blogs.data &&
          blogs.data.map &&
          blogs.data.map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <div className="title">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BlogsList
