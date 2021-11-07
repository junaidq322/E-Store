import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Store/actions/cartActions";
import "../App.scss";
import Error from'../Components/Error';
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  border: 1.5px solid #ddd;
  border-radius: 25px;
  text-align: center;
  padding: 0.45rem 0.8rem;
  outline: 0;
  margin-right: 0.2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: #fff;
  background: #f64749;

  &:hover {
    opacity: 0.9;
    color: black;
  }
`;
function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if(userInfo){
      props.history.push('/shipping')
    }
    else{
      props.history.push("/login?redirect=shipping");
    }
    
  };
  return (
    <div>
      <div className="wrap cf">
        <h1 className="projTitle">Shopping Cart</h1>
        <div className="heading cf">
          <h1>My Cart</h1>
          <a href="/" className="continue">
            Continue Shopping
          </a>
        </div>
        <div className="cart">
          {cartItems.length === 0 ? (
            <Error>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </Error>
          ) : (
            <ul className="cartWrap">
              {cartItems.map((item) => (
                <li className="items odd">
                  <div className="infoWrap">
                    <div className="cartSection">
                      <img src={item.image} alt="" className="itemImg" />
                      <p className="itemNumber">{item.id}</p>
                      <h3>{item.name}</h3>

                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>

                      <p className="stockStatus"> In Stock</p>
                    </div>

                    <div className="prodTotal cartSection">
                      <p>Rs. {item.qty * item.price}</p>
                    </div>
                    <div className="cartSection removeWrap">
                      <Button
                        className="remove"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        x
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="subtotal cf">
          <ul>
            <li className="totalRow">
              <span className="label">Subtotal</span>
              <span className="value">
                ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs.
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </span>
            </li>

            <li className="totalRow">
              <span className="label">Shipping</span>
              <span className="value">Rs. 0</span>
            </li>

            <li className="totalRow final">
              <span className="label">Total</span>
              <span className="value">
                ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs.
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </span>
            </li>
            <li className="totalRow">
              <Button
                href="#"
                className="btn continue"
                style={{ backgroundColor: "#82ca9c" }}
                disabled={cartItems.length===0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
