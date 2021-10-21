import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

const UserLists = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((result) => {
        setUsersList(result);
      });
  };

  // console.log(usersList);
  const updateUser = (id) => {
    window.location = "/update/" + id;
  };

  const userDelete = (id) => {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
      })
      .then(() => {
        window.location.href = "/";
      });
  };

  return (
    <div>
      <Link to="/create" className="btn btn-success">
        Add User
      </Link>
      <Table striped>
        <thead border="3">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody border="3">
          {usersList.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.country}</td>
              <td style={{ display: "inline-flex" }}>
                <Button
                  className="btn btn-success"
                  onClick={() => updateUser(user.id)}
                >
                  Edit
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    userDelete(user.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserLists;
