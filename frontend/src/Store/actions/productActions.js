import axios from 'axios';
import {PRODUCT_CATEGORY_LIST_FAIL, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS} from '../constants/productConstants';

export const listProducts = ({name = "",category = ""})=>async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try{
        const { data } = await axios.get(
          `/api/products?name=${name}&category=${category}`
        );
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message})
    }
} 

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: 
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
}; 

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/products", product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async(dispatch,getState)=>{
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(`/api/products/${productId}`,{
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

axios.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
      if(response.status==="200"){
        console.log(response.status);
      }
    }),
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      localStorage.removeItem("token");
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);