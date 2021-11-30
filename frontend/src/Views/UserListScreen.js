import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { deleteUser, listUsers } from "../Store/actions/userActions";
import { USER_DETAILS_RESET } from "../Store/constants/userConstants";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete}=userDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch,successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <TableContainer component={Paper}>
      <div>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>User List</h1>
      </div>
      {loadingDelete && <Loading></Loading>}
      {errorDelete && <Error variant="danger">{errorDelete}</Error>}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error variant="danger">{error}</Error>
      ) : (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">NAME&nbsp;</StyledTableCell>
              <StyledTableCell align="center">EMAIL&nbsp;</StyledTableCell>
              <StyledTableCell align="center">ISADMIN&nbsp;</StyledTableCell>
              <StyledTableCell align="center">ACTIONS&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {user._id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.isAdmin ? "YES" : "NO"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    type="button"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
