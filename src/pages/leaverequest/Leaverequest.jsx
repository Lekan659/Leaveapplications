import './leaverequest.css'
import { FormControl, InputLabel, Select as MuiSelect, FormHelperText } from '@material-ui/core';
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

const genderItems = [
  { id: 'Sick', title: 'Sick' },
  { id: 'Annual', title: 'Annual' },
  { id: 'Maternity', title: 'Maternity' },
  { id: 'Exam', title: 'Exam' },
  { id: 'Others', title: 'Others' },
]

function Leaverequest(props) {
const initialFormData = Object.freeze({
  leave_type: '',
  start_date: '',
  end_date: '',
  //report_to: "",
  duty: '',
  reason: '',
  

});
const [formData, updateFormData] = useState(initialFormData);
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


const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

 makeRequest(props).post("/leavescreate/", formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Leave Created Successful", {variant:'success'});
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

  const theme = useTheme();
  return (
    <div className='leave'> 
    <Container className="mt--7" fluid>
    <Row className="row">
      {/* <br/><br/><br/><br/><br/> */}
      <Col>
        <Card className="bg-secondary shadow">
          <CardHeader>
            <PageHeader
                title="Leave "
                subTitle="Fill up the form with the appropriate details."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
          </CardHeader>
          <CardBody>
            <Form>
            <Grid container>
                <Grid item xs={6}>
            <TextField
            variant="outlined"
            label="Start Date"
            name="start_date"
            value={formData.dateOfBirth} 
            onChange={handleChange}
            type = "date"
            // {...(error && {error:true,helperText:error})}
        />

          <TextField
            variant="outlined"
            label="End Date"
            name="end_date"
            value={formData.end_date} 
            onChange={handleChange}
            type = "date"
            // {...(error && {error:true,helperText:error})}
        />
<Controls.RadioGroup
                        name="leave_type"
                        label="Leave Type"
                        //value={values.leave_type}
                        onChange={handleChange}
                        items={genderItems}
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

<TextField
            variant="outlined"
            name="report_to"
            label="Report To"
            value={formData.report_to} 
            onChange={handleChange}
            
            // {...(error && {error:true,helperText:error})}
        />
<TextField 
                                fullWidth required 
                                value={formData.accepted_by}
                                name="accepted_by" 
                                label="Relieve Colleague"
                                //id="input-name"
                                // type="number"
                                variant="outlined" 
                                select
                                onChange={handleChange}
                                helperText={"Select your Relieve Officer"}
                            >
                                {
                                    foracceptance.map((marketer, index)=>(
                                        <MenuItem value={marketer.id}>{marketer.username}</MenuItem>
                                    ))
                                }
                            </TextField>

                </Grid>
                <Grid item xs={6}>
                <Controls.Textarea
                        name="reason"
                        label="Reason"
                        //value={values.reason}
                        onChange={handleChange}
                        // error={errors.fullName}
                    />
                <Controls.Textarea
                        name="duty"
                        label="Duty"
                        //value={values.duty}
                        onChange={handleChange}
                        // error={errors.fullName}
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
  withRouter(Leaverequest))))