import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Container fluid className="navBar">
        <Row>
          <Col>Mind Palace App</Col>
          <Col md="auto">
            <Button variant="light" onClick={() => navigate("/sample")}>
              Explore
            </Button>
          </Col>
          <Col sm={2}>
            <Button variant="light" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
