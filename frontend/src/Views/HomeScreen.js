import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Product from "../Components/Product/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Store/actions/productActions";
import CarouselComponent from "../Components/CarouselComponent";

function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const {loading,error,products}=productList;
  //const [loading, setLoading] = useState(false);
  //const { error, products } = productList;
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      //setLoading(true);
      setData(products);
      dispatch(listProducts({}));
    } catch (e) {
      console.log(e);
    }
    finally{
      //setLoading(false);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error variant="danger"></Error>
      ) : (
        <div className="row center">
          <CarouselComponent />
          {console.log(products)}
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
