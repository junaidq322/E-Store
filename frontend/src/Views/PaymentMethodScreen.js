import React, { useState } from 'react'
import CheckoutSteps from '../Components/CheckoutSteps'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../Store/actions/cartActions';
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
export default function PaymentMethodScreen(props) {
    const [paymentMethod,setPaymentMethod]=useState('Cash on delivery');
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
      props.history.push("/shipping");
    }
    return (
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Payment Method</h1>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="cash"
                value="cash"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="paypal">Cash on delivery</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="stripe">Stripe</label>
            </div>
          </div>
          <div>
            <label />
            <Button className="primary" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    );
}
