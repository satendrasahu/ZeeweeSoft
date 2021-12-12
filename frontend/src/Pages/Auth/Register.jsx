import React from "react";
import axios from 'axios'
import { makeStyles, Typography, Button } from "@material-ui/core";

import { useForm, Form } from '../../components/useForm'
import Controls from "../../components/controls/Controls";
// import Controls from "../../Components/controls/Controls";
import { Grid } from '@material-ui/core'

import swal from 'sweetalert';

const useStyles = makeStyles(theme => ({
  root: {
    background: "#0d131d",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  mBottom: {
    marginBottom: ".5rem"
  },
  button: {
    marginTop: ".85rem"
  },
  loginCard: {
    width: "275px",
    borderRadius: 5,
    background: "#fff",
    padding: ".85rem"
  }
}));

const userTypes = [
  { id: "Admin", title: "Admin" },
  { id: "User", title: "User"},
]
const initialFValues = {
  userName: '',
  password: '',
  email: '',
  rpassword: '',
  userType: ''
}

const Register = props => {
  const classes = useStyles();
  const { history } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors }  
    if ('email' in fieldValues)
    
      temp.email = (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length >= 8 ? "" : "Password must have at least 8 characters."
    if ('userName' in fieldValues)
      temp.userName = fieldValues.userName.length >= 5 ? "" : "Username must be at least 5 chars long."
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    // setValues,
    errors,
    setErrors,
    handleInputChange,
    // resetForm
  } = useForm(initialFValues, true, validate);


  const handleSubmit = e => {
    //console.log(values);
    e.preventDefault();

    if (validate()) {
        console.log(values);
        var userName = values.userName.trim();
        var password = values.password;
        var email = values.email;
        var rpassword = values.rpassword;
        var userType = values.userType;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
          }
          axios.post('/api/auth/register', { userName,password,email,rpassword,userType }, config)
          .then(response => {
              console.log(response.data);
              localStorage.setItem('userInfo', JSON.stringify(response.data))
              swal("Good Job", "User register Succesfull", "success")
              .then((value) => {
                history.push("/login")
              });
          })
          .catch(function (error) {     
            console.log(error)  
            swal("Ohhh..", "User already exists", "warning")
            .then((value) => {
              history.push("/register")
            });    
        })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Register
        </Typography>
        {/* <Typography className={classes.brand} variant="h5" component="h1">
          Login
        </Typography> */}
        <Typography className={classes.mBottom} variant="body1">
          Create your account
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Controls.Input
                  name="userName"
                  label="Username"
                  value={values.userName}
                  onChange={handleInputChange}
                  error={errors.userName}
                  fullWidth
                  />
                  <Controls.Input
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <Controls.Password
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <Controls.Password
                  name="rpassword"
                  label="Repeat password"
                  value={values.rpassword}
                  onChange={handleInputChange}
                  error={errors.rpassword}
                />
                <Controls.Select
                    label="User Type"
                    name="userType"
                    value={values.userType}
                    onChange={handleInputChange}
                    options={userTypes}
                    error={errors.userType}
                />
              </Grid>
          </Grid>    
         
          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
              type="submit"
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Sign in
            </Button>
          </div>
          </Form>
        <Typography variant="caption">&copy; ZeeweeSoft</Typography>
      </div>
     
    </div>
  );
};

export { Register};
