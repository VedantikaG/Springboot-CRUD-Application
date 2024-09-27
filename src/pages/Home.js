import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8081/users');
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/user/${id}`); // Use backticks here
      loadUsers(); // Reload the user list after deleting
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>

                <Link className="btn btn-outline-primary mx-2" to={`/viewuser/${user.id}`}>
                          View
                      </Link>

                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
