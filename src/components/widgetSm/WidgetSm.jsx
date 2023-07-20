import { Button } from '@material-ui/core'
import './widgetsm.css'
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import axiosConfig from '../../config/axiosConfig';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment'
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { SavingsTransactionDetailsDialog } from '../../components1'


function WidgetSm(props) {
  const [load, setLoading] = useState(null);
  // const [usedata, setUseData] = useState({});
  const [listedleaves, updateForacceptanced] = useState([]);
  const[authvaluessuper, setAuthValuessuper] = useState(localStorage.getItem('issuperuser'))
  const [usedata, setUseData] = useState({});
  const showDetails = (index) =>{
    // console.log(this.state.rows[index])
    setUseData(listedleaves[index])
    console.log(listedleaves[index])
    setLoading(true)
    
  }

  useEffect(() => {
    if (authvaluessuper === "true"){
      makeRequest(props).get("/usersleave/")
                 
      .then(response => {
       // console.log(response)
       updateForacceptanced(response.data.data)
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
    }

  else{
    makeRequest(props).get("/unattendedlist/")
               
    .then(response => {
     // console.log(response)
     updateForacceptanced(response.data.data)
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
  }

  }, []);
  
  return (
    <>
          <SavingsTransactionDetailsDialog 
                    open={load} 
                    onClose={() => setLoading(false)}
                    data={ usedata } 
                    
                />
    <div className="widgetsm">
      {/* <span className="widgetsmTitle">
        
      </span> */}
      <h3 className="widgetlgTitle">
      Staffs On Leave
        </h3>
      <ul className="widgetsmList">
      { listedleaves ? (
                                    listedleaves.map((marketer, index)=>(


                                   
                              

        <li onClick={() => showDetails(index)} className="widgetsmlistItems">
        <div className="wdgetsmUser">
                                      <span className="widgetsmUsername"> Username : {marketer.owner.user.username}</span>
                                      <span className="widgetsmsubtitle">{marketer.leave_type} Leave</span>
                                      <span className="widgetsmUsername">{moment(marketer.end_date).diff(marketer.start_date, 'days')} days</span>
                                      {/* <span className="widgetsmUsername">24 - 12 - Jan</span> */}
                                    </div>
          <Button
          onClick={() => setLoading(true)}>View</Button>
        </li>



                  ))
                  ):(
                    <h1 className="widgetlgTitle">
       No Staffs On Leave
        </h1>
                  ) }

      </ul>
      
    </div>
    </>
  )
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(WidgetSm))))

