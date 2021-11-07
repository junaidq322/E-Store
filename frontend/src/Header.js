import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
  FormGroup,
  Col,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Components/Loading";
import styled from "styled-components";
import { signout } from "./Store/actions/userActions";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems,loading } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
    return (
      <>
        {loading ? (
          <Loading></Loading>
        ) : (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <StyledLink to="/" style={{ color: "white", fontSize: "22px" }}>
                  E-Store
                </StyledLink>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>

                  <NavDropdown title="Categories" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav className="me-auto">
                  <Form className="d-flex p-2 col-example">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="mr-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Nav>
                <Nav>
                  <Link to="/cart" className="nav-link">
                    Cart
                    <IconContext.Provider
                      value={{ style: { fontSize: "24px", color: "#ffffff" } }}
                    >
                      <FaShoppingCart></FaShoppingCart>
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </IconContext.Provider>
                  </Link>
                  {userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item>
                        <Link
                          to="/orderhistory"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Order History
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to="/profile"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Your profile
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        {userInfo ? (
                          <Link
                            to="#signout"
                            style={{ textDecoration: "None", color: "black" }}
                            onClick={signoutHandler}
                          >
                            Logout
                          </Link>
                        ) : (
                          <Link
                            to="/login"
                            style={{ textDecoration: "None", color: "black" }}
                          >
                            Login
                          </Link>
                        )}
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="collasible-nav-dropdown">
                      <NavDropdown.Item>
                        <Link
                          to="/productlist"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Dashboard
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to="/productlist"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Products
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to="/profile"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Orders
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to="/profile"
                          style={{ textDecoration: "None", color: "black" }}
                        >
                          Users
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </>
    );
}

export default Header;
