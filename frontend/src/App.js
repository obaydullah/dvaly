import { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
import "./app.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Store } from "./Store";
import CartPage from "./components/CartPage";
import Login from "./components/Login";
import WishlistPage from "./components/WishlistPage";
import Compare from "./components/Compare";
import Shipping from "./components/Shipping";

function App() {
  const { state, dispatch, state2, dispatch2, state3, dispatch3 } =
    useContext(Store);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    cart: { cartItems },
  } = state;

  const {
    wishlist: { wishlistItems },
  } = state2;

  const { userInfo } = state3;

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
  let handleDelete2 = (item) => {
    dispatch2({
      type: "WISHLIST_REMOVE_ITEM",
      payload: item,
    });
  };

  const handleLogout = () => {
    dispatch3({ type: "USER_LOGOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Dvaly</Navbar.Brand>
            <Nav className="ms-auto menu">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cartpage">Cart</Link>
              <Link to="/compare">Compare Product</Link>
              {state.cart.cartItems.length > 0 && (
                <Badge pill bg="danger" className="ms-1">
                  {state.cart.cartItems.length}
                </Badge>
              )}
              <NavDropdown title="Dropdown" id="nav-dropdown">
                {cartItems.map((item) => (
                  <>
                    <img src={item.img} style={{ width: "50px" }} />
                    <Link to={`/product/${item.name}`}>{item.name}</Link>
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
                    <Button onClick={() => handleDelete(item)} variant="danger">
                      Delete
                    </Button>
                  </>
                ))}
                <NavDropdown.Item eventKey="4.4">
                  <Link to="/cartpage">
                    <Button pill="bg" variant="primary">
                      Go to Cart Page
                    </Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>

              {/* Wishlist Start */}
              <NavDropdown title="Wishlist" id="nav-dropdown">
                {wishlistItems.map((item) => (
                  <>
                    <img src={item.img} style={{ width: "50px" }} />
                    <Link to={`/product/${item.name}`}>{item.name}</Link>

                    <Button
                      onClick={() => handleDelete2(item)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <br />
                  </>
                ))}
                <NavDropdown.Item eventKey="4.4">
                  <Link to="/wishlist">
                    <Button pill="bg" variant="primary">
                      Go to Wishlist
                    </Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              {state2.wishlist.wishlistItems.length > 0 && (
                <Badge pill bg="danger" className="ms-1">
                  {state2.wishlist.wishlistItems.length}
                </Badge>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.4">
                    Hello world
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4">
                    Hello world
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/signin">Sign in</Link>
              )}
              {/* WishList End  */}
            </Nav>
          </Container>
        </Navbar>

        <Button
          variant="primary"
          onClick={handleShow}
          className="offcanvas_btn"
        >
          Cart
        </Button>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartItems.map((item) => (
              <>
                <img src={item.img} style={{ width: "50px" }} />
                <Link to={`/product/${item.name}`}>{item.name}</Link>
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
                <Button onClick={() => handleDelete2(item)} variant="danger">
                  Delete
                </Button>
                <br />
              </>
            ))}

            <Link to="/cartpage">
              <Button pill="bg" variant="primary" className="mt-2">
                Go to Cart Page
              </Button>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
