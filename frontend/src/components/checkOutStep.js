import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function checkOutStep(props) {
  return (
    <Container className="step mt-5">
      <Row>
        <Col>
          <h3 className={props.step1 ? "stepactive" : ""}>Sign In</h3>{" "}
        </Col>
        <Col>
          <h3 className={props.step2 ? "stepactive" : ""}>Shipping Address</h3>
        </Col>
        <Col>
          <h3 className={props.step3 ? "stepactive" : ""}>payment</h3>{" "}
        </Col>
        <Col>
          <h3 className={props.step4 ? "stepactive" : ""}>place order</h3>{" "}
        </Col>
      </Row>
    </Container>
  );
}
