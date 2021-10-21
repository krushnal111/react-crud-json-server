import React, { useState, useEffect, useReducer } from "react";
import FormReducer from "../useReducer";
import axios from "axios";
import { Button } from "reactstrap";
import { useParams } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  country: "India",
  password: "",
};

const UpdateUser = () => {
  const [formState, dispatch] = useReducer(FormReducer, initialFormState);
  const [userData, setUserData] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    const Authentication = setTimeout(() => {
      setFormIsValid(
        formState.name.trim().length > 0
        //   formState.email.includes("@") &&
        //   formState.phone.trim().length > 0 &&
        //   formState.age.trim().length > 0 &&
        //   formState.gender.trim().length > 0 &&
        //   formState.country.trim().length > 0 &&
        //   formState.password.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(Authentication);
    };
  }, [formState]);

  const onSubmitData = (event) => {
    event.preventDefault();

    fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
      })
      .then(() => {
        window.location.href = "/";
      });
    document.form.reset();
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/users/${id}`);

    setUserData(result.data);
  };
  const handleTextChange = (e) => {
    dispatch({
      type: "Handle Input Text",
      field: e.target.name,
      payload: e.target.value,
    });
  };
  return (
    <div className="center">
      <h2>Add User</h2>
      <form name="form" onSubmit={onSubmitData}>
        <div>
          <div>
            <label>Name : </label>
            <input
              autoComplete="name"
              name="name"
              type="text"
              // value={userData.name}
              onChange={(e) => handleTextChange(e)}
              autoFocus
            />
          </div>
          <div>
            <label>Email : </label>
            <input
              autoComplete="email"
              name="email"
              type="email"
              //value={userData.email}
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div>
            <label>Phone : </label>
            <input
              autoComplete="phone"
              name="phone"
              type="number"
              //value={userData.phone}
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div>
            <label>Age : </label>
            <input
              autoComplete="age"
              name="age"
              type="number"
              //value={userData.age}
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div
            name="gender"
            autoComplete="gender"
            onChange={(e) => handleTextChange(e)}
          >
            <label>Gender : </label>
            <input
              type="radio"
              //checked={userData.gender === "Male"}
              name="gender"
              value="Male"
            />
            <label>Male</label>
            <input
              type="radio"
              //checked={userData.gender === "Female"}
              name="gender"
              value="Female"
            />
            <label>Female</label>
          </div>

          <div
            name="country"
            autoComplete="country"
            onChange={(e) => handleTextChange(e)}
          >
            <label>Country: </label>
            <select
              id="country" //value={userData.country}
              name="country"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="London">London</option>
            </select>
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              autoComplete="password"
              type="password"
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <Button type="submit" disabled={!formIsValid}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
