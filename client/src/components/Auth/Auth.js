import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Icon from './icon';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import jwt from 'jsonwebtoken';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword(!showPassword);
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);


    const handleSubmit = (e) => {
        e.preventDefault();

         if (isSignup) {
      dispatch(signup(formData, history));
       } else {
      dispatch(signin(formData, history));
      }
        console.log(formData);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      setShowPassword(false);
  };

  const googleSuccess = async (res) => {
     const result = jwt_decode(res?.credential) 
     const token = res?.credential;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
     alert('Google Sign In was unsuccessful. Try again later');
  };

    return (
    <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
             <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                 { isSignup && (
                 <>
                   <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                   <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                 </>
                 )}
                 <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                 <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                 { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
               </Grid>
               <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                 { isSignup ? 'Sign Up' : 'Sign In' }
               </Button>
               <GoogleLogin 
                  render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
              )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
               />
               <Grid container justifyContent="center">
                <Grid item>
                 <Button onClick={switchMode}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                 </Button>
                </Grid>
               </Grid>
            </form>
          </Paper>
    </Container>
  );
};

export default Auth;