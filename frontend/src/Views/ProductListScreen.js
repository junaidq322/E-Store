import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Store/actions/productActions';
import Loading from "../Components/Loading";
import Error from "../Components/Error";
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
  color: black;
  background: cyan;

  &:hover {
    opacity: 0.9;
    color: black;
  }
`;
function ProductListScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { loading,error,products } = productList;
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch])
    return (
      <div>
        <h1 style={{textAlign: "center",fontWeight:"bold"}}>Products</h1>
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <table className="table">
            <thead>
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
                <tr key={product._id}>
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
                      //onClick={() => deleteHandler(product)}
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
