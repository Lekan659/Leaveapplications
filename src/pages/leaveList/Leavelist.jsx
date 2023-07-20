import './leavelist.css'
import PageHeader from "../../components/pageheader/Pageheader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { DataGrid } from '@material-ui/data-grid'
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { SavingsTransactionDetailsDialog } from '../../components1'
import { userData } from '../../dummyData'

  

function Leavelist(props) {
  const [load, setLoading] = useState(null);
  const [usedata, setUseData] = useState({});

  const showDetails = (index) =>{
    // console.log(this.state.rows[index])
    setUseData(index.row)
    console.log(index.row)
    setLoading(true)
    
  }
  const columns = [
    { field: 'index', headerName: 'ID', width: 70 },
    { field: 'leave_type', headerName: 'Leave Type', width: 130 },
    { field: 'reason', headerName: 'Reason', width: 130 },
    // { field: 'approved_by', headerName: 'Releive Colleague', width: 130 },
    {
      field: 'accepted_by',
      headerName: 'Releive Colleague',
      width: 130,
      renderCell: (params) => {
        return params.value ? params.value.first_name : "None"
},
    }, 

    {
      field: 'approved_by',
      headerName: 'Releive Colleague',
      width: 130,
      renderCell: (params) => {
        return params.value ? params.value.first_name : "None"
},
    }, 
    { field: 'start_date', headerName: 'Start Date', width: 130 },
    { field: 'end_date', headerName: 'End Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
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
    makeRequest(props).get("/viewrequests/")
                 
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
      <SavingsTransactionDetailsDialog 
                    open={load} 
                    onClose={() => setLoading(false)}
                    data={ usedata } 
                    
                />
                    <PageHeader
                title="Leave List"
                subTitle="Check the status and details of your leave requests."
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
  withRouter(Leavelist))))