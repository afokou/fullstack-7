import PropTypes from 'prop-types'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user, blogService }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [expanded, setExpanded] = useState(false)
  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div className="title">
        {blog.title}{' '}
        <button className="viewBtn" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded && (
        <div>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}{' '}
            <button className="likeBtn" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.author.name}</div>
          {user.username === blog.author.username && (
            <div>
              <button
                className="deleteBtn"
                onClick={async () => {
                  if (
                    window.confirm(
                      `Remove blog ${blog.title} by ${blog.author.name}`,
                    )
                  ) {
                    deleteBlogMutation.mutate(blog.id)
                  }
                }}
              >
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
