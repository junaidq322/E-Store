import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps";
import { saveShippingAddress } from "../Store/actions/cartActions";
import styled from "styled-components";
import countryList from "react-select-country-list";
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
export default function ShippingAddressScreen(props) {
  const options=countryList().getData();
console.log(options);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userSignin);
  const { userInfo } = user;
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/login");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            pattern="^[a-zA-Z ]*$"
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            style={{ color: "black" }}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            value={country}
          >
            {options.map((f, key) => {
              return (
                <option key={key} value={f.label}>
                  {f.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label />
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
}
