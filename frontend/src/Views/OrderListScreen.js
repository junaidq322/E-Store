import React,{useEffect} from "react";
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
import { deleteOrder, listOrders } from "../Store/actions/orderActions";
import Button from "@mui/material/Button";
import { ORDER_DELETE_RESET } from "../Store/constants/orderConstants";
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

export default function OrderListScreen(props) {

    const orderList=useSelector((state)=>state.orderList);
    const {loading,error,orders}=orderList;
    const orderDelete=useSelector((state)=>state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete}= orderDelete;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({ type: ORDER_DELETE_RESET });
        dispatch(listOrders());
    },[dispatch,successDelete]);

    const deleteHandler=(order)=>{
         if (window.confirm("Are you sure to delete?")) {
           dispatch(deleteOrder(order._id));
         }
    }
  return (
    <TableContainer component={Paper}>
      <div>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Order List</h1>
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
              <StyledTableCell align="center">USER</StyledTableCell>
              <StyledTableCell align="center">DATE&nbsp;</StyledTableCell>
              <StyledTableCell align="right">TOTAL&nbsp;</StyledTableCell>
              <StyledTableCell align="center">PAID&nbsp;</StyledTableCell>
              <StyledTableCell align="center">DELIVERED&nbsp;</StyledTableCell>
              <StyledTableCell align="center">ACTIONS&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell component="th" scope="row">
                  {order._id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {order.user.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.createdAt.substring(0, 10)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {order.totalPrice.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      props.history.push(`/Orders/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => {
                      deleteHandler(order);
                    }}
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