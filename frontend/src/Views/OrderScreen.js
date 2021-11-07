import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { Link } from "react-router-dom";
import { detailsOrder } from "../Store/actions/orderActions";
import place from "./PlaceScreen.module.css";
export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  console.log(props.match.params.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  const orderDetails = useSelector((state) => state.orderDetail);
  const { order, loading, error } = orderDetails;
  console.log(order);
  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <Error variant="danger">{error}</Error>
  ) : (
    <div>
      <h1 style={{textAlign:"center"}}>Order No# {order._id}</h1>
      <div className={place.row_top}>
        <div className={place.col_2}>
          <ul>
            <li>
              <div className={place.card_body}>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Error variant="success">
                    Delivered at {order.deliveredAt}
                  </Error>
                ) : (
                  <Error variant="danger">Not Delivered</Error>
                )}
              </div>
            </li>
            <li>
              <div className={place.card_body}>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Error variant="success">Paid at {order.paidAt}</Error>
                ) : (
                  <Error variant="danger">Not Paid</Error>
                )}
              </div>
            </li>
            <li>
              <div className={place.card_body}>
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className={order.row}>
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
                          {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className={place.col_2}>
          <div className={place.card_body}>
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className={place.row}>
                  <div>Items</div>
                  <div>Rs.{order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>Shipping</div>
                  <div>Rs.{order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>Tax</div>
                  <div>Rs.{order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className={place.row}>
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>Rs.{order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
