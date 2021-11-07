import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
import styled from "styled-components";
import place from "./PlaceScreen.module.css";
import { createOrder } from "../Store/actions/orderActions";
import { ORDER_CREATE_RESET } from "../Store/constants/orderConstants";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Row,Col } from "react-bootstrap";
const Button = styled.button`
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #ffa51d;
  background: linear-gradient(-60deg, #a9a9a9 40%, black 52%);
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
  }
`;
export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
const user = useSelector((state) => state.userSignin);
const { userInfo } = user;
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    console.log(order);
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/Orders/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success, error]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Row>
        <Col>
          <ul>
            <li>
              <div
                className={place.card_body}
                style={{ color: "white", backgroundColor: "#1c2024" }}
              >
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div
                className={place.card_body}
                style={{ color: "white", backgroundColor: "#1c2024" }}
              >
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div
                className={place.card_body}
                style={{ color: "white", backgroundColor: "#1c2024" }}
              >
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className={place.row}>
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className={place.img_small}
                          ></img>
                        </div>
                        <div className={place.min_30}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x Rs.{item.price} = Rs.
                          {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </Col>
        <Col>
          <div
            className={place.card_body}
            style={{
              color: "white",
              backgroundColor: "#1c2024",
              marginTop: "-150px",
            }}
          >
            <ul>
              <li>
                <h2 style={{ textAlign: "center" }}>Order Summary</h2>
              </li>
              <li>
                <div className={place.row}>
                  <div>Items</div>
                  <div>Rs.{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>Shipping</div>
                  <div>Rs.{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>Tax</div>
                  <div>Rs.{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>Rs.{cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <Button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>
                {loading && <Loading variant="danger">{error}</Loading>}
                {error && <Error variant="danger">{error}</Error>}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}
