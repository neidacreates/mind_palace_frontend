// TODO: handle errors when user isn't found (display popup or something?)
// TODO: where to save the user id? state? browser storage?
// TODO: get the page to move to /workspaces when the login is successful

import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Forms.css";

const Signup = () => {
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const createUser = async (emailAddress, username, password) => {
    await wait(1000);
    return axios
      .post(`${apiAddress}/signup`, {
        email: emailAddress,
        password: password,
        username: username,
      })
      .then((response) => {
        axios
          .post(`${apiAddress}/users/${response.data.id}/workspaces`, {
            name: "Sample",
            background_video: "2IdffsNov68",
            background_thumbnail:
              "https://i.ytimg.com/vi/2IdffsNov68/sddefault.jpg",
            user: response.data.id,
          })
          .then((response) =>
            axios
              .get(`${apiAddress}/users/${response.data.user}`)
              .then((response) =>
                navigate("/workspaces", { state: [response.data] })
              )
          );
      })
      .catch((error) => console.error(error));
  };

  const onSignupSubmit = (event) => {
    event.preventDefault();
    const emailAddress = event.target.elements.email.value;
    const password = event.target.password.value;
    const username = event.target.elements.username.value;
    createUser(emailAddress, username, password);
  };

  return (
    <form className="container userForm" onSubmit={onSignupSubmit}>
      <div className="mb-3">
        <label htmlFor="InputEmail1" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="InputEmail1"
          aria-describedby="emailHelp"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="InputUsername" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="username"
          className="form-control"
          id="InputUsername"
          aria-describedby="usernameHelpBlock"
        />
        <div id="usernameHelpBlock" className="form-text">
          Up to 10 characters long.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="InputPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="InputPassword"
          aria-describedby="passwordHelpBlock"
        />
        <div id="passwordHelpBlock" className="form-text">
          Up to 10 characters long.
        </div>
      </div>

      <Button className="formBtn" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
