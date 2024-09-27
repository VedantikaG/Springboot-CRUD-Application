import React, { useEffect, useState } from 'react'; // Added useState here
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser(); // Corrected the function name to loadUser
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8081/user/${id}`); // Fixed string interpolation with backticks
      setUser(result.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h className="text-center m-4">User Details</h>

          <div className="card">
            <div className="card-header">
              Details of User id: {id} {/* Display the user ID */}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b> {user.name}
                </li>

                <li className="list-group-item">
                  <b>UserName: </b> {user.username}
                </li>

                <li className="list-group-item">
                  <b>Email: </b> {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
