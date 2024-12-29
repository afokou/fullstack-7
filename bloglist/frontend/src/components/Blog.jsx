import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, user, blogService, blogUpdated }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [expanded, setExpanded] = useState(false)

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(blog.id, updatedBlog)
    blogUpdated()
  }

  return (
    <div style={blogStyle}>
      <div className="title">
        {blog.title} <button className="viewBtn" onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
      </div>
      {expanded && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes} <button className="likeBtn" onClick={handleLike}>like</button>
          </div>
          <div>{blog.author.name}</div>
          {user.username === blog.author.username && (
            <div><button className="deleteBtn" onClick={async () => {
              if (window.confirm(`Remove blog ${blog.title} by ${blog.author.name}`)) {
                await blogService.deleteBlog(blog.id)
                blogUpdated()
              }
            }}>remove</button></div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogUpdated: PropTypes.func.isRequired
}

export default Blog
