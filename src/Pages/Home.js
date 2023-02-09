import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container fluid className="navBar">
        <Row>
          <Col>Mind Palace App</Col>
          <Col sm={1}>
            <Button onClick={() => navigate("/sample")}>Explore</Button>
          </Col>
          <Col sm={1}>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </Col>
          <Col sm={1}>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
