
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import axiosConfig from '../../config/axiosConfig';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import "./topbar.css"
import moment from 'moment'
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { NotificationsNone,ExitToApp, AccountCircleOutlined } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { AccountCircleTwoTone } from '@mui/icons-material';


function Features(props) {
    const [dashboard, updateForacceptance] = useState([]);
    const[authvalues, setAuthValues] = useState("fals");
    const[authvaluessuper, setAuthValuessuper] = useState(localStorage.getItem('issuperuser'))
    const[authvalueshead, setAuthValueshead] = useState(localStorage.getItem('ishead'))
    const [listedleaved, updateForhod] = useState([]);
    const [listlen, updateForhodlen] = useState(0);
    const [listedleaves, updateForacceptanced] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hodanchorEl, setAnchorElhod] = React.useState(null);

    useEffect(() => {
      makeRequest(props).get("/hodlist/")
                   
                   .then(response => {
                    // console.log(response)
                    updateForhod(response.data.data)
                    
                    // console.log(listedleaved)

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

    useEffect(() => {
      if (localStorage.getItem('issuperuser') === "true"){
        makeRequest(props).get("/viewpending/")
                   
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
  
    console.log(listedleaved)
    
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


      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
          };

      const handleClicked = (event) => {
        setAnchorElhod(event.currentTarget);
      };

      const handleLogout = () => {
            window.location = axiosConfig.login_url;
            localStorage.clear()
    
            
          };
        
          const handleClose = () => {
            setAnchorEl(null);
          };

          const handleClosed = () => {
            setAnchorElhod(null);
          };


      
          const autorization = () => {
            if (authvaluessuper === "true")
            return                <div className="topbarIconContainer">
           
            <Badge badgeContent={dashboard.pending_leaves} color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
            <NotificationsNone/>
</Badge>
<Menu
     id="simple-menu"
     anchorEl={anchorEl}
     keepMounted
     open={Boolean(anchorEl)}
     onClose={handleClose}
   >
    {
                                  listedleaves.map((marketer, index)=>(
                                    <Link to="/assign">
                                    <MenuItem  onClick={handleClose}> <div className="wdgetsmUser">
                                    <span className="widgetsmUsername"> Username : {marketer.owner.user.username}</span>
                                    <span className="widgetsmsubtitle">{marketer.leave_type} Leave</span>
                                    <span className="widgetsmUsername">{moment(marketer.end_date).diff(marketer.start_date, 'days')} days</span>
                                    {/* <span className="widgetsmUsername">24 - 12 - Jan</span> */}
                                  </div></MenuItem>
                                  </Link>
                                  ))
                              }
{/*        
     <MenuItem onClick={handleClose}>My account</MenuItem>
     <MenuItem onClick={handleClose}>Logout</MenuItem> */}
   </Menu>



            </div>

else if (authvalueshead === "true")
  return                <div className="topbarIconContainer">
 
  <Badge badgeContent={listedleaves.length} color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
  <NotificationsNone/>
</Badge>
<Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
>
{
                        listedleaves.map((marketer, index)=>(
                          <Link to="/assign">
                          <MenuItem  onClick={handleClose}> <div className="wdgetsmUser">
                          <span className="widgetsmUsername"> Username : {marketer.owner.user.username}</span>
                          <span className="widgetsmsubtitle">{marketer.leave_type} Leave</span>
                          <span className="widgetsmUsername">{moment(marketer.end_date).diff(marketer.start_date, 'days')} days</span>
                          {/* <span className="widgetsmUsername">24 - 12 - Jan</span> */}
                        </div></MenuItem>
                        </Link>
                        ))
                    }
{/*        
<MenuItem onClick={handleClose}>My account</MenuItem>
<MenuItem onClick={handleClose}>Logout</MenuItem> */}
</Menu>

      
<Badge badgeContent={listedleaved.length} color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClicked} >
  <AccountCircleOutlined/>
</Badge>
<Menu
id="simple-menu"
anchorEl={hodanchorEl}
keepMounted
open={Boolean(hodanchorEl)}
onClose={handleClosed}
>
{
                        listedleaved.map((marketer, index)=>(
                          <Link to="/hodapprove">
                          <MenuItem  onClick={handleClosed}> <div className="wdgetsmUser">
                          <span className="widgetsmUsername"> Username : {marketer.owner.user.username}</span>
                          <span className="widgetsmsubtitle">{marketer.leave_type} Leave</span>
                          <span className="widgetsmUsername">{moment(marketer.end_date).diff(marketer.start_date, 'days')} days</span>
                        </div></MenuItem>
                        </Link>
                        ))
                    }

</Menu>



  </div>


            else if (authvalues === "fals")
              return                <div className="topbarIconContainer">
             
              <Badge badgeContent={dashboard.notification} color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
              <NotificationsNone/>
</Badge>
<Menu
       id="simple-menu"
       anchorEl={anchorEl}
       keepMounted
       open={Boolean(anchorEl)}
       onClose={handleClose}
     >
      {
                                    listedleaves.map((marketer, index)=>(
                                      <Link to="/assign">
                                      <MenuItem  onClick={handleClose}> <div className="wdgetsmUser">
                                      <span className="widgetsmUsername"> Username : {marketer.owner.user.username}</span>
                                      <span className="widgetsmsubtitle">{marketer.leave_type} Leave</span>
                                      <span className="widgetsmUsername">{moment(marketer.end_date).diff(marketer.start_date, 'days')} days</span>
                                      {/* <span className="widgetsmUsername">24 - 12 - Jan</span> */}
                                    </div></MenuItem>
                                    </Link>
                                    ))
                                }
{/*        
       <MenuItem onClick={handleClose}>My account</MenuItem>
       <MenuItem onClick={handleClose}>Logout</MenuItem> */}
     </Menu>



              </div>
        

          }
  return (
<div className='topbar'>
         <div className="topbarWrapper">
          
             <div className="topLeft">
               <span className="logo">Capital Bancorp PLC</span>
               </div>
             <div className="topRight">

             {autorization()}

               <div className="topbarIconContainer">
               {/* <Settings/> */}
               <Button onClick = {handleLogout} variant="outlined" endIcon={<ExitToApp/>}>
  Logout
</Button>
{/* 
 <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
         Open Menu
      </Button> */}

              </div>

            
            </div>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
    session_token: state.App.session_token,
  
  });
  
  export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
    withRouter(Features))))




// import React from 'react'
// import "./topbar.css"
// // import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import { NotificationsNone,ExitToApp } from '@material-ui/icons';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Badge from '@material-ui/core/Badge';

// export default function Topbar() {
//     const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className='topbar'>
//         <div className="topbarWrapper">
          
//             <div className="topLeft">
//               <span className="logo">Capital Bancorp</span>
//               </div>
//             <div className="topRight">
//               <div className="topbarIconContainer">
              
//               <Badge badgeContent={4} color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
//               <NotificationsNone/>
// </Badge>



//               </div>

//               <div className="topbarIconContainer">
//               {/* <Settings/> */}
//               <Badge badgeContent={4} color="primary">
//               <ExitToApp/>
// </Badge>

// <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
//         Open Menu
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>

//               </div>

            
//             </div>
//         </div>
//     </div>
//   )
// }
