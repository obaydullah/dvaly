import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { state2, dispatch2 } = useContext(Store);

  const {
    wishlist: { wishlistItems },
  } = state2;

  let updateCart = (item, quantity) => {
    dispatch2({
      type: "WISHLIST_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  let handleDelete = (item) => {
    dispatch2({
      type: "WISHLIST_REMOVE_ITEM",
      payload: item,
    });
  };

  return (
    <>
      <Helmet>
        <title>shopping cart</title>
      </Helmet>
      <Container>
        <Row className="mt-5">
          <Col lg={8}>
            {wishlistItems.length < 0 ? (
              <Alert variant="danger">Cart is empty</Alert>
            ) : (
              <ListGroup>
                {wishlistItems.map((item) => (
                  <ListGroup.Item>
                    <Row>
                      <Col lg={4}>
                        <img
                          src={item.img}
                          style={{ height: "80px", width: "100px" }}
                        />
                        <Link to={`/product/${item.name}`}>{item.name}</Link>
                      </Col>
                      <Col lg={3}>Price {item.price} $</Col>
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
        </Row>
      </Container>
    </>
  );
}
