import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import styled from "styled-components";
import { Grid, TextField, InputAdornment } from "@mui/material";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import Shopping from "../shopping.jpg";
import Error from "../Components/Error";
import Logo from "../estore.png";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Store/actions/userActions";

const Button = styled.button`
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #ffa51d;
  background: linear-gradient(-60deg, #a9a9a9 50%, black 65%);
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
  }
`;

export default function RegisterScreen(props) {
  const dispatch = useDispatch();
const userRegister = useSelector((state) => state.userRegister);
const { userInfo, loading, error } = userRegister;
const redirect = props.location.search
  ? props.location.search.split("=")[1]
  : "/";  
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');

const submitHandler = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Password and confirm password are not match");
  } else {
    dispatch(register(name, email, password));
  }
};

useEffect(()=>{
if (userInfo) {
  props.history.push(redirect);
}
},[props.history,redirect,userInfo])

  return (
    <div className="cc">
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
            <h1 style={{ textAlign: "center", marginTop: "-20px" }}>
              Register
            </h1>
            {loading && <Loading></Loading>}
            {error && <Error variant="danger">{error}</Error>}
            <TextField
              label="Name"
              type="text"
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
              onChange={(e) => setName(e.target.value)}
            ></TextField>
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
              label="Password"
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
            <TextField
              label="Confirm password"
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
            <div style={{ height: 20 }}></div>
            <Button color="primary" variant="contained" type="submit">
              Signup
            </Button>
            <div>
              <label />
              <div>
                Already have an account? <Link to={`/login`}>Sign-In</Link>
              </div>
            </div>
          </form>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
}