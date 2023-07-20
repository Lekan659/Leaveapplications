import './userlist.css'
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
    {
      field: 'user',
      headerName: 'Username',
      width: 130,
      renderCell: (params) => {
        return params.value.username
},
    },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'last_name', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'assign_days', headerName: 'Leave Day', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        // console.log(params.id)
        return <Button
        onClick={() => handleredirect(params)}>View</Button> ;
      },
    },
  ];
  const [listedleaves, updateForacceptance] = useState([]);
  
  const handleredirect = (index) =>{
    console.log(index)
    window.location =`updateroles/${index.row.user.id}`
  }

  useEffect(() => {
    makeRequest(props).get("/exclusiveusers/")
                 
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
                title="Users List"
                subTitle="Check the details of all Users."
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