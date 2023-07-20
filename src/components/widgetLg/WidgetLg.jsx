// import { Table } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { connect } from 'react-redux';
import moment from 'moment'
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TableHead from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import { 
//   FileCopyRounded as CopyIcon,
//   Check as ApproveIcon, 
//   Cancel as DeclineIcon,
//   Details as DetailsIcon,
// } from '@material-ui/icons'
import TableRow from '@material-ui/core/TableRow';
import './widgetlg.css'

function WidgetLg(props) {
  const [listedleaves, updateForacceptance] = useState([]);
  useEffect(() => {
    makeRequest(props).get("/viewpending/")
                 
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
                    423: response=>{ 
                      props.enqueueSnackbar(response.data.message, {variant: "error"}); 
                  }
                    }
                }, props);
            })
   // GET request using axios inside useEffect React hook
  
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  return (
    // 
      <div className="widgetlg">
        <h3 className="widgetlgTitle">
          Pending Requests
        </h3>

        <Table stickyHeader className="min-w" aria-labelledby="tableTitle">
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
            <TableCell>Leave Type</TableCell>
            <TableCell>Duty</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>End date</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {listedleaves.map((n) => (
              

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
                    {n.leave_type}
                    
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left"> */}
                    <TableCell>
                    {n.duty}
                   
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row"> */}
                    <TableCell>
                     {/* {n.state ? n.state: null } */}
                     {n.reason}
                    </TableCell>
{/* 
                    <TableCell className="p-4 md:p-16" component="th" scope="row"> */}
                    <TableCell>
                    {/* {n.address ? n.address: null }  */}
                    {n.status}
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
                                        {moment.utc(n.end_date).format("ddd, MMM Do YYYY")}
                                        
                                </TableCell>



                  </TableRow>
              ))} 
          </TableBody>
        </Table>
      </div>
  )
  
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(WidgetLg))))

