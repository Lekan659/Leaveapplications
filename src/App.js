import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import "./app.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { useState } from 'react'

import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
// import  useLocation  from 'react-router-dom'
import Leaverequest from "./pages/leaverequest/Leaverequest";
import Leavelist from "./pages/leaveList/Leavelist";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";

import { SnackbarProvider} from 'notistack';
import AssignLg from "./pages/assignedleave/AssignLg";
import ApproveLg from "./pages/approveleave/ApproveLg";
import Adduser from "./pages/adduser/Adduser";
import Deductuser from "./pages/deductuser/Deductuser";
import Userlist from "./pages/userlist/Userlist";
import Requisitions from "./pages/requisitions/Requisitions";
import Requisitionlist from "./pages/requisitionlist/ApproveLg";
import Auditrequisition from "./pages/auditrequisitionlist/Auditrequisition";
import Gmdrequisition from "./pages/gmdrequisitionlist/Gmdrequisition";
import Hodrequisition from "./pages/hodrequisitionlist/Hodrequisition";
import Cforequisition from "./pages/cforequisitionlist/Cforequisition";
import Hodallreq from "./pages/hodallrequisition/Hodallreq";
import Personalallrequisition from "./pages/personalallrequisition/Personalallrequisition";
import Gmdallrequisition from "./pages/gmdallrequisition/Gmdallrequisition";
import Supportrequisition from "./pages/supportrequisitionlist/Supportrequisition";
import Supportallreq from "./pages/supportallrequisition/Supportallreq";
import Leaveupload from "./pages/leaveupload/Leaveupload";
import Personalleave from "./pages/personalleave/Personalleave";
import Uploadinvoice from "./pages/uploadinvoice/Uploadinvoice";
import Documentupload from "./pages/documentupload/Documentupload";
import Generatereport from "./pages/generatereport/Generatereport";
import Pettycash from "./pages/pettycash/Pettycash";
import Cashrequest from "./pages/cashrequest/Cashrequest";
import Hrrequisition from "./pages/hrrequisitions/Hrrequisition";
import Assignto from "./pages/assigneto/Assignto";
import Assignreq from "./pages/Assignreq/Assignreq";
import Closereq from "./pages/Closereq/Closereq";
import Closeby from "./pages/closeby/Closeby";
import Closeaction from "./pages/closeaction/Closeaction";
import Hrapproveleave from "./pages/hrapproveleave/Hrapproveleave";
import Updateroles from "./pages/updateroles/Updateroles";

const store = configureStore();


function App() {
  let pathes = window.location.pathname
  const[authvaluesrole, setAuthValuesrole] = useState(localStorage.getItem('isrole'))
   //console.log( window.location.pathname);
  return (
    <Provider store={store}>
    <Router className="App">
    <SnackbarProvider anchorOrigin={{ horizontal: "right", vertical: "bottom" }} maxSnack={5}>
      {pathes === '/' || pathes === '/login' ? null
      : <Topbar/>}
      
      <div className="container">

        
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route exact path="/leave">
          <Sidebar/>
            <Leaverequest />
          </Route>
          <Route exact path="/leavelist">
          <Sidebar/>
            <Leavelist />
          </Route>
          {/* <Route path="/user/:userId">
            <User />
          </Route> */}
          <Route exact path="/profile">
          <Sidebar/>
            <Profile />
          </Route>
          <Route exact path="/adduser">
          <Sidebar/>
            <Adduser/>
          </Route>
          <Route exact path="/assign">
          <Sidebar/>
            <AssignLg/>
          </Route>
          <Route exact path="/userlist">
          <Sidebar/>
            <Userlist/>
          </Route>
          <Route exact path="/hodapprove">
          <Sidebar/>
            <ApproveLg/>
          </Route>
          <Route exact path="/hrapprove">
          <Sidebar/>
            <Hrapproveleave/>
          </Route>
          <Route exact path="/deductions">
          <Sidebar/>
            <Deductuser/>
          </Route>
          <Route exact path="/requisitions">
          <Sidebar/>
            <Requisitions/>
          </Route>

          <Route exact path="/pettycash">
          <Sidebar/>
            <Pettycash/>
          </Route>

          <Route exact path="/cashrequest">
          <Sidebar/>
            <Cashrequest/>
          </Route>

          <Route exact path="/auditrequisitions">
          <Sidebar/>
            <Auditrequisition/>
          </Route>

          <Route exact path="/gmdrequisitions">
          <Sidebar/>
            <Gmdrequisition/>
          </Route>

          <Route exact path="/hodrequisitions">
          <Sidebar/>
            <Hodrequisition/>
          </Route>

          <Route exact path="/hrrequisitions">
          <Sidebar/>
            <Hrrequisition/>
          </Route>

          <Route exact path="/cforequisitions">
          <Sidebar/>
            <Cforequisition/>
          </Route>
          <Route exact path="/supportrequisitions">
          <Sidebar/>
            <Supportrequisition/>
          </Route>
          <Route exact path="/hodallreq">
          <Sidebar/>
            <Hodallreq/>
          </Route>
          <Route exact path="/supportallreq">
          <Sidebar/>
            <Supportallreq/>
          </Route>
          <Route exact path="/leaveupload/:id">
          <Sidebar/>
            <Leaveupload/>
          </Route>
          <Route exact path="/closereq">
          <Sidebar/>
            <Closereq/>
          </Route>
          <Route exact path="/generatereport">
          <Sidebar/>
            <Generatereport/>
          </Route>
          <Route exact path="/invoiceaction/:id">
          <Sidebar/>
            <Documentupload/>
          </Route>
          <Route exact path="/assignaction/:id">
          <Sidebar/>
            <Assignto />
          </Route>
          <Route exact path="/updateroles/:id">
          <Sidebar/>
            <Updateroles/>
          </Route>
          <Route exact path="/closeby/:id">
          <Sidebar/>
            <Closeby/>
          </Route>
          <Route exact path="/assignreq">
          <Sidebar/>
            <Assignreq />
          </Route>
          <Route exact path="/closeaction">
          <Sidebar/>
            <Closeaction/>
          </Route>
          <Route exact path="/personalallreq">
          <Sidebar/>
            <Personalallrequisition/>
          </Route>
          <Route exact path="/personalleave">
          <Sidebar/>
            <Personalleave/>
          </Route>
          <Route exact path="/allreq">
          <Sidebar/>
            <Gmdallrequisition/>
          </Route>
          <Route exact path="/invoiceupload">
          <Sidebar/>
            <Uploadinvoice/> 
          </Route>
          <Route exact path="/requisitionslist">
          <Sidebar/>
            <Requisitionlist/> 
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          
          <Route exact path="/home">
          <Sidebar/>
            <Home/>
          </Route>

          <Route
                
                path="/"
                render={() => {
                    return (
                      authvaluesrole ?
                      <Redirect to="/home" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
          
        </Switch>
      </div>
      </SnackbarProvider>
    </Router>
    </Provider>
  );
}
export default App;
