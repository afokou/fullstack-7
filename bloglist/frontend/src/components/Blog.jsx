import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs.js'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext.jsx'

const Blog = () => {
  const id = useParams().id
  const [user] = useContext(UserContext)
  const queryClient = useQueryClient()
  const blogResponse = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const allBlogs = await blogService.getAll()
      return allBlogs.find((blog) => blog.id === id)
    },
  })
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

  if (blogResponse.isLoading) {
    return <div>loading data...</div>
  }

  if (blogResponse.isError) {
    return <div>error fetching data</div>
  }

  const blog = blogResponse.data

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(updatedBlog)
  }

  return (
    <div>
      <h2 className="title">{blog.title} </h2>
      <div>
        <div className="url">{blog.url}</div>
        <div className="likes">
          likes {blog.likes}{' '}
          <button className="likeBtn" onClick={handleLike}>
            like
          </button>
        </div>
        <div>added by {blog.author.name}</div>
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
    </div>
  )
}

export default Blog
