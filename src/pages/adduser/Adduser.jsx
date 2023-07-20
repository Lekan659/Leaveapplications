import PageHeader from "../../components/pageheader/Pageheader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { useTheme } from '@material-ui/core/styles';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/newform/useForm';
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';


import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import { TextField,MenuItem } from '@material-ui/core';
import "./profileuser.css";

const genderItems = [
  { id: "true" , title: 'True' },
  { id: "false", title: 'False' },
]

const valuesdays = [
  { id: "25" , title: 'Senior Staff' },
  { id: "22", title: 'Junior Staff' },
  { id: "15", title: 'Driver' },
]

const staffroles = [
  { id: "gmd" , title: 'Gmd' },
  { id: "hod", title: 'Hod' },
  { id: "hr", title: 'Hr' },
  { id: "cfo", title: 'Cfo' },
  { id: "audit", title: 'Audit' },
  { id: "staff", title: 'Staff' },
  { id: "Bsl", title: 'Bsl' },
  { id: "Bfl", title: 'Bfl' },
]



function Adduser(props) {
  const initialFormData = Object.freeze({  
    first_name: '',
    last_name: "",
    email: "",

  });
  const[authvalues, setAuthValues] = useState(false)
  const [formData, updateFormData] = useState(initialFormData);
  const [dashboard, updateForprofile] = useState([]);

  const [foracceptance, updateForacceptance] = useState([]);

useEffect(() => {
  makeRequest(props).get("/acceptingusers/")
               
               .then(response => {
                console.log(response)
                updateForacceptance(response.data.data)
                props.enqueueSnackbar("Users Gotten Successfully", {variant:'success'});
            })
               
    //    .catch(error => {
    //      handleError({
    //        error: error,
    //        callbacks: {
    //            400: response=>{ 
    //              props.enqueueSnackbar(response.data.message, {variant: "error"});
                   
    //            },
    //            423: response=>{ 
    //                props.enqueueSnackbar( {variant: "error"}); 
                  
    //            },
               
    //        }
    //    }, props);
    // })
 // GET request using axios inside useEffect React hook

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

  // const [dashboards, updateForacceptance] = useState({});
  
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
      makeRequest(props).get("/department/departmentview/")
                   
                   .then(response => {
                    console.log(response)
                    updateForacceptance(response.data.data)
                    props.enqueueSnackbar("Departments Gotten Successfully", {variant:'success'});
                })
                   
    }, []);
    
  useEffect(() => {
      makeRequest(props).get("/profileview/")
                   
                   .then(response => {
                    // console.log(response)
                    updateForprofile(response.data.data[0])
                    props.enqueueSnackbar("Profile Generated Successfully", {variant:'success'});
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



    
const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

 makeRequest(props).post("/create/", formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Profile Creation Successful", {variant:'success'});
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
  <div className='leave'> 
  <Container className="mt--7" fluid>
  <Row className="row">
    {/* <br/><br/><br/><br/><br/> */}
    <Col>
      <Card className="bg-secondary shadow">
        <CardHeader>
          <PageHeader
              title="Add User"
              subTitle="Create New User."
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
        </CardHeader>
        <CardBody>
          <Form>
          <Grid container>
              <Grid item xs={6}>
              <TextField
          variant="outlined"
          name="last_name"
          label="Last Name"
          value={formData.last_name} 
          onChange={handleChange}
          
      />

<TextField
          variant="outlined"
          name="first_name"
          label="First Name"
          value={formData.first_name} 
          onChange={handleChange}
          
      />

<TextField
          variant="outlined"
          name="email"
          label="Email"
          value={formData.email} 
          onChange={handleChange}
          type = "email"
          
      />
<Controls.RadioGroup
                      name="head"
                      label="Head Of Department"
                      //value={values.leave_type}
                      onChange={handleChange}
                      items={genderItems}
                  />

<Controls.RadioGroup
                      name="assigned"
                      label="Designation"
                      //value={values.leave_type}
                      onChange={handleChange}
                      items={valuesdays}
                  />



{/* <Controls.Select
                      
                      //value={values.departmentId}
                      onChange={handleChange}
                      options={genderItems}
                      // error={errors.departmentId}
                  /> */}

{/* <Controls.Select
                      name="accepted_by"
                      label="Report To"
                      //value={formData.report_to} 
                      onChange={handleChange}
                      options={genderItems}
                      // error={errors.departmentId}
                  /> */}




              </Grid>
              <Grid item xs={6}>
              <TextField
          variant="outlined"
          name="username"
          label="Username"
          value={formData.username} 
          onChange={handleChange}
          
      />
               <TextField
          variant="outlined"
          name="password"
          label="Password"
          value={formData.password} 
          onChange={handleChange}
          
      />

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

                <Controls.RadioGroup
                      name="roles"
                      label="Roles"
                      //value={values.leave_type}
                      onChange={handleChange}
                      items={staffroles}
                  />



                  <div>
                      <Controls.Button
                          type="submit"
                          text="Submit"
                          onClick={handleSubmit} />
                      {/* <Controls.Button
                          text="Reset"
                          color="default"
                          onClick={resetForm} /> */}
                  </div>
              </Grid>
          </Grid>
      </Form>
        </CardBody>
      </Card>
    </Col>
  </Row>
  </Container>
  </div>
)
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
withRouter(Adduser))))
