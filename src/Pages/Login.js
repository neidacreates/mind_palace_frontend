// TODO: handle errors when user isn't found (display popup or something?)
// TODO: where to save the user id? state? browser storage?
// TODO: get the page to move to /workspaces when the login is successful

import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const getUser = async (emailAddress, password) => {
    await wait(1000);
    return axios
      .post(`${apiAddress}/login`, {
        email: emailAddress,
        password: password,
      })
      .then((response) => {
        const current_user = response.data;
        console.log(current_user);
        navigate("/workspaces", { state: { user_id: current_user } });
      })
      .catch((error) => <section>{error.response.data.message}</section>);
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const emailAddress = event.target.elements.email.value;
    const password = event.target.password.value;
    getUser(emailAddress, password);
  };

  return (
    <form className="container" onSubmit={onLoginSubmit}>
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
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
