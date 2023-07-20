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
  { id: true , title: 'True' },
  { id: false, title: 'False' },
]



function Deductuser(props) {
  const initialFormData = Object.freeze({  
    first_name: '',
    last_name: "",
    email: "",

  });
  const[authvalues, setAuthValues] = useState(false)
  const [formData, updateFormData] = useState(initialFormData);
  const [dashboard, updateForprofile] = useState([]);

  const [foruser, updateForuser] = useState([]);

useEffect(() => {
  makeRequest(props).get("/allusers/")
               
               .then(response => {
                console.log(response)
                updateForuser(response.data.data)
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

    
const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

 makeRequest(props).post("/deductnodays/", formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Deduction Successful", {variant:'success'});
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
              title="Deduct Leave Days"
              subTitle="Deduct leave days in accordance to the remaining leave days of staff."
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
        </CardHeader>
        <CardBody>
          <Form>
          <Grid container>
              <Grid item xs={6}>
              <TextField 
                                fullWidth required 
                                value={formData.user_profile}
                                name="user_profile" 
                                label="Users"
                                //id="input-name"
                                // type="number"
                                variant="outlined" 
                                select
                                onChange={handleChange}
                                helperText={"Select Users"}
                            >
                                {
                                    foruser.map((marketer, index)=>(
                                      <MenuItem value={marketer.id}>{marketer.username}</MenuItem>
                                    ))
                                }
                            </TextField>


{/* <TextField
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
                  /> */}

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
          name="deduction"
          label="Deductions"
          value={formData.deduction} 
          onChange={handleChange}
          helperText={"Pick the number of days between 1 and remaining leave days of the staffs"}
          
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
withRouter(Deductuser))))
