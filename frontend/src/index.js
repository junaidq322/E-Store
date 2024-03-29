import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import Auth0ProviderWithHistory from './Auth/auth0-provider-with-history';
import axios from 'axios';

axios.interceptors.request.use(
  (req) => {
    // Add configurations here
    console.log(req);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    // Add configurations here
    if (res.status === 201) {
      console.log("Posted Successfully");
    }
    if (res.status === 200) {
      console.log("Got data Successfully");
    }
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
