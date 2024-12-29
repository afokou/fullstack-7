import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const Users = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await userService.getAll()
      allUsers.sort((a, b) => b.blogs.length - a.blogs.length)
      return allUsers
    },
  })

  if (users.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
