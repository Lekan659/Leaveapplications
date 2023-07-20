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
  { id: 'Bsl', title: 'Bancorp Securities Limited' },
  { id: 'Bfl', title: 'Bancorp Finance Limited' },
  { id: 'None', title: 'Capital Bancorp' },
]

function Requisitions(props) {
const initialFormData = Object.freeze({
  leave_type: '',
  start_date: '',
  end_date: '',
  //report_to: "",
  duty: '',
  reason: '',
  category:'Requisition'
  

});
const [formData, updateFormData] = useState(initialFormData);
const [foracceptance, updateForacceptance] = useState([]);

useEffect(() => {
  makeRequest(props).get("/deptusers/")
               
               .then(response => {
                console.log(response)
                updateForacceptance(response.data.data)
                props.enqueueSnackbar("Users Gotten Successfully", {variant:'success'});
            })
               
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

 makeRequest(props).post("/createrequisition/", formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Requisition Created Successful", {variant:'success'});
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
                title="Requisition "
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
            label="Required Date"
            name="required_date"
            value={formData.required_date} 
            onChange={handleChange}
            type = "date"
            // {...(error && {error:true,helperText:error})}
        />




<TextField
            variant="outlined"
            name="amount"
            label="Amount"
            value={formData.amount} 
            onChange={handleChange}
        />

<TextField
            variant="outlined"
            name="payee"
            label="Payee"
            value={formData.payee} 
            onChange={handleChange}
            
            // {...(error && {error:true,helperText:error})}
        />

<TextField
            variant="outlined"
            name="bankname"
            label="Bankname"
            value={formData.bankname} 
            onChange={handleChange}
            
            // {...(error && {error:true,helperText:error})}
        />

<TextField
            variant="outlined"
            name="accountnum"
            label="Account number"
            value={formData.accountnum} 
            onChange={handleChange}
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
                                fullWidth required 
                                value={formData.accepted_by}
                                name="accepted_by" 
                                label="Approved By"
                                //id="input-name"
                                // type="number"
                                variant="outlined" 
                                select
                                onChange={handleChange}
                                helperText={"Selece your Head Of Department"}
                            >
                                {
                                    foracceptance.map((marketer, index)=>(
                                        <MenuItem value={marketer.user.id}>{marketer.user.username}</MenuItem>
                                    ))
                                }
                            </TextField>

                </Grid>
                <Grid item xs={6}>
                <Controls.RadioGroup
                        name="supportreq"
                        label="Support Request"
                        //value={values.leave_type}
                        onChange={handleChange}
                        items={genderItems}
                    />

                <Controls.Textarea
                        name="description"
                        label="Description"
                        //value={values.reason}
                        onChange={handleChange}
                        // error={errors.fullName}
                    />
                <Controls.Textarea
                        name="comment"
                        label="Comment"
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
  withRouter(Requisitions))))