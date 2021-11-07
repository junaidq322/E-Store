import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { signin } from "../Store/actions/userActions";
import { Grid, Button, TextField, InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import Logo from "../estore.png";
import Shopping from '../shopping.jpg';
function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <Grid
        container
        style={{ minHeight: "90vh", margin: "-15px" }}
        className="gr"
      >
        <Grid item xs={12} sm={6}>
          <img
            src={Shopping}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="brand"
            className="gr"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div></div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
            onSubmit={submitHandler}
          >
            <Grid container justify="center">
              <img
                src={Logo}
                width={200}
                alt="logo"
                style={{ marginBottom: "-50px", marginTop: "-20px" }}
              />
            </Grid>
            {loading && <Loading></Loading>}
            {error && <Error variant="danger">{error}</Error>}
            <TextField
              label="Email"
              type="email"
              margin="normal"
              variant="filled"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              label="password"
              type="password"
              margin="normal"
              variant="filled"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment>
                ),
                maxLength: 10,
              }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <div style={{ height: 20 }}></div>
            <Button color="primary" variant="contained" type="submit">
              Log In
            </Button>
            <div style={{ height: 20 }}></div>
            <div>
              <label />
              <div>
                New Customer? 
                <Link to={`/register?redirect=${redirect}`}>
                  Create your account
                </Link>
              </div>
            </div>
          </form>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginScreen;
