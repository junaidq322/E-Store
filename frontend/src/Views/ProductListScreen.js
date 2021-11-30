import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts } from '../Store/actions/productActions';
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import styled from "styled-components";
import { PRODUCT_DELETE_RESET } from '../Store/constants/productConstants';
const Button = styled.button`
  border: 1.5px solid #ddd;
  border-radius: 25px;
  text-align: center;
  padding: 0.45rem 0.8rem;
  outline: 0;
  margin-right: 0.2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  color: black;
  background: cyan;

  &:hover {
    opacity: 0.9;
    color: black;
  }
`;
const ProductButton = styled.button`
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
function ProductListScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { loading,error,products } = productList;
    const productDelete= useSelector((state) => state.productDelete);
    const { loading: loadingDelete,error: errorDelete, success: successDelete}=productDelete;

    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(listProducts({}));
         if (successDelete) {
           dispatch({ type: PRODUCT_DELETE_RESET });
         }
    },[dispatch,successDelete])
     const deleteHandler = (product) => {
       if (window.confirm("Are you sure to delete?")) {
         dispatch(deleteProduct(product._id));
         //window.location.reload();
       }
     };
    return (
      <div>
        <div classname="row">
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Products</h1>
          <ProductButton
            type="button"
            onClick={() => props.history.push(`/createProduct`)}
          >
            Create Product
          </ProductButton>
        </div>
        {loadingDelete && <Loading></Loading>}
        {errorDelete && <Error variant="danger">{errorDelete}</Error>}
        {loading && <Loading></Loading>}
        {error && <Error variant="danger">{error}</Error>}
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <table className="table">
            <thead
              style={{ background: "black", color: "white" }}
              className="table-header"
            >
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="table-row">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="small"
                      style={{ background: "#f64749" }}
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}

export default ProductListScreen
