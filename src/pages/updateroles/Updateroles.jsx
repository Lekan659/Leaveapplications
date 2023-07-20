import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import PageHeader from "../../components/pageheader/Pageheader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { TextField,MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Controls from "../../components/controls/Controls";
  import "./profile.css";

  const staffroles = [
    { id: "gmd" , title: 'Gmd' },
    { id: "hod", title: 'Hod' },
    { id: "cfo", title: 'Cfo' },
    { id: "hr", title: 'Hr' },
    { id: "audit", title: 'Audit' },
    { id: "staff", title: 'Staff' },
    { id: "Bsl", title: 'Bsl' },
    { id: "Bfl", title: 'Bfl' },
  ]
  
  const genderItems = [
    { id: "true" , title: 'True' },
    { id: "false", title: 'False' },
  ]
  

function Updateroles(props) {
  const initialFormData = Object.freeze({  
    department: '',
    roles: "",
    head: ""
  });
  const[authvalues, setAuthValues] = useState(false)
  const [formData, updateFormData] = useState(initialFormData);
  const [dashboard, updateForprofile] = useState([]);
  const { id } = useParams()
  const [dashboards, updateForacceptance] = useState([]);

  const [foracceptance, updateForacceptancedept] = useState([]);



  useEffect(() => {
    makeRequest(props).get("/department/departmentview/")
                 
                 .then(response => {
                  console.log(response)
                  updateForacceptancedept(response.data.data)
                  props.enqueueSnackbar("Departments Gotten Successfully", {variant:'success'});
              })
                 
  }, []);


  // useEffect(() => {
  //     makeRequest(props).get("/dashboardlisted/")
                   
  //                  .then(response => {
  //                   // console.log(response)
  //                   updateForacceptance(response.data.data)
  //                   props.enqueueSnackbar("Dashboard Values Successful", {variant:'success'});
  //               })
                   
  //               .catch(error => {
  //                 handleError({
  //                     error: error,
  //                     callbacks: {
  //                     400: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
  //                     404: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
  //                     423: response=>{ 
  //                       props.enqueueSnackbar(response.data.message, {variant: "error"}); 
  //                   }
  //                     }
  //                 }, props);
  //             })
  //    // GET request using axios inside useEffect React hook
    
  //   // empty dependency array means this effect will only run once (like componentDidMount in classes)
  //   }, []);
  
  useEffect(() => {
      makeRequest(props).get(`/personalview/${id}/`)
                   
                   .then(response => {
                    // console.log(response)
                    updateForprofile(response.data.data[0])
                    props.enqueueSnackbar("Profile Generated Successfully", {variant:'success'});
                    // updateForacceptance(dashboard.user)
                    // setAuthValues(response.data.data[0].is_head)
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
     // GET request using axios inside useEffect React hook
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

      
  useEffect(() => {
    makeRequest(props).get(`/personalview/${id}/`)
                 
                 .then(response => {
                  // console.log(response)
                  updateForacceptance(response.data.data[0].user.username)
                  props.enqueueSnackbar("Profile Generated Successfully", {variant:'success'});
                  console.log(response.data.data[0].user.username)
                  // updateForacceptance(dashboard.user)
                  setAuthValues(response.data.data[0].is_head)
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
   // GET request using axios inside useEffect React hook
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

    const autorization = () => {
      if (authvalues === true)
        return <div className="userShowInfo">
        <PermIdentity className="userShowIcon" />
        <span className="userShowInfoTitle">Head Of Department {dashboard.department}</span>
      </div>
  
      else{
  
      }
    }

    
const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

 makeRequest(props).post(`/updateroles/${id}/`, formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Profile Update Successful", {variant:'success'});
        window.location.reload();
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

};

  return (
    <div className="user">
        <PageHeader
                title="Profile"
                subTitle="View and update your user details."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />      
        {/* <div className="userTitleContainer">
    <h1 className="userTitle">Edit User</h1>
    <Link to="/newUser">
      <button className="userAddButton">Create</button>
    </Link>
  </div> */}
  <div className="userContainer">
    
    <div className="userShow">
      <div className="userShowTop">
        <img
          src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="userShowImg"
        />
        <div className="userShowTopTitle">
          <span className="userShowUsername">{dashboard.first_name} {dashboard.last_name}</span>
          <span className="userShowUserTitle">{dashboard.department} Department</span>
        </div>
      </div>
      <div className="userShowBottom">
        <span className="userShowTitle">Account Details</span>
        <div className="userShowInfo">
          <PermIdentity className="userShowIcon" />
          <span className="userShowInfoTitle">{dashboards}</span>
        </div>

        <div className="userShowInfo">
          <PermIdentity className="userShowIcon" />
          <span className="userShowInfoTitle">{dashboard.roles}</span>
        </div>
        {autorization()}
        {/* <div className="userShowInfo">
          <CalendarToday className="userShowIcon" />
          <span className="userShowInfoTitle">10.12.1999</span>
        </div> */}
        <span className="userShowTitle">Contact Details</span>
        {/* <div className="userShowInfo">
          <PhoneAndroid className="userShowIcon" />
          <span className="userShowInfoTitle">+1 123 456 67</span>
        </div> */}
        <div className="userShowInfo">
          <MailOutline className="userShowIcon" />
          <span className="userShowInfoTitle">{dashboard.email ? (dashboard.email ) : ("Input Email")}</span>
        </div>
       
      </div>
    </div>
    <div className="userUpdate">
      <span className="userUpdateTitle">Edit</span>
      <form className="userUpdateForm">
        <div className="userUpdateLeft">
          <div className="userUpdateItem">
            <label>Roles</label>
                <Controls.RadioGroup
                      name="roles"
                      label="Roles"
                      //value={values.leave_type}
                      onChange={handleChange}
                      items={staffroles}
                  />

          </div>
          <div className="userUpdateItem">
            <label>Department</label>
            <TextField 
                                fullWidth required 
                                value={formData.department}
                                name="department" 
                                label="Department"
                                //id="input-name"
                                // type="number"
                                variant="outlined" 
                                select
                                onChange={handleChange}
                                helperText={"Selece Department"}
                            >
                                {
                                    foracceptance.map((marketer, index)=>(
                                        <MenuItem value={marketer.name}>{marketer.name}</MenuItem>
                                    ))
                                }
                            </TextField>
          </div>
          <div className="userUpdateItem">
            <label>Email</label>
            <Controls.RadioGroup
                      name="head"
                      label="Head Of Department"
                      //value={values.leave_type}
                      onChange={handleChange}
                      items={genderItems}
                  />

          </div>
        </div>
        <div className="userUpdateRight">
          <div className="userUpdateUpload">
          </div>
          <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
        </div>
      </form>
    </div>
  </div>
  </div>
  )
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(Updateroles))))
