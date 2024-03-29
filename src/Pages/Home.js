import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container fluid className="navBar">
        <Row>
          <Col>
            <img className="img-fluid logo-image" src="/logo.png"></img>
          </Col>
          {/* <Col sm={1}>
            <Button id="sampleB" onClick={() => navigate("/sample")}>
              Try It!
            </Button>
          </Col> */}
          <Col sm={1}>
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
      <section className="container main-home">
        <h1>Mind Palace: A New Way to Focus</h1>
        <ul>
          <li>Do you struggle to focus or get your tasks started?</li>
          <li>
            Wish there was a way to concentrate and keep track of things all in
            one place?
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
