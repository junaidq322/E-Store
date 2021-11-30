import "./App.css";
import React, { Suspense, lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Components/Footer/Footer";
import Loading from "./Components/Loading";
/*import HomeScreen from "./Views/HomeScreen";
import ProductDetailsScreen from "./Views/ProductDetailsScreen";
import AboutScreen from "./Views/AboutScreen";
import LoginScreen from "./Views/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen";
import ProfileScreen from "./Views/ProfileScreen";
import CartScreen from "./Views/CartScreen";
import ShippingAddressScreen from "./Views/ShippingAddressScreen";
import PaymentMethodScreen from "./Views/PaymentMethodScreen";
import PlaceOrderScreen from "./Views/PlaceOrderScreen";
import OrderScreen from "./Views/OrderScreen";
import ProductListScreen from "./Views/ProductListScreen";
import OrderHistoryScreen from "./Views/OrderHistoryScreen";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
import CreateProductScreen from "./Views/CreateProductScreen";
import ProductEditScreen from "./Views/ProductEditScreen";
import UserRoute from "./Components/UserRoute";
import OrderListScreen from "./Views/OrderListScreen";
import UserListScreen from "./Views/UserListScreen";
import UserEditScreen from "./Views/UserEditScreen";*/
const HomeScreen = lazy(() => import("./Views/HomeScreen"));
const ProductDetailsScreen = lazy(() => import("./Views/ProductDetailsScreen"));
const AboutScreen = lazy(() => import("./Views/AboutScreen"));
const LoginScreen = lazy(() => import("./Views/LoginScreen"));
const RegisterScreen = lazy(() => import("./Views/RegisterScreen"));
const ProfileScreen = lazy(() => import("./Views/ProfileScreen"));
const ShippingAddressScreen = lazy(() =>
  import("./Views/ShippingAddressScreen")
);
const PaymentMethodScreen = lazy(() => import("./Views/PaymentMethodScreen"));
const PlaceOrderScreen = lazy(() => import("./Views/PlaceOrderScreen"));
const OrderScreen = lazy(() => import("./Views/OrderScreen"));
const ProductListScreen = lazy(() => import("./Views/ProductListScreen"));
const OrderHistoryScreen = lazy(() => import("./Views/OrderHistoryScreen"));
const PrivateRoute = lazy(() => import("./Components/PrivateRoute"));
const AdminRoute = lazy(() => import("./Components/AdminRoute"));
const UserRoute = lazy(() => import("./Components/UserRoute"));
const CartScreen = lazy(() => import("./Views/CartScreen"));
const OrderListScreen = lazy(() => import("./Views/OrderListScreen"));
const UserListScreen = lazy(() => import("./Views/UserListScreen"));
const CreateProductScreen = lazy(() => import("./Views/CreateProductScreen"));
const ProductEditScreen = lazy(() => import("./Views/ProductEditScreen"));
const UserEditScreen = lazy(() => import("./Views/UserEditScreen"));
const SearchScreen = lazy(() => import("./Views/SearchScreen"));
function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Suspense fallback={<Loading />}>
            <Route path="/product/:id" component={ProductDetailsScreen} exact />
            <UserRoute path="/about" component={AboutScreen} />
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <AdminRoute path="/productlist" component={ProductListScreen} />
            <AdminRoute path="/createProduct" component={CreateProductScreen} />
            <AdminRoute
              path="/product/:id/edit"
              component={ProductEditScreen}
              exact
            ></AdminRoute>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <UserRoute path="/cart/:id?" component={CartScreen} />
            <UserRoute path="/shipping" component={ShippingAddressScreen} />
            <UserRoute path="/payment" component={PaymentMethodScreen} />
            <UserRoute path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/Orders/:id" component={OrderScreen}></Route>
            <UserRoute path="/orderhistory" component={OrderHistoryScreen} />
            <UserRoute path="/" component={HomeScreen} exact />
            <UserRoute
              path="/search/name/:name?"
              component={SearchScreen}
              exact
            ></UserRoute>
            <AdminRoute path="/orderlist" component={OrderListScreen} />
            <AdminRoute path="/userlist" component={UserListScreen} />
            <AdminRoute
              path="/user/:id/edit"
              component={UserEditScreen}
            ></AdminRoute>
            <UserRoute
              path="/search/category/:category"
              component={SearchScreen}
              exact
            ></UserRoute>
            <UserRoute
              path="/search/category/:category/name/:name"
              component={SearchScreen}
              exact
            ></UserRoute>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;