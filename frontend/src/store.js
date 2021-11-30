import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Store/reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailReducer,
  orderListReducer,
  ordersListReducer,
} from "./Store/reducers/orderReducers";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./Store/reducers/productReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  usersListReducer,
  userUpdateInAdminReducer,
  userUpdateReducer,
} from "./Store/reducers/userReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Cash on Delivery",
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderHistory: orderListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: ordersListReducer,
  orderDelete: orderDeleteReducer,
  userList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdateAdmin: userUpdateInAdminReducer,
  productCategoryList: productCategoryListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
