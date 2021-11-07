import React, { useState } from 'react';
import Rating from '../Rating/Rating';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Store/actions/cartActions';
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  max-height: 32.3rem;
  margin: 3rem;
  margin-top: 5rem;
  text-align: center;
  font-family: arial;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
`;
const Button = styled.button`
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
  }
`;
export default function Product(props) {
  const { product } = props;
  const dispatch=useDispatch();
  const [qty,setQty]=useState(1);
  const history = useHistory();
  const addToCartHandler =()=>{
    dispatch(addToCart(product._id, qty));
    setQty(qty+1);
    if(qty===product.countInStock){
      alert("Quantity Exceeded Supply!")
      setQty(product.countInStock);
    }
  }
  return (
      <Card key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img className="pic" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">Rs.{product.price}</div>
          <p>
            <Button type="button" onClick={()=>addToCartHandler(product._id)}>Add to Cart</Button>
          </p>
        </div>
      </Card>
  );
}