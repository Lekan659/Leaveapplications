import './leavelist.css'
import PageHeader from "../../components/pageheader/Pageheader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { DataGrid } from '@material-ui/data-grid'
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import moment from 'moment'
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { RequisitionDetailsDialog } from '../../components1'
import { userData } from '../../dummyData'
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

function Gmdallrequisition(props) {
  const [load, setLoading] = useState(null);
  const [usedata, setUseData] = useState({});

  const showDetails = (index) =>{
    // console.log(this.state.rows[index])
    setUseData(index.row)
    // console.log(index.row)
    setLoading(true)
    
  }
  const columns = [
    { field: 'id', headerName: 'Tnxid', width: 120 },
    { field: 'payee', headerName: 'Payee', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'accountnum', headerName: 'Account Number', width: 125 },
    { field: 'bankname', headerName: 'Bank Name', width: 125 },
    { field: 'created', headerName: 'Created', width: 125 },
    {
      field: 'created',
      headerName: 'Created',
      width: 160,
      renderCell: (params) => {
        // return moment.utc(params.value).format("MMM Do YYYY")
        return params.value
},
    }, 
    { field: 'status', headerName: 'Status', width: 125 },
    {
      field: 'is_approved_audit',
      headerName: 'Audit Approved',
      width: 160,
      renderCell: (params) => {
        return params.value == 'True' ? "Approved": "Declined"
},
    },   
    {
      field: 'is_approved_finance',
      headerName: 'Finance Approved',
      width: 160,
      renderCell: (params) => {
        return params.value == 'True' ? "Approved": "Declined"
},
    },   
    {
      field: 'is_approved_dept_head',
      headerName: 'HOD Approved',
      width: 160,
      renderCell: (params) => {
        return params.value == 'True' ? "Approved": "Declined"
},
    },
    {
      field: 'is_approved_hr',
      headerName: 'HR Approved',
      width: 160,
      renderCell: (params) => {
        return params.value == 'True' ? "Approved": "Declined"
},
    },
    {
      field: 'is_approved_md',
      headerName: 'GMD Approved',
      width: 160,
      renderCell: (params) => {
        return params.value == 'True' ? "Approved": "Declined"
},
    },    
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        // console.log(params.id)
        return <Button
        onClick={() => showDetails(params)}>View</Button> ;
      },
    },
  ];
  const [listedleaves, updateForacceptance] = useState([]);
  
  useEffect(() => {
    makeRequest(props).get("/allmaderequisition/")
                 
                 .then(response => {
                  // console.log(response)
                  updateForacceptance(response.data.data)
                  props.enqueueSnackbar("Leave Lists Gotten Successfully", {variant:'success'});
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

  // showDetails = (index) =>{
  //   console.log(this.state.rows[index])
  //   this.setState({
  //       crate: true,
  //       open: true,
  //       selectedTransaction: this.state.rows[index],
        
  //   })}

  return (
    <div className="leavelist">
      <RequisitionDetailsDialog 
                    open={load} 
                    onClose={() => setLoading(false)}
                    data={ usedata } 
                    
                />
                    <PageHeader
                title="Requsitions List"
                subTitle="Check the status and details of your requisitions."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
    <DataGrid
        rows={listedleaves}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
</div>
  )
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(Gmdallrequisition))))