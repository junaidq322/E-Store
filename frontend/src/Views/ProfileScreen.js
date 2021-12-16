import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { detailsUser, updateUser } from "../Store/actions/userActions";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  USER_UPDATE_PROFILE_RESET,
} from "../Store/constants/userConstants";
const Button = styled.button`
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #ffa51d;
  background: linear-gradient(-60deg, #a9a9a9 40%, black 52%);
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;

  &:hover {
    opacity: 0.7;
  }
`;
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  &:hover {
    transform: scale(1.05);
  }
  maxwidth: 300px;
`;

const Column = styled.div`
  width: 73.3%;
  margin-bottom: 16px;
  @media screen and (max-width: 650px) {
    width: 93.3%;
    display: block;
  }
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  padding: 0 16px;
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;
export const Profile = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo._id, user,successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      //alert("Password does not match");
      toast("Password does not match");
    } else {
      dispatch(updateUser({ userId: user._id, name, email, password }));
      if(successUpdate){
        toast("Profile updated successfully");
      }
    }
  };
  return (
    <div className="card">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Grid container spacing="1" columnSpacing="1">
          <Grid item xs={12} sm={6}>
            <Row>
              <Column>
                <Card>
                  <img
                    src="/images/Mike.jpg"
                    alt="Mike"
                    style={{
                      width: "100%",
                      height: "330px",
                      objectFit: "cover",
                    }}
                  />
                  <Container>
                    <h2>{userInfo.name}</h2>
                    <p>{userInfo.email}</p>
                    <p>
                      <Button>Contact</Button>
                    </p>
                  </Container>
                </Card>
              </Column>
            </Row>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            direction="column"
            style={{ padding: 10 }}
          >
            <div></div>
            <form
              className="form"
              onSubmit={submitHandler}
              style={{
                width: "93%",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "80%",
              }}
            >
              <div>
                <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
              </div>
              {loadingUpdate && <Loading />}
              {errorUpdate && <Error variant="danger">{errorUpdate}</Error>}
              <div>
                <label htmlFor="fullName">Name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  required
                  pattern="^[a-zA-Z ]*$"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength="4"
                ></input>
              </div>
              <div>
                <label htmlFor="address">Email</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength="6"
                ></input>
              </div>
              <div>
                <label htmlFor="city">Password</label>
                <input
                  type="password"
                  id="city"
                  placeholder="Enter password"
                  required
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="postalCode">Confirm Password</label>
                <input
                  type="password"
                  id="postalCode"
                  placeholder="Confirm password"
                  required
                  minLength="6"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label />
                <Button type="submit">Update</Button>
                <ToastContainer />
              </div>
            </form>
            <div></div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Profile;
