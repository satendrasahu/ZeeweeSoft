import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ShowCategory } from "../actions";
import Pagination from "./Pagination/Pagination";
import { getId } from "../Pages/Auth/hepler";
import { notify } from "./Product";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Home = () => {
  const classes = useStyles();

  const [productData, setProductData] = useState([]);
  const [categoryData, setCategryData] = useState([]);
  const [uniqueCategoryData, setUniqueCategryData] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const myState = useSelector((state) => state.changeTheProductName);
  const showCategoryState = useSelector((state) => state.changeShowCategory);

  const dispatch = useDispatch();
  const userId = getId();
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

  const filterCategory = (category) => {
    // alert(category === 'All')
    if (category === "All") {
      setProductData(uniqueCategoryData);
    } else {
      const result = uniqueCategoryData.filter((curElem) => {
        return curElem.category === category;
      });
      setProductData(result);
    }
  };

  const updateCartProduct = async (_id, qty, totalPrice) => {
    // alert(typeof(qty))
    // alert(qty)

    console.log("_id, qty, totalPrice",_id, qty, totalPrice)

    if (qty === 0) {
      swal("Sorry", "At least 1 product is required", "warning");
      return;
    } else {
      const res = await fetch(`api/cart/cart/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (data) {
        notify(" cart product quantity has updated");
        console.log(data, " update cart data");
        // history.push('/product')
        // setOpen(false);
        window.location.reload();
        notify(" cart product quantity has updated");
      } else if (data.status === 422) {
        window.alert("invalid cart data");
      }
    }
  };

  const addToCart = async (_id, title, price, discount, image) => {
    
    const prodName = await axios.get(`/api/cart/cart/${title}`)
    // console.log("prodNameData",prodName.data.result)
    // console.log("prodNameData",prodName.data.result[0]._id)
    // console.log("prodNameData",prodName.data.result[0].qty+1)
    // console.log("prodNameData",(prodName.data.result[0].qty+1) * prodName.data.result[0].discountedPrice)

    if(prodName.data.result.length !=0)
    {
    await  updateCartProduct(
        prodName.data.result[0]._id,
        prodName.data.result[0].qty+1,
        (prodName.data.result[0].qty+1) * prodName.data.result[0].discountedPrice)
    }
    else{

    const res = await fetch("api/cart/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: _id,
        title,
        price,
        discount,
        image,
        userId,
        totalPrice: price,
      }),
    });
    const data = await res.json();
    
    if (data.status === 422) {
      window.alert("invalid data");
      window.location.reload()
    }  else {
      window.location.reload()
    }  
    console.log(data, " cart data save");
    }
  };




  const Data = () => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((result) => {
        console.log("resullllllllll", result);
        setProductData(result.data);
        setList(result.data);
        setUniqueCategryData(result.data);
        const allCategories = [
          "All",
          ...new Set(result.data.map((res) => res.category)),
        ];
        setCategryData(allCategories);
      });
  };
  useEffect(() => {
    Data();
  }, []);

  const searchData = async (searchName) => {
    const result = await axios.get(`/api/product/${searchName}`);
    console.log("result.data", result.data.data);
    if (result) {
      setProductData(result.data.data);
    }
  };
  // alert(myState)
  useEffect(() => {
    searchData(myState);
  }, [myState]);

  // alert(showCategoryState)
  useEffect(() => {
    setShowCategory(showCategoryState);
    // alert(showCategoryState)
  }, [showCategoryState]);
  // console.log("category only ", categoryData);
  const CategoryList = () => {
    return (
      <>
        <div style={{ background: "white", minHeight: 50, marginBottom: 25 }}>
          {categoryData.map((cat, ind) => {
            return (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  style={{ margin: 10 }}
                  onClick={() => {
                    filterCategory(cat);
                  }}
                >
                  {cat}
                </Button>
              </>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <Container style={{ marginTop: "85px" }}>
        <div
          style={{ minHeight: 50 }}
          onMouseLeave={() => {
            setShowCategory(false);
            dispatch(ShowCategory(false));
          }}
          onMouseEnter={() => {
            setShowCategory(true);
          }}
        >
          {showCategory ? <CategoryList /> : ""}
        </div>
        <Grid item container direction="row" spacing={3}>
          {productData
            .slice(pagination.start, pagination.end)
            .map((data, ind) => {
              return (
                <>
                  <Grid item xs={12} sm={12} md={3} direction="row">
                    <Card className={classes.root} key={ind}>
                      <CardActionArea>
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={data.image}
                            alt=""
                            style={{ height: 200, width: 200 }}
                          />
                        </div>

                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {data.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {data.discription}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          <h3> Rs {data.price} </h3>
                        </Button>
                        <Button size="small" color="secondary">
                          Dis - {data.discount} %
                        </Button>
                        <NavLink to="/cart" style={{ textDecoration: "none" }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              addToCart(
                                data._id,
                                data.title,
                                data.price,
                                data.discount,
                                data.image
                              )
                            }
                          >
                            Add to Cart
                          </Button>
                        </NavLink>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              );
            })}
        </Grid>
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

export { Home };
