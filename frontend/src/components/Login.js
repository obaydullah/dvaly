import { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";

export default function Login() {
  const navigate = useNavigate();
  let { search } = useLocation();
  let redirectURL = new URLSearchParams(search).get("redirect");
  let redirect = redirectURL ? redirectURL : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state3, dispatch3 } = useContext(Store);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/signin",
        {
          email,
          password,
        }
      );
      dispatch3({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      console.log(state3);
    } catch (err) {
      alert(err);
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
            <h1 className="text-center">Login Page</h1>
            <Form onSubmit={handleSubmit}>
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

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Signin
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
