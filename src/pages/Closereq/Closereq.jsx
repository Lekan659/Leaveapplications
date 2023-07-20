import './leavelist.css'
// import { Table } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PageHeader from "../../components/pageheader/Pageheader";
import { connect } from 'react-redux';
import moment from 'moment';
import ArchiveIcon from '@material-ui/icons/Archive';
import { green, grey,red } from '@material-ui/core/colors';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils';
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableHead from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { RequisitionDetailsDialog, PopoverMenu, IconMenuItem } from '../../components1'

import { 
  FileCopyRounded as CopyIcon,
  Check as ApproveIcon, 
  Cancel as DeclineIcon,
  Details as DetailsIcon,
} from '@material-ui/icons'
// import TablePagination from '@material-ui/core/TablePagination';
// import { 
//   FileCopyRounded as CopyIcon,
//   Check as ApproveIcon, 
//   Cancel as DeclineIcon,
//   Details as DetailsIcon,
// } from '@material-ui/icons'
import TableRow from '@material-ui/core/TableRow';
import './leavelist.css'
import { Button, Paper, TableContainer } from '@material-ui/core';
function Closereq(props) {
  const [load, setLoading] = useState(null);
  const [listedleaves, updateForacceptance] = useState([]);
  const [usedata, setUseData] = useState({});
  const showDetails = (index) =>{
    // console.log(this.state.rows[index])
    setUseData(listedleaves[index])
    console.log(listedleaves[index])
    setLoading(true)
    
  }

  const handleredirect = (index) =>{
    // console.log(this.state.rows[index])
    window.location =`closeby/${listedleaves[index].id}`
  }
  
  useEffect(() => {
    makeRequest(props).get("/financerequisition/")
                 
                 .then(response => {
                  // console.log(response)
                  updateForacceptance(response.data.data)
                  props.enqueueSnackbar("Leave List Successful", {variant:'success'});
              })
                 
              .catch(error => {
                handleError({
                    error: error,
                    callbacks: {
                    400: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
                    404: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); },
                    423: response=>{ props.enqueueSnackbar(response.data.message, {variant: "error"}); }
                    }
                }, props);
            })
   // GET request using axios inside useEffect React hook
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  
  const handlestatus = (index, new_status) =>{
    let tag_word = ""
    let choices = ""
    let finale = ""
    
    if(new_status === "accept"){
        tag_word = "Approve"
        choices = "accepted"
        finale = "Requisition Accepted Successfully"
    }
    else if(new_status === "decline"){
        tag_word = "Decline"
        choices = "declined"
        finale = "Requisition Declined Successfully"
    }

    let transaction = listedleaves[index]
    props.openDialog({
        viewCtrl: "warning",
        title: transaction.transaction_type === 'credit' ? `${tag_word } Credit Transaction` : `${tag_word} Duties`,
        description: "Make sure you have confirmed the details before you continue",
        close: dialog =>{
            dialog.close()
        },
        confirm: dialog =>{
            makeRequest(props).post(`/hodrequisitionaction/${transaction.id}/`,  {
                choice : choices
            })
            .then(response => {
                dialog.setViewCtrl("success")
                dialog.setTitle("Done!")
                dialog.setDescription(finale)
                props.enqueueSnackbar(finale, {variant:'success'})
                window.location.reload();
                
                //Update transaction table row
                // transaction.status = new_status;
                // let updated_rows = this.state.rows;
                // updated_rows[index] = transaction;
                // setState({rows:updated_rows});
                
            })
            .catch(error => {
                handleError({
                    error: error,
                    callbacks: {
                        400: response=>{ 
                          dialog.setViewCtrl("warning")
                          dialog.setTitle("Error!")
                          dialog.setDescription(finale)
                            props.enqueueSnackbar(response.data.message, {variant: "error"}); 
                            dialog.close()
                        },
                        423: response=>{ 
                          dialog.setViewCtrl("warning")
                          dialog.setTitle("Error!")
                          dialog.setDescription(finale)
                            props.enqueueSnackbar(response.data.message, {variant: "error"}); 
                            dialog.close()
                        },
                    }
                }, props);
            })
        }
    })
}

  return (
    // 
      <div className="widgetlg">
        <RequisitionDetailsDialog 
                    open={load} 
                    onClose={() => setLoading(false)}
                    data={ usedata } 
                    
                />

        <PageHeader
                title="Close Requisitions"
                subTitle="Finance Close Requisitions."
                icon={<ArchiveIcon fontSize="large" />}
            />
    <TableContainer component={Paper}>
      
    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        {/* <Table stickyHeader > */}
          {/* <ProductsTableHead
            // selectedProductIds={selected}
            // order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            // rowCount={data.length}
            onMenuItemClick={handleDeselect}
          /> */}

<TableHead>
          <TableRow>
            <TableCell>Payee</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Account NUmber</TableCell>
            <TableCell>Bank Name</TableCell>
                        <TableCell>Department</TableCell>
            <TableCell>Support</TableCell>
            <TableCell>HOD Approval</TableCell>
            <TableCell>AUDIT Approval</TableCell>
                        <TableCell> GMD Approval</TableCell>
            <TableCell> Required Date</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {listedleaves.map((n,index) => (
              

                  <TableRow
                    hover
                    role="checkbox"
                    // aria-checked={isSelected}
                    // tabIndex={-1}
                    // key={n.id}
                    // selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                  >


                    {/* <TableCell className="p-4 md:p-16 truncate" component="th" scope="row"> */}
                    <TableCell>
                    {n.payee}
                    
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left"> */}
                    <TableCell>
                    {n.status}
                   
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row"> */}
                    <TableCell>
                     {/* {n.state ? n.state: null } */}
                     {n.amount}
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row"> */}
                    <TableCell>
                    {/* {n.address ? n.address: null }  */}
                    {n.accountnum}
                    </TableCell>

                    <TableCell>
                    {/* {n.address ? n.address: null }  */}
                    {n.bankname}
                    </TableCell>

                                        <TableCell>
                    {/* {n.address ? n.address: null }  */}
                    {n.creator.department}
                    </TableCell>

                    <TableCell>
                    {n.support_department ? n.support_department: "None" } 
                    </TableCell>


                    <TableCell>
                    {n.is_approved_dept_head ? "Approved": "Declined" } 
                    </TableCell>

                    <TableCell>
                    {n.is_approved_audit ? "Approved": "Declined" } 
                    </TableCell>

                    <TableCell>
                    {n.is_approved ? "Approved": "Declined" } 
                    </TableCell>

                    <TableCell>
                                    {/* <PopoverMenu>
                                        <IconMenuItem 
                                            icon={<DetailsIcon color="primary"/>} 
                                            text="Edit"
                                            // onClick={(event) => handleClick(n.id)}
                                        />
                                        <IconMenuItem 
                                            icon={<DetailsIcon color="primary"/>} 
                                            text="Delete"
                                            // disabled={(n.status === "Pending" || n.status === "Declined" || n.status === "Inactive")}
                                            // onClick={(event) => handleClicked(n.id)}
                                        />
                                    </PopoverMenu> */}
                                        {moment.utc(n.required_date).format("ddd, MMM Do YYYY")}
                                        
                                </TableCell>
                                <TableCell>
                                      <PopoverMenu>
                                          <IconMenuItem 
                                            href='login'
                                            icon={<ApproveIcon style={{color:green[500]}}/>} 
                                            text="Closed By" 
                                            disabled={!(n.status === "Assigned")}
                                            onClick={()=>handleredirect(index)}
                                        />
                                       
                                    </PopoverMenu>
                                    
                                </TableCell>


                  </TableRow>
              ))} 
          </TableBody>
        </Table>
        </TableContainer>
      </div>
  )
  
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(Closereq))))












