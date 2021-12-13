import React from "react";
import axios from 'axios';
import { makeStyles, Typography, Button } from "@material-ui/core";
import { useForm, Form } from '../../components/useForm'
import Controls from "../../components/controls/Controls";
import { Grid } from '@material-ui/core'

import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

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

const initialFValues = {
  email: '',
  password: '',
}

const LoginPage = props => {
  const classes = useStyles();
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length >= 8 ? "" : "Password must be at least 8 chars long."
    if ('email' in fieldValues)
      temp.email = fieldValues.email.length >= 5 ? "" : "UserEmail must be at Valid with at least 5 chars long."
    setErrors({
      ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);


  const handleSubmit = e => {
    console.log(values);
    e.preventDefault();
    if (validate()) {

        console.log(values);
        var email = values.email.trim();
        var password = values.password;

        const config = {
          headers: {
              'Content-Type': 'application/json',
          },
        }
        axios.post('/api/auth/login', { email,password }, config)
        .then(response => {
              console.log(response.data);
              // alert('Login success')
              localStorage.setItem('userInfo', JSON.stringify(response.data))
              if(response.data.userType == 'A')
              {
                history.push("/")
                window.location.reload();
              }
              else
              {
                history.push("/")
                window.location.reload()
              }
                             
        })
        .catch(function (error) {     
          console.log(error)  
          // alert('Invalid email or password') 
          swal("Error", "Invalid email or password", "error");
          history.push("/login")         
      })

    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        {/* <Typography className={classes.brand} variant="h5" component="h1">
          Login
        </Typography> */}
        <Typography className={classes.mBottom} variant="body1">
          Sign In to your account
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Controls.Input
                name="email"
                label="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Controls.Password
                label="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <Button
                // onClick={() => history.push("/forgot-password")}
                color="primary"
              >
                Forgot password?
                  </Button>
              <div className={classes.mBottom}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  type="submit"
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => history.push("/register")}
                >
                  Register Now!
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
        <Typography variant="caption">&copy; ZeeweeSoft</Typography>
      </div>
      
    </div>
  );
};

export default LoginPage;
