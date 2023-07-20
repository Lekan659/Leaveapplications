import './features.css'
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';


function Features(props) {
    const [dashboard, updateForacceptance] = useState([]);
  
    useEffect(() => {
        makeRequest(props).get("/dashboardlisted/")
                     
                     .then(response => {
                      // console.log(response)
                      updateForacceptance(response.data.data)
                      props.enqueueSnackbar("Dashboard Values Successful", {variant:'success'});
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
    <div className='features'>
        <div className="featuredItem">
            <span className="featuredTitle">Leave days</span>
                <div className="featuredContainer">
                    <span className="featuredValue">
                   {dashboard.useres}
                    </span>
                </div>
            
            <span className="featuredSubtitle">
                Total Days
            </span>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">Assigned Duties</span>
                <div className="featuredContainer">
                    <span className="featuredValue">
                    {dashboard.assigned_leaves}
                    </span>
                </div>
            
            <span className="featuredSubtitle">
                Total Staff
            </span>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">Pending Requests</span>
                <div className="featuredContainer">
                    <span className="featuredValue">
                    {dashboard.pending_leaves}
                    </span>
                </div>
            
            <span className="featuredSubtitle">
                View Staffs
            </span>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">Approved Requests</span>
                <div className="featuredContainer">
                    <span className="featuredValue">
                    {dashboard.year_approved_leaves}
                    </span>
                </div>
            
            <span className="featuredSubtitle">
                View Requests
            </span>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
    session_token: state.App.session_token,
  
  });
  
  export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
    withRouter(Features))))
