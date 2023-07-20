// import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import React, { useState } from 'react';
// import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import { makeRequest, handleError} from '../../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import {setIsAuthenticatedStatus,setSessionToken,setUserData,setOptions} from '../../../actions'
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		//marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		// margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(4),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// import { submitLogin } from 'app/auth/store/loginSlice';
// import * as yup from 'yup';
// import _ from '@lodash';

/**
 * Form Validation Schema
 */
// const schema = yup.object().shape({
//   username: yup.string().required('You must enter a valid username'),
//   password: yup
//     .string()
//     .required('Please enter your password.')
//     .min(4, 'Password is too short - should be 4 chars minimum.'),
// });

const defaultValues = {
  username: '',
  password: '',
};

function JWTLoginTab(props) {
	const initialFormData = Object.freeze({
		username: '',
		password: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
	const history = useHistory()

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};
  const classes = useStyles();

  const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

 makeRequest().post("/api/token/", formData)
    //axios.post(baseURL,data)
    .then(response => {
		setSessionToken(response.data.access)
        localStorage.setItem('token', response.data.access)
		localStorage.setItem('ishead', response.data.is_head)
		localStorage.setItem('issuperuser', response.data.is_superuser)
		localStorage.setItem('isrole', response.data.roles)
		localStorage.setItem('issupport', response.data.department)
		setIsAuthenticatedStatus(true)
        //const user = jwt(response.data.token);
		
        if(response.data.is_superuser === true){
          window.location = '/home'
        }
        if(response.data.is_superuser === false){
          window.location = '/home'
        }
        props.enqueueSnackbar("Login Successful", {variant:'success'});
    })
    .catch(error => {
        handleError({
            error: error,
            callbacks: {
            400: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
            404: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
            423: response=>{ 
              props.enqueueSnackbar(response.data.message, {variant: "error"}); 
          }
            }
        }, props);
    })
    .finally(() => {
        this.setState({isLoading:false});
    })
    e.preventDefault();

};
//   const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
//     mode: 'onChange',
//     defaultValues,
//     // resolver: yupResolver(schema),
//   });


//   function onSubmit(model) {
//     setLoading(true);
//     dispatch(submitLogin(model, setLoading));
//   }

  return (
    		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>

				{/* <Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography> */}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Usename"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
  );
}

const mapDispatchToProps = dispatch => ({
	setSessionToken: token => (dispatch(setSessionToken(token))),
	setIsAuthenticatedStatus: status => (dispatch(setIsAuthenticatedStatus(status))),
	setUserData: user => (dispatch(setUserData(user))),
	setOptions: options => (dispatch(setOptions(options)))
  })
  
  export default connect(null, mapDispatchToProps)(withSnackbar(withRouter(JWTLoginTab)));