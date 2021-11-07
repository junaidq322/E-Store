import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Components/Footer/Footer";
import HomeScreen from "./Views/HomeScreen";
import ProductDetailsScreen from "./Views/ProductDetailsScreen";
import AboutScreen from "./Views/AboutScreen";
import LoginScreen from "./Views/LoginScreen";
import RegisterScreen from "./Views/RegisterScreen";
import ProfileScreen from "./Views/ProfileScreen";
import CartScreen from "./Views/CartScreen";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loading";
import ShippingAddressScreen from "./Views/ShippingAddressScreen";
import PaymentMethodScreen from "./Views/PaymentMethodScreen";
import PlaceOrderScreen from "./Views/PlaceOrderScreen";
import OrderScreen from "./Views/OrderScreen";
import ProductListScreen from "./Views/ProductListScreen";
import OrderHistoryScreen from "./Views/OrderHistoryScreen";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";
function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/product/:id" component={ProductDetailsScreen} />
          <Route path="/about" component={AboutScreen} />
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}/>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/Orders/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;