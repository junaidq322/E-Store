import axios from 'axios';
import {PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from '../constants/productConstants';

export const listProducts = ()=>async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try{
        const { data } = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(e){
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message})
    }
} 

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