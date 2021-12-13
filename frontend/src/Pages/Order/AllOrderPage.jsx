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
// import swal from "sweetalert";
import { getId, isUserLoggedIn } from "../Auth/hepler";

/**
 * @author
 * @function OrderPage
 **/

export const AllOrderPage = (props) => {
  const [orderData, setOrderData] = useState([]);
  const history = useHistory();

  const userId = getId();
  const isLoggedIN = isUserLoggedIn();
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
      const result = await axios.get(`/api/order/order/confirm/${userId}`);
      if (result) {
        console.log(" confirm Order List", result.data.data);
        await setOrderData(result.data.data);
      }
    } catch (err) {}
  }, []);

  if(!isLoggedIN)
  {
    swal("login first", "to access this page login first","info")
    history.push("/login")
  }
  return (
    <>
      {isLoggedIN ? (
        <Container fixed style={{ marginTop: "70px" }}>
          <Paper className={classes.paper}>
            <h1 style={{ paddingLeft: 20, paddingTop: 10 }}>
              {" "}
              Confirm Order List{" "}
            </h1>
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
                              </TableRow>
                            </>
                          );
                        })}
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      ) : (
        history.push("/login")
      )}
    </>
  );
};
