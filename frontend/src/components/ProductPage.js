import React, { useReducer, useEffect, useContext, useState } from "react";
import "../app.css";

import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
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

  const [lgShow, setLgShow] = useState(false);
  const [details, setDetails] = useState({});

  const handleDetails = async (e, pro) => {
    e.preventDefault();
    setLgShow(true);
    const { data } = await axios.get(`http://localhost:8000/products/${pro}`);
    setDetails(data);
  };

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

  const { state, dispatch: ctxDispatch, state2, dispatch2 } = useContext(Store);
  const { cart } = state;
  const {
    wishlist: { wishlistItems },
  } = state2;

  const handleAddToCart = async (products) => {
    const existingItem = cart.cartItems.find(
      (item) => item._id === products._id
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(
      `http://localhost:8000/products/${products.name}`
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

  const handleAddToWishlist = async (products) => {
    dispatch2({
      type: "WISHLIST_ADD_ITEM",
      payload: { ...products },
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
                  {item.inStock == 0 ? (
                    <>
                      <Button variant="danger">Out of Stock</Button>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToWishlist(item)}
                        className="mt-2"
                      >
                        Wishlist
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={(e) => handleDetails(e, item.name)}
                        className="ms-2"
                      >
                        Details
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToWishlist(item)}
                        className="mt-2"
                      >
                        Wishlist
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {/* Modal Start */}>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Row>
            <Modal.Title
              id="example-modal-sizes-title-lg"
              className="mb-3 text-center"
            >
              {details.name}
            </Modal.Title>
            <Col lg={6}>
              <img
                src={details.img}
                alt={details.name}
                style={{ width: "100%", maxHeight: "400px" }}
              />
            </Col>
            <Col lg={6}>
              <h4>$ {details.price}</h4>
              <p>{details.description}</p>
              <Button
                variant="primary"
                onClick={() => handleAddToCart(details)}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Modal.Header>
      </Modal>
    </Container>
  );
}
