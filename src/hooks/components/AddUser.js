import React, { useState, useEffect, useReducer } from "react";
import { Button } from "reactstrap";
import FormReducer from "../useReducer";
const initialFormState = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  country: "India",
  password: "",
};
const AddUser = () => {
  const [formState, dispatch] = useReducer(FormReducer, initialFormState);
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    const Authentication = setTimeout(() => {
      setFormIsValid(
        formState.name.trim().length > 0 &&
          formState.email.includes("@") &&
          formState.phone.trim().length > 0 &&
          formState.age.trim().length > 0 &&
          formState.gender.trim().length > 0 &&
          formState.country.trim().length > 0 &&
          formState.password.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(Authentication);
    };
  }, [formState]);
  const onSubmitData = (e) => {
    e.preventDefault();
    // console.log(formState);
    fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-type": "application/json",
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
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div>
            <label>Phone : </label>
            <input
              autoComplete="phone"
              name="phone"
              type="number"
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div>
            <label>Age : </label>
            <input
              autoComplete="age"
              name="age"
              type="number"
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div
            name="gender"
            autoComplete="gender"
            onChange={(e) => handleTextChange(e)}
          >
            <label>Gender : </label>
            <input type="radio" name="gender" value="Male" />
            <label>Male</label>
            <input type="radio" name="gender" value="Female" />
            <label>Female</label>
          </div>

          <div
            name="country"
            autoComplete="country"
            onChange={(e) => handleTextChange(e)}
          >
            <label>Country: </label>
            <select id="country" name="country">
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

export default AddUser;
