import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await userService.getAll()
      return allUsers.find((user) => user.id === id)
    },
  })

  if (user.isLoading) {
    return <div>loading data...</div>
  }

  if (user.isError) {
    return <div>error fetching data</div>
  }

  return (
    <div>
      <h2>{user.data.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.data.blogs &&
          user.data.blogs.map &&
          user.data.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default User
