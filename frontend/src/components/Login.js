import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Login() {
  let { search } = useLocation();
  let redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "/";
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <h1 className="text-center">Login Page</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Type your password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <br />
              <Form.Text>
                Don't have an account?
                <Link to={`/signup?redirect=${redirect}`}>create account</Link>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
