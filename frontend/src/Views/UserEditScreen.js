import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../Store/actions/userActions";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { USER_UPDATE_RESET } from "../Store/constants/userConstants"
import { updateUserInAdmin } from "../Store/actions/userActions";
import styled from "styled-components";
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
export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdateAdmin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserInAdmin({ _id: userId, name, email, isAdmin }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{textAlign:"center"}}>Edit User {name}</h1>
          {loadingUpdate && <Loading></Loading>}
          {errorUpdate && (
            <Error variant="danger">{errorUpdate}</Error>
          )}
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error variant="danger">{error}</Error>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <Button type="submit">
                Update
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
