import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { TextField,MenuItem } from '@material-ui/core';
  import PageHeader from "../../components/pageheader/Pageheader";
  import { Grid, } from '@material-ui/core';
  // import { useHistory } from 'react-router-dom';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { connect } from 'react-redux';
import { makeRequest, handleError} from '../../utils/axios-helper';
import {withSnackbar} from 'notistack';
import { withConfirmationDialog} from '../../utils'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { useParams } from "react-router-dom";
  import "./profile.css";

function Closeby(props) {
  const initialFormData = Object.freeze({
    leave_type: '',
    start_date: '',
    end_date: '',
    //report_to: "",
    duty: '',
    reason: '',
    comment: '',
    category:'Requisition'
    
  
  });
  const [formData, updateFormData] = useState(initialFormData);
  const[authvalues, setAuthValues] = useState(false)
  const[authvaluessuper, setAuthValuessuper] = useState(localStorage.getItem('isrole'))
  // const [formData, updateFormData] = useState(initialFormData);
  const [picData, updatePicData] = useState(null);
  const [dashboard, updateForprofile] = useState([]);
  const { id } = useParams()
  const [dashboards, updateForacceptance] = useState([]);
  const [flashdashboards, updateForacceptanced] = useState([]);
  
  useEffect(() => {
      makeRequest(props).get("/dashboardlisted/")
                   
                   .then(response => {
                    // console.log(response)
                    console.log(id)
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

    useEffect(() => {
      makeRequest(props).get("/exclusiveusers/")
                   
                   .then(response => {
                    console.log(response)
                    updateForacceptanced(response.data.data)
                    props.enqueueSnackbar("Users Gotten Successfully", {variant:'success'});
                })
                   
    }, []);
    
  
  useEffect(() => {
      makeRequest(props).get("/profileview/")
                   
                   .then(response => {
                    // console.log(response)
                    updateForprofile(response.data.data[0])
                    props.enqueueSnackbar("Profile Generated Successfully", {variant:'success'});
                    setAuthValues(response.data.data[0].is_head)
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

    const autorization = () => {
      if (authvalues === true)
        return <div className="userShowInfo">
        <PermIdentity className="userShowIcon" />
        <span className="userShowInfoTitle">Head Of Department {dashboard.department}</span>
      </div>
  
      else{
  
      }
    }

    
// const handleChange = (e) => {
//   updateFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// }; 

const handleImageChange = (e) => {
  updatePicData({
    ...picData,
    image: e.target.files,
  });
};

// const autorizationnewusers = () => {
//   if (authvaluessuper !== 'staff')
//     return                <div className="userUpdateRight">
//     <div className="userUpdateUpload">
//     </div>
//     <button className="userUpdateButton" onClick={downloadcsvall}>Generate All Report</button>
//   </div>
// }


const handleChange = (e) => {
  updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const config = {
  responseType: 'blob' 
  };


const handleSubmit = (e) => {
	e.preventDefault();
	console.log(formData);

  makeRequest(props).post(`/assigneeaction/${id}/`, formData)
    //axios.post(baseURL,data)
    .then(response => {
		
        props.enqueueSnackbar("Requisition Assigned Successfully", {variant:'success'});
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


  return (
    <div className="user">
        <PageHeader
                title="Assign Requisition"
                subTitle="Assign Requisitions to the account department."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />      
        {/* <div className="userTitleContainer">
    <h1 className="userTitle">Edit User</h1>
    <Link to="/newUser">
      <button className="userAddButton">Create</button>
    </Link>
  </div> */}
  <div className="userContainer">
    
    <div className="userShow">
      <div className="userShowTop">
        <img
          src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="userShowImg"
        />
        <div className="userShowTopTitle">
          <span className="userShowUsername">{dashboard.first_name} {dashboard.last_name}</span>
          <span className="userShowUserTitle">{dashboard.department} Department</span>
        </div>
      </div>
      <div className="userShowBottom">
        <span className="userShowTitle">Account Details</span>
        <div className="userShowInfo">
          <PermIdentity className="userShowIcon" />
          <span className="userShowInfoTitle">{dashboards.uusername}</span>
        </div>
        {autorization()}
        {/* <div className="userShowInfo">
          <CalendarToday className="userShowIcon" />
          <span className="userShowInfoTitle">10.12.1999</span>
        </div> */}
        <span className="userShowTitle">Contact Details</span>
        {/* <div className="userShowInfo">
          <PhoneAndroid className="userShowIcon" />
          <span className="userShowInfoTitle">+1 123 456 67</span>
        </div> */}
        <div className="userShowInfo">
          <MailOutline className="userShowIcon" />
          <span className="userShowInfoTitle">{dashboard.email ? (dashboard.email ) : ("Input Email")}</span>
        </div>
       
      </div>
    </div>
    <div className="userUpdate">
      <span className="userUpdateTitle">User To Close Requisition</span>
      <form className="userUpdateForm">
        <div className="userUpdateLeft">
          {/* <div className="userUpdateItem">
            <label>First Name</label>
            <input
            name = "first_name"
              value={formData.first_name} 
              onChange={handleChange}
              type="text"
              placeholder="Anna Becker"
              className="userUpdateInput"
            />
          </div> */}
          <div className="userUpdateItem">
            {/* <label>Assign to</label> */}
            {/* <input
            type="file"
            name="image"
            accept='.pdf,.doc,.ppt'  
            onClick={() => showDetails}
              className="userUpdateInput"
            /> */}

                <div style={{opacity:'0'}}>
                sgajydgayjfajysdfatdfasdyjfsdyfadgtadgdfathsdfg
                </div>

<TextField 
                                fullWidth required 
                                value={formData.accepted_by}
                                name="accepted_by" 
                                label="Close Requisition"
                                //id="input-name"
                                // type="number"
                                variant="outlined" 
                                select
                                onChange={handleChange}
                                helperText={"Select User"}
                            >
                                {
                                    flashdashboards.map((marketer, index)=>(
                                        <MenuItem value={marketer.user.id}>{marketer.user.username}</MenuItem>
                                    ))
                                }
                            </TextField>

      <TextField
            variant="outlined"
            name="comment"
            label="Comment"
            value={formData.comment} 
            onChange={handleChange}
            
            // {...(error && {error:true,helperText:error})}
        />



          </div>

          {/* <div className="userUpdateItem">
            <label>Email</label>
            <input
            name = "email"
            value={formData.email} 
            onChange={handleChange}
              type="text"
              placeholder="annabeck99@gmail.com"
              className="userUpdateInput"
            />
          </div> */}
        </div>
        <div className="userUpdateRight">
          <div className="userUpdateUpload">
          </div>
          <button className="userUpdateButton" onClick={handleSubmit}>Close By</button>

        </div>



      </form>
    </div>
  </div>
  </div>
  )
}

const mapStateToProps = state => ({
  session_token: state.App.session_token,

});

export default connect(mapStateToProps)(withSnackbar(withConfirmationDialog(
  withRouter(Closeby))))



//   import { useState } from 'react';

// function MyForm() {
//     const [formData, setFormData] = useState(new FormData());

//     function handleSubmit(event) {
//         event.preventDefault();

//         fetch('/api/upload', {
//             method: 'POST',
//             body: formData,
//         });
//     }

//     function handleFileChange(event) {
//         setFormData(new FormData(event.target.files[0]));
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <FileInput type="file" accept="image/*" onChange={handleFileChange} />
//             <button type="submit">Upload</button>
//         </form>
//     );
// }

// import { useState } from 'react';

// function MyForm() {
//     const [formData, setFormData] = useState(new FormData());

//     function handleSubmit(event) {
//         event.preventDefault();

//         fetch('/api/upload', {
//             method: 'POST',
//             body: formData,
//         });
//     }

//     function handleFileChange(event) {
//         setFormData(new FormData(event.target.files[0]));
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <FileInput type="file" accept="image/*" onChange={handleFileChange} />
//             <button type="submit">Upload</button>
//         </form>
//     );
// }

