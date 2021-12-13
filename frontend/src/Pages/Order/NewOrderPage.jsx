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
import Pagination from "../../components/Pagination/Pagination";

/**
 * @author
 * @function OrderPage
 **/

export const NewOrderPage = (props) => {
  const [orderData, setOrderData] = useState([]);
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
  const [showPerPage, setShowPerPage] = useState(20);

  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  // pagination end

  /// pagination search

  const onPaginationChange = (start, end) => {
    //  console.log(start, end);
    setPagination({
      start: start,
      end: end,
    });
  };

  const changeRowsNo = (totalPageNo) => {
    setShowPerPage(totalPageNo);
  };
  const listLength = list.length;
  useEffect(async () => {
    try {
      const result = await axios.get(`/api/order/order/confirm`);
      if (result) {
        console.log(" New Order List", result.data.data);
        await setOrderData(result.data.data);
        setList(result.data.data)
      }
    } catch (err) {}
  }, []);

  return (
    <>
      <Container fixed style={{ marginTop: "70px" }}>
        <Paper className={classes.paper}>
          <h1 style={{ paddingLeft: 20, paddingTop: 10 }}> New Order List </h1>
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
                {orderData
                  .slice(pagination.start, pagination.end)
                  .map((data, ind) => {
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
                                <TableCell>{res.discountedPrice}</TableCell>
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
                                  {res.total}
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
          </TableContainer>
        </Paper>
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          listLength={listLength}
          changeRowsNo={changeRowsNo}
        />
      </Container>
    </>
  );
};
