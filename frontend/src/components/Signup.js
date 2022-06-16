import { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";

export default function Signup() {
  const navigate = useNavigate();
  let { search } = useLocation();
  let redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");

  const { state3, dispatch3 } = useContext(Store);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      navigate("/signin");
    } catch (err) {
      alert("Invalid Email and Password");
    }
  };

  useEffect(() => {
    if (state3.userInfo) {
      navigate(redirect);
    }
  }, []);
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <h1 className="text-center">Signup </h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Type your password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setcPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Signup
              </Button>
              <br />
              <Form.Text>
                Already have an account?
                <Link to={`/signin?redirect=${redirect}`}>Login</Link>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
