import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container fluid className="navBar">
        <Row>
          <Col>
            <img
              className="img-fluid logo-image"
              src="/logo.png"
              alt="Mind Palace Logo"
            ></img>
          </Col>
          {/* <Col sm={1}>
            <Button id="sampleB" onClick={() => navigate("/sample")}>
              Try Sample Dashboard
            </Button>
          </Col> */}
        </Row>
      </Container>
      <section className="container main-home">
        <h1>Mind Palace: A New Way to Focus</h1>
        <p>
          Do you struggle to focus or get your tasks started? <br></br>
          Wish there was a way to concentrate and keep track of things all in
          one place?
        </p>
        <section>
          <h2>An ideal study space - curated by you</h2>
          <p>
            Mind Palace is tailored to your needs, with a customizable
            background video, timer lengths, to do list, and inspirational
            quotes.
          </p>
          <p>
            While Mind Palace is currently under development, you can preview it
            with the sample dashboard. Stay tuned here for when we launch and
            sign ups open!
          </p>
          <Button className="sample-button" onClick={() => navigate("/sample")}>
            Try Sample Dashboard
          </Button>
        </section>
        <section>
          <iframe
            src="/after.mov"
            width="800"
            height="480"
            allow="autoplay"
          ></iframe>
        </section>
      </section>
      <footer>
        By <a href="https://neidacreates.com">NeidaCreates</a>
      </footer>
    </>
  );
};

export default HomePage;
