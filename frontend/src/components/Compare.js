import React, { useReducer, useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Card, Button } from "react-bootstrap";
import axios from "axios";

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
export default function Compare() {
  const [singlePro, setSinglePro] = useState("");
  const [singlePro2, setSinglePro2] = useState("");
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

  let handleCompare = async (params) => {
    let singleProduct = await axios.get(
      `http://localhost:8000/products/${params}`
    );
    setSinglePro(singleProduct.data);
  };
  let handleCompare2 = async (params) => {
    let singleProduct = await axios.get(
      `http://localhost:8000/products/${params}`
    );
    setSinglePro2(singleProduct.data);
  };

  console.log(singlePro);
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col lg={6}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {products.map((item) => (
                  <>
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={() => handleCompare(item.name)}
                    >
                      <img src={item.img} alt="" className="cimage" />
                      {item.name}
                    </Dropdown.Item>
                  </>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Card style={{ width: "18rem" }} className="mt-4">
              {singlePro ? (
                <>
                  <Card.Img variant="top" src={singlePro.img} />
                  <Card.Body>
                    <Card.Title>{singlePro.name}</Card.Title>
                    <Card.Title>{singlePro.price}</Card.Title>
                    <Card.Text>{singlePro.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </>
              ) : (
                "Nothing found"
              )}
            </Card>
          </Col>
          <Col lg={6}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {products.map((item) => (
                  <>
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={() => handleCompare2(item.name)}
                    >
                      <img src={item.img} alt="" className="cimage" />
                      {item.name}
                    </Dropdown.Item>
                  </>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Card style={{ width: "18rem" }} className="mt-4">
              {singlePro2 ? (
                <>
                  <Card.Img variant="top" src={singlePro2.img} />
                  <Card.Body>
                    <Card.Title>{singlePro2.name}</Card.Title>
                    <Card.Text>{singlePro2.price}</Card.Text>
                    <Card.Text>{singlePro2.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </>
              ) : (
                "Nothing found"
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
