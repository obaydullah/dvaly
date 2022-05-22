import React, { useReducer, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import Rating from "./Rating";
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

export default function ProductDetails() {
  let [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: false,
    products: {},
    error: "",
  });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const product = await axios.get(
          `http://localhost:8000/products/${params.slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: product.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAILS", payload: err.message });
      }
    }
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const product = await axios.get("http://localhost:8000/products");
        setRelatedProduct(product.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const handleAddToCart = async () => {
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
    navigate("/cartpage");
  };

  return (
    <>
      <Container>
        <Helmet>
          <title>{products.name}</title>
        </Helmet>
        {products ? (
          <Row>
            <Col lg="5">
              <InnerImageZoom src={products.img} zoomSrc={products.img} />
            </Col>
            <Col lg="4">
              <Card style={{ width: "18rem" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>{products.name}</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={products.rating}
                      numberOfRating={products.numberOfRating}
                    />
                  </ListGroup.Item>
                  {products.inStock > 0 ? (
                    <ListGroup.Item>
                      Stock<Badge bg="success"> {products.inStock}</Badge>
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item>
                      Stock <Badge bg="danger">{products.inStock}</Badge>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>{products.price}</ListGroup.Item>
                  <ListGroup.Item>{products.description}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col lg="3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{products.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>{products.price}</h4>
                </ListGroup.Item>
                <Button variant="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </ListGroup>
            </Col>
          </Row>
        ) : (
          <Alert variant="danger">Product Painai</Alert>
        )}
        <Row>
          <h2>Related Products</h2>
          {relatedProduct.map((item) =>
            item.category == products.category &&
            item.name !== products.name ? (
              <h1>{item.name}</h1>
            ) : (
              ""
            )
          )}
        </Row>
      </Container>
    </>
  );
}
