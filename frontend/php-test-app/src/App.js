import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [updatedUser, setUpdatedUser] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [toggle, setToggle] = useState(null);

  const getUsers = () => {
    axios
      .get("http://localhost:8000/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error retrieving all users:", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const saveUser = () => {
    const userObj = {
      name: newUser,
      email: newEmail,
      password,
    };

    axios
      .post("http://localhost:8000/api/users/", userObj)
      .then((response) => {
        console.log("Added new user!");
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });

    setNewEmail("");
    setNewUser("");
    setPassword("");
  };

  const getUserDetails = (id) => {
    console.log("id to get", id);
    axios
      .get(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        console.log("Successful get request for user details!");
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.log("error in userDetails request", error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then((response) => {
        console.log("Successfully deleted user!");
        getUsers();
      })
      .catch((error) => {
        console.log("error in delete request", error);
      });
  };

  const updateUser = (id) => {
    const updatedUserObj = {
      name: updatedUser,
      email: updatedEmail,
    };

    console.log(updatedUserObj)

    axios
      .put(`http://localhost:8000/api/users/${id}`, updatedUserObj)
      .then((response) => {
        console.log("Successfully updated user!");
        getUsers();
      })
      .catch((error) => {
        console.log("error in put request", error);
      });

      setUpdatedEmail("");
      setUpdatedUser("");
      setToggle(null);
  };

  return (
    <div className="App">
      <h1>php test app</h1>
      <div>
        <h1>Add New User:</h1>
        <input
          type="text"
          placeholder="name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={saveUser}>save user</button>
      </div>
      <h1>Users:</h1>
      <ul>
        {users[0] &&
          users.map((user) => (
            <div key={user.id}>
              <li>{user.name}</li>
              <div>
                <button onClick={() => getUserDetails(user.id)}>Details</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => setToggle(user.id)}>Edit</button>
              </div>
              {toggle === user.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="name"
                    value={updatedUser}
                    onChange={(e) => setUpdatedUser(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="email"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                  <button onClick={() => updateUser(user.id)}>save changes</button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}

        <h1>User Details:</h1>
        {userDetails && (
          <div>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default App;
