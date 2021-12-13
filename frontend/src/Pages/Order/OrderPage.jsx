import {
  Button,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { getId } from "../Auth/hepler";

/**
 * @author
 * @function OrderPage
 **/

export const OrderPage = (props) => {
  const [orderData, setOrderData] = useState([]);
  const userId = getId();
  const [orderId, setOrderId] = useState("");
  const history = useHistory();

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#3F51B5",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableRow: {
      background: "#3F51B5",
      color: "white",
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  useEffect(async () => {
    try {
      const result = await axios.get(`/api/order/order/${userId}`);
      if (result) {
        console.log("Order List", result.data.data);
        await setOrderData(result.data.data);
        await setOrderId(result.data.data[0]._id);
      }
    } catch (err) {}
  }, []);

  const deleteOrder = async () => {
    try {
      const result = await axios.delete("/api/order/order");
      if (result) {
        swal("order has cancelled");
        history.push("/cart");
      }
    } catch (err) {}
  };

  const deleteProductByUserId = async (userId) => {
    try {
      await axios.delete(`/api/cart/cart/confirm/${userId}`);
      window.location.reload();
    } catch (err) {}
  };

  const createOrder = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Confirm order",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const result = axios.patch(`/api/order/order/status/${id}`);
        if (result) {
          swal("order has confirmed", {
            icon: "success",
          });
          history.push("/allorder");
          deleteProductByUserId(userId);
        }
      } else {
        deleteOrder();
      }
    });
  };
  return (
    <>
      <Container fixed style={{ marginTop: "70px" }}>
        <Paper className={classes.paper}>
          <h1 style={{ paddingLeft: 20, paddingTop: 10 }}> Order List </h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order Id</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>discount</StyledTableCell>
                  <StyledTableCell>discountedPrice</StyledTableCell>
                  <StyledTableCell>date</StyledTableCell>
                  <StyledTableCell>images</StyledTableCell>
                  <StyledTableCell>total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.map((data, ind) => {
                  return (
                    <>
                      {data.items.map((res, index) => {
                        return (
                          <>
                            <TableRow key={ind}>
                              <TableCell>{data._id}</TableCell>
                              <TableCell>{res.title}</TableCell>
                              <TableCell>{res.price}</TableCell>
                              <TableCell>{res.size}</TableCell>
                              <TableCell>{res.discount}</TableCell>
                              <TableCell>{res.discountedPrice.toFixed(2)}</TableCell>
                              <TableCell>{res.date}</TableCell>
                              <TableCell>
                                <img
                                  src={res.image}
                                  alt={res.image}
                                  style={{ width: 100, height: 100 }}
                                />
                              </TableCell>
                              <TableCell>
                                <Button size="small" variant="contained">
                                  {res.total.toFixed(2)}
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </TableBody>
            </Table>
            <div>
              <Button
                size="large"
                variant="contained"
                color="primary"
                style={{ margin: 20, padding: 20 }}
                onClick={() => {
                  createOrder(orderId);
                }}
              >
                Confirm Order
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                style={{ margin: 20, padding: 20 }}
                onClick={() => {
                  deleteOrder();
                }}
              >
                Cancel Order
              </Button>
            </div>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};
