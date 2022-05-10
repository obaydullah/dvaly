import React, { useReducer, useEffect, useContext } from "react";
import "../app.css";

import { Spinner, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAILS":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function ProductPage() {
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: false,
    products: [],
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const product = await axios.get("http://localhost:8000/products");
        dispatch({ type: "FETCH_SUCCESS", payload: product.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILS", payload: err.message });
      }
    }
    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const handleAddToCart = async (products) => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === products._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:8000/products/${products._id}`
    );

    if (data.inStock < quantity) {
      window.alert(`${products.name} is out of stock`);
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...products, quantity },
    });
  };

  const {
    cart: { cartItems },
  } = state;

  let updateCart = (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  let handleDelete = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  console.log(products);

  return (
    <Container>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <Row>
        {loading ? (
          <div className="spinner_grow">
            <Spinner animation="grow" />
          </div>
        ) : (
          products.map((item, index) => (
            <Col lg="3" key={index}>
              <Card style={{ width: "18rem", marginTop: "1rem" }}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ height: "350px" }}
                />
                <Card.Body>
                  <Link to={`/product/${item.name}`}>
                    <Card.Title>{item.name}</Card.Title>
                  </Link>

                  <Rating
                    rating={item.rating}
                    numberOfRating={item.numberOfRating}
                  />
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Title>{item.price}</Card.Title>
                  <Card.Title>Stock {item.inStock}</Card.Title>

                  {/* Increament and Decrement Button Start  */}
                  {cartItems.map((items) =>
                    items._id == item._id ? (
                      <>
                        <Button
                          onClick={() => updateCart(item, items.quantity + 1)}
                          variant="primary"
                          disabled={items.quantity == item.inStock}
                        >
                          +
                        </Button>
                        <span>{items.quantity}</span>
                        <Button
                          onClick={() => updateCart(item, items.quantity - 1)}
                          variant="primary"
                          disabled={items.quantity === 1}
                        >
                          -
                        </Button>
                        <Button
                          onClick={() => handleDelete(item)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      ""
                    )
                  )}
                  <br />
                  <br />
                  {/* Increament and Decrement Button End */}

                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
