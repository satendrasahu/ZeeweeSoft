import { Container, Fab } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleModal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UpdateModel from "./UpdateModel";
import swal from "sweetalert";
import Pagination from "./Pagination/Pagination";

const notify = (data) => toast(data);

const deleteProduct = (_id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`/api/product/${_id}`);

      window.location.reload();

      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
};

export const Product = (props) => {
  const [productData, setProductData] = useState([]);

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


  const Data = async () => {
    await fetch("/api/product")
      .then((response) => response.json())
      .then((result) => {
        console.log("resullllllllll", result);
        setProductData(result.data);
        setList(result.data)
      });
  };
  useEffect(() => {
    Data();
  }, []);

  return (
    <>
      <Container fixed style={{ marginTop: "70px" }}>
        <Paper className={classes.paper}>
          <SimpleModal />
          <ToastContainer />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SN</StyledTableCell>
                  <StyledTableCell>Product_Id</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Size</StyledTableCell>
                  <StyledTableCell>discount</StyledTableCell>
                  <StyledTableCell>discounted_Price</StyledTableCell>
                  <StyledTableCell>category</StyledTableCell>
                  <StyledTableCell>images</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.slice(pagination.start, pagination.end).map((data, ind) => {
                  return (
                    <>
                      <TableRow key={ind}>
                        <TableCell component="th" scope="row">
                          {ind + 1}
                        </TableCell>
                        <TableCell>{data._id}</TableCell>
                        <TableCell>{data.title}</TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell>{data.size}</TableCell>
                        <TableCell>{data.discount}</TableCell>
                        <TableCell>{data.discountedPrice}</TableCell>
                        <TableCell>{data.category}</TableCell>
                        <TableCell>
                          <img
                            src={data.image}
                            alt={data.image}
                            style={{ width: 100, height: 100 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Fab
                            size="small"
                            color="primary"
                            aria-label="add"
                            className={classes.margin}
                          >
                            {/* <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick ={()=>updateProduct(data._id)}> */}
                            <UpdateModel
                              id={data._id}
                              title={data.title}
                              price={data.price}
                              size={data.size}
                              discount={data.discount}
                              image={data.image}
                            />
                          </Fab>
                          <Fab
                            size="small"
                            color="secondary"
                            aria-label="add"
                            className={classes.margin}
                            onClick={() => deleteProduct(data._id)}
                          >
                            <DeleteIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
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

export { notify };
