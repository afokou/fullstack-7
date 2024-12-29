import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';

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

  if (users.isError) {
    return <div>error fetching data</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <Table stripped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.data &&
            users.data.map &&
            users.data.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
