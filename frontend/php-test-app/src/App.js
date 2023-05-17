import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios.get("http://localhost:8000/api/users/")
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.log("Error retrieving all users:", error)
    })
  }

  useEffect(() => {
    getUsers();
  }, [])

  console.log("users", users);

  return (
    <div className="App">
      <h1>php test app</h1>
      <h2>Users:</h2>
      <ul>
        {users[0] && users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
