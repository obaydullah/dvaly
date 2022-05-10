import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  let updateCart = (item, quantity) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  let handleDelete = (item) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const handleCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <>
      <Helmet>
        <title>shopping cart</title>
      </Helmet>
      <Container>
        <Row className="mt-5">
          <Col lg={8}>
            {cartItems.length < 0 ? (
              <Alert variant="danger">Cart is empty</Alert>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item>
                    <Row>
                      <Col lg={4}>
                        <img
                          src={item.img}
                          style={{ height: "80px", width: "100px" }}
                        />
                        <Link to={`/product/${item.name}`}>{item.name}</Link>
                      </Col>
                      <Col lg={3}>
                        <Button
                          onClick={() => updateCart(item, item.quantity + 1)}
                          variant="primary"
                          disabled={item.quantity == item.inStock}
                        >
                          +
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          onClick={() => updateCart(item, item.quantity - 1)}
                          variant="primary"
                          disabled={item.quantity === 1}
                        >
                          -
                        </Button>
                      </Col>
                      <Col lg={3}>
                        <Button
                          onClick={() => handleDelete(item)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col lg={4}>
            <h1>
              Total (
              {cartItems.reduce(
                (initValue, currentValue) => initValue + currentValue.quantity,
                0
              )}
              ) Products
            </h1>
            <h3>
              Price $
              {cartItems.reduce(
                (initValue, currentValue) =>
                  currentValue.price * currentValue.quantity,
                0
              )}
            </h3>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
