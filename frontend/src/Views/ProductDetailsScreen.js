import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../Store/actions/productActions";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import data from "../data";
import styled from "styled-components";
import Rating from "../Components/Rating/Rating";
import Product from "../Components/Product/Product";
import  Carousel  from "react-elastic-carousel";
import { useParams } from "react-router";

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 30px 0;

  .big-img {
    max-width: 500px;
    min-width: 290px;
    overflow: hidden;
    margin: 25px;
  }
  .big-img:hover {
    transform: scale(1.05);
  }
  .big-img img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: block;
    object-fit: cover;
  }
`;

const Box = styled.div`
  max-width: 500px;
  min-width: 290px;
  margin: 25px;
  border: 1px solid #c3c3c3;
  text-align: center;
  overflow: hidden;

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .row h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .row span {
    color: crimson;
  }
`;
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
const Select = styled.select`
  border: 1.5px solid #ddd;
  border-radius: 25px;
  text-align: center;
  padding: 0.45rem 0.8rem;
  outline: 0;
  margin-right: 0.2rem;
  margin-bottom: 1rem;
`;


export default function ProductDetailsScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;

  //const {id}=props;
  //alert(id);
  const [qty, setQty] = useState(1);
  const productInfo = useSelector((state) => state.productDeatils);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const { loading, error, product } = productInfo;
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div className="app">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error variant="danger"></Error>
      ) : (
        <Details key={product._id}>
          <div className="big-img">
            <img src={product.image} />
          </div>

          <Box>
            <div className="row">
              <h2 className="product-title">{product.name}</h2>

              <div className="product-rating">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </div>
              <div className="product-price">
                <p className="new-price">
                  Price: <span>Rs.{product.price}</span>
                </p>
              </div>
            </div>
            <div className="product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
            </div>

            {product.countInStock > 0 ? (
              <span className="success">Status: In Stock</span>
            ) : (
              <span className="error">Status: Unavailable</span>
            )}
            {product.countInStock > 0 && (
              <div className="purchase-info">
                <Select
                  type="number"
                  min="0"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Select>
                <Button type="button" onClick={addToCartHandler}>
                  Add to Cart <i className="fa fa-shopping-cart"></i>
                </Button>
              </div>
            )}
          </Box>
          <div className="row">
            <div
              //style={{ backgroundColor: "#203040", color: "white" }}
            >
              <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
                Similar Products
              </h1>
              {loading ? (
                <Loading></Loading>
              ) : error ? (
                <Error variant="danger">{error}</Error>
              ) : (
                <>
                  {products.length === 0 && <Error>No Product Found</Error>}
                  <div className="row center">
                    <Carousel itemsToShow={1}>
                      {products
                        .filter(
                          (pro) =>
                            pro.category === product.category &&
                            pro._id !== product._id
                        )
                        .map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                          ></Product>
                        ))}
                    </Carousel>
                  </div>
                </>
              )}
            </div>
          </div>
        </Details>
      )}
    </div>
  );
}
