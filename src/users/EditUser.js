import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Memoize loadUser using useCallback
  const loadUser = useCallback(async () => {
    try {
      const result = await axios.get(`http://localhost:8081/user/${id}`);
      setUser(result.data);
    } catch (error) {
      setErrorMessage("Failed to load user data. Please try again.");
    }
  }, [id]);
   // Add 'id' as a dependency to avoid reloading unnecessarily

  useEffect(() => {
    loadUser(); // Load the user data when the component mounts
  }, [loadUser]); // Add 'loadUser' as a dependency

  const onSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !username || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
        await axios.put(`http://localhost:8081/user/${id}`, user); // Change this to match the correct port
        navigate("/"); // Navigate to home after successful update
      } catch (error) {
        setErrorMessage("Failed to update user. Please try again.");
      }
      
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
