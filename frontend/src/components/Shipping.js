import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Store } from "../Store";
import CheckOutStep from "./checkOutStep";

export default function Shipping() {
  const { state4, dispatch4, state3 } = useContext(Store);

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch4({
      type: "SHIPPING_ADDRESS",
      payload: { fullName, address, city, postCode, country },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postCode, country })
    );
    console.log(state4.shippingAddress);
    navigate("/payment");
  };

  useEffect(() => {
    if (!state3.userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>shipping</title>
      </Helmet>
      <CheckOutStep step1="true" step2={true} />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Postal Code </Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal Code"
              onChange={(e) => setPostCode(e.target.value)}
              value={postCode}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Country </Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </Form.Group>

          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
