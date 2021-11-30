import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createProduct } from "../Store/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../Store/constants/productConstants";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
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
function CreateProductScreen(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
          {
        name,
        price,
        image,
        category,
        countInStock,
        brand,
        description
    }
      )
    );
     dispatch({ type: PRODUCT_CREATE_RESET });
     props.history.push(`/productlist`);
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{ textAlign: "center" }}>Create Product</h1>
        </div>
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="imageFile">Image File</label>
            <input
              type="file"
              id="imageFile"
              label="Choose Image"
              onChange={uploadFileHandler}
            ></input>
            {loadingUpload && <Loading></Loading>}
            {errorUpload && <Error variant="danger">{errorUpload}</Error>}
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              id="countInStock"
              type="text"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label></label>
            <Button type="submit">Create</Button>
          </div>
        </>
      </form>
    </div>
  );
}

export default CreateProductScreen;
