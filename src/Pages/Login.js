import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Forms.css";

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
        navigate("/workspaces", { state: [response.data] });
      })
      .catch((error) => console.error(error));
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const emailAddress = event.target.elements.email.value;
    const password = event.target.password.value;
    getUser(emailAddress, password);
  };

  return (
    <>
      <Container fluid className="navBar">
        <Row>
          <Col>
            <img className="img-fluid logo-image" src="/logo.png"></img>
          </Col>
          <Col sm={2}>
            <Button id="signupB" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Col>
          <Col sm={1}>
            <Button id="loginB" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="container form-holder">
        <h1>Login</h1>
        <form className="container userForm" onSubmit={onLoginSubmit}>
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
          </div>
          <Button type="submit" className="formBtn">
            Login
          </Button>
          <div>
            <span>
              Don't have an account? <Link to="/signup">Sign up here.</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
