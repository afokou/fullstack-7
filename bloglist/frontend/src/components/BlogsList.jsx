import { useEffect, useState } from 'react'
import blogService from '../services/blogs.js'
import Blog from './Blog.jsx'
import CreateNewBlog from './CreateNewBlog.jsx'
import Togglable from './Togglable.jsx'

const BlogsList = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      // Sort the blogs by likes first then set them to state
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
      }}>logout</button></div>
      <div>&nbsp;</div>
      <Togglable visible={createBlogVisible} setVisible={setCreateBlogVisible} buttonLabel="new blog">
        <CreateNewBlog blogService={blogService} blogCreated={() => {
          // Refresh blogs list after creation
          blogService.getAll().then(blogs => {
            // Sort the blogs by likes first then set them to state
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
            setCreateBlogVisible(false)
          })
        }} />
      </Togglable>
      <div>&nbsp;</div>
      <div className="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blogService={blogService} blog={blog} user={user} blogUpdated={() => {
          // Refresh blogs list after update
            blogService.getAll().then(blogs => {
            // Sort the blogs by likes first then set them to state
              blogs.sort((a, b) => b.likes - a.likes)
              setBlogs(blogs)
            })
          }} />
        )}
      </div>
    </div>
  )
}

export default BlogsList
