import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  ArrowDropDownCircle,
  ArrowDropDownCircleOutlined,
} from "@material-ui/icons";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { ArrowCircleDownRounded } from "@mui/icons-material";

export default function Sidebar() {
  const[authvalues, setAuthValues] = useState(localStorage.getItem('ishead'))
  const [isOpen, setIsOpen] = useState(false);
  const [openleave, setLeave] = useState(false);
  const [openreq, setReq] = useState(false);
  const [openuser, setUser] = useState(false)
  const [openreport, setReports] = useState(false)
  const[authvaluessuper, setAuthValuessuper] = useState(localStorage.getItem('issuperuser'))
  const[authvaluesrole, setAuthValuesrole] = useState(localStorage.getItem('isrole'))
  const[authvaluessupport, setAuthValuessupport] = useState(localStorage.getItem('issupport'))
 const autorization = () => {
    if (authvalues === "true")
      return <Link to="/hodapprove" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Approve Leave(For HOD)
      </li>
    </Link>

    else{

    }
  }

  const autorizationpending = () => {
    if (authvaluessuper === "true" || authvaluessupport == "Hr")
      return             <Link to="/hrapprove" className="link">
      <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
        <Storefront className="sidebarIcon" />
        Pending Requests
      </li>
    </Link>

    else{

     return <Link to="/assign" className="link">
      <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
        <Storefront className="sidebarIcon" />
        Pending Requests
      </li>
    </Link>
    }
  }

  const autorizationq = () => {
    if (authvaluesrole === "staff")
      return 



    else{
      return <Link to="/closeaction" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Close Requisition
      </li>
    </Link>
    }
  }

  const autorizationrole = () => {
    if (authvaluesrole === "gmd")
      return <ul className="sidebarList">
        
      <Link to="/allreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisitons
      </li>
    </Link>
    <Link to="/gmdrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons
    </li>
  </Link>
  </ul>

    else if( authvaluesrole === "cfo" ){
      return <ul className="sidebarList">
      <Link to="/allreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisiton
      </li>
    </Link>
    <Link to="/assignreq" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Assign Requisitons
    </li>
  </Link>
    <Link to="/cforequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons
    </li>
  </Link>
  <Link to="/hodrequisitions" className="link">
<li className="sidebarListItem">
  <Storefront className="sidebarIcon" />
  Pending Requisitons(HOD)
</li>
</Link>
  </ul>
    }

    else if( authvaluesrole === "audit" ){
      return <ul className="sidebarList">
        
      <Link to="/allreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisitons
      </li>
    </Link>
    { authvalues == "true" ? (
      <>

<Link to="/hodrequisitions" className="link">
<li className="sidebarListItem">
  <Storefront className="sidebarIcon" />
  Pending Requisitons(HOD)
</li>
</Link>

{/* <Link to="/supportrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons(Support)
    </li>
  </Link> */}

</>

    )
    :
    (
      <>
      </>
    )
      
    }
    <Link to="/auditrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons
    </li>
  </Link>
  </ul>

    }

    else if( authvaluesrole === "hod" ){
      return <ul className="sidebarList">
        <Link to="/requisitions" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Make Requisitons
      </li>
    </Link>
      <Link to="/hodallreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisitons
      </li>
    </Link>
    <Link to="/hodrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons
    </li>
  </Link>
  <Link to="/invoiceupload" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Upload Invoice
      </li>
    </Link>
  </ul>
    }

    else if(authvaluessupport === "Bsl" || authvaluessupport === "Bfl" ){
      return <ul className="sidebarList">
        <Link to="/requisitions" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Make Requisitons
      </li>
    </Link>
    { authvalues == "true" ? (
      <>

<Link to="/hodrequisitions" className="link">
<li className="sidebarListItem">
  <Storefront className="sidebarIcon" />
  Pending Requisitons(HOD)
</li>
</Link>

{/* <Link to="/supportrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons(Support)
    </li>
  </Link> */}

</>

    )
    :
    (
      <>
      </>
    )
      
    }
    {/* <Link to="/hodrequisitions" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      Pending Requisitons
    </li>
  </Link> */}
    <Link to="/supportallreq" className="link">
    <li className="sidebarListItem">
      <Storefront className="sidebarIcon" />
      View Requisitons (Support)
    </li>
  </Link>
  <Link to="/hodallreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisitons
      </li>
    </Link>
  <Link to="/invoiceupload" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Upload Invoice
      </li>
    </Link>
  </ul>
    }

    else{
      return <ul className="sidebarList">
        <Link to="/requisitions" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Make Requisitons
      </li>
    </Link>
    <Link to="/personalallreq" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        View Requisitons
      </li>
    </Link>

    <Link to="/invoiceupload" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Upload Invoice
      </li>
    </Link>
    { authvaluessupport == "Finance" ? (
      <>

<Link to="/closereq" className="link">
<li className="sidebarListItem">
  <Storefront className="sidebarIcon" />
  Close Requisitons
</li>
</Link>

</>

    )
    :
    (
      <>
      </>
    )
      
    }
  </ul>
    }
  }

  const autorizationnewuser = () => {
    if (authvaluessuper === "true" || authvaluessupport === "Hr")
      return           <ul className="sidebarList">
      <Link to="/profile" className="link">
        <li className="sidebarListItem">
          <PermIdentity className="sidebarIcon" />
          Profile
        </li>
      </Link>
      <Link to="/adduser" className="link">
        <li className="sidebarListItem">
          <Storefront className="sidebarIcon" />
          Add User 
        </li>
      </Link>
      <Link to="/userlist" className="link">
        <li className="sidebarListItem">
          <Storefront className="sidebarIcon" />
          User List
        </li>
      </Link>
      <Link to="/deductions" className="link">
        <li className="sidebarListItem">
          <Storefront className="sidebarIcon" />
          Deduct Days
        </li>
      </Link>
    </ul>

    else{

     return <ul className="sidebarList">
      <Link to="/profile" className="link">
        <li className="sidebarListItem">
          <PermIdentity className="sidebarIcon" />
          Profile
        </li>
      </Link>
    </ul>
    }
  }

  const autorizationsupport = () => {
    if (authvaluessupport === "Bfl" && authvalues == "true")
      return           <ul className="sidebarList">
      <Link to="/supportrequisitions" className="link">
        <li className="sidebarListItem">
          <PermIdentity className="sidebarIcon" />
          Support Requisitions
        </li>
      </Link>
    </ul>

    else if (authvaluessupport === "Bsl" && authvalues == "true")
    return           <ul className="sidebarList">
    <Link to="/supportrequisitions" className="link">
      <li className="sidebarListItem">
        <PermIdentity className="sidebarIcon" />
        Support Requisitions
      </li>
    </Link>
    </ul>

    else if (authvaluessupport === "Hr")
    return           <ul className="sidebarList">
    <Link to="/hrrequisitions" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Hr Approvals
      </li>
    </Link>
    </ul>

    else{

     return 
    }
  }


  const autorizationnewusers = () => {
    if (authvaluessuper === "true")
      return                <div className="sidebarMenu">
      <h3 className="sidebarTitle">Departments</h3>
      <ul className="sidebarList">
        <Link to="/departmnts" className="link">
        <li className="sidebarListItem">
          <LineStyle className="sidebarIcon" />
          Departments
        </li>
        </Link>
      </ul>
    </div>

  }


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarListItem" onClick={() => setIsOpen(!isOpen)}>
                <ArrowDropDownCircleOutlined className="sidebarIcon" />
                Dashboard
              </h3>
          {isOpen && (

          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li className="sidebarListItem"   onClick={() => {

                setIsOpen(false);
              }}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>

)}
        </div>
        {/* {autorizationnewusers()} */}
        <div className="sidebarMenu">
        <h3 className="sidebarListItem" onClick={() => setUser(!openuser)}>
                <ArrowDropDownCircleOutlined className="sidebarIcon" />
                Users
              </h3>
          {openuser && (
            <>
            {autorizationnewuser()}
            </>
          )}
        </div>
        <div className="sidebarMenu">
        <h3 className="sidebarListItem" onClick={() => setLeave(!openleave)}>
                <ArrowDropDownCircleOutlined className="sidebarIcon" />
                Leave Options
              </h3>
              {openleave && (
          <ul className="sidebarList">
          <Link to="/leave" className="link">
              <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
                <PermIdentity className="sidebarIcon" />
                Apply For Leave
              </li>
            </Link>
            {autorization()}
            {/* <Link to="/assign" className="link">
              <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
                <Storefront className="sidebarIcon" />
                Pending Requests
              </li>
            </Link> */}
            {autorizationpending()}
            <Link to="/leavelist" className="link">
              <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
                <Storefront className="sidebarIcon" />
                View Requests
              </li>
            </Link>

            <Link to="/personalleave" className="link">
              <li className="sidebarListItem" onClick={() => {

setIsOpen(false);
}}>
                <Storefront className="sidebarIcon" />
                Upload Documents
              </li>
            </Link>

          </ul>
              )}
        </div>
        
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle" onClick={() => (!)}>Requisition Options</h3> */}
          <h3 className="sidebarListItem" onClick={() => setReq(!openreq)}>
                <ArrowDropDownCircleOutlined className="sidebarIcon" />
                Request Options
              </h3>
          {openreq && (
            <>
            <Link to="/pettycash" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Petty Cash
      </li>
    </Link>
    <Link to="/cashrequest" className="link">
      <li className="sidebarListItem">
        <Storefront className="sidebarIcon" />
        Cash Request
      </li>
    </Link>
          {autorizationq()}
          {autorizationrole()}
          {autorizationsupport()}
          </>
          )}
        </div>
        <div className="sidebarMenu">
      {/* <h3 onClick={() => (!)} className="sidebarTitle"></h3> */}
      <h3 className="sidebarListItem" onClick={() => setReports(!openreport)}>
                <ArrowDropDownCircleOutlined className="sidebarIcon" />
                Reports
              </h3>
      {openreport && (
      <ul className="sidebarList">
        <Link to="/generatereport" className="link">
        <li className="sidebarListItem">
          <LineStyle className="sidebarIcon" />
          Get Reports
        </li>
        </Link>
        {/* <li className="sidebarListItem">
          <Timeline className="sidebarIcon" />
          Analytics
        </li>
        <li className="sidebarListItem">
          <TrendingUp className="sidebarIcon" />
          Sales
        </li> */}
      </ul>
      )}
    </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}


// import'./sidebar.css'
// import {HomeOutlined, AccountBoxOutlined, MeetingRoom, Apartment, } from '@material-ui/icons';


// export default function sidebar() {
//   return (
//     <div className="sidebar">
//         <div className="sidebarWrapper">
//             <div className="sidebarMenu">
//                 {/* <h3 className="sidebarTitle">Tobias</h3> */}
//                     <ul className="sidebarList">
//                         <li className="sidebarListItems active" href="/home">
//                         <HomeOutlined/> Home
//                         </li>
//                         <li className="sidebarListItems">
//                         <AccountBoxOutlined/> Profile
//                         </li>
//                         <li className="sidebarListItems">
//                         <Apartment/> Departments
//                         </li>
//                         <li className="sidebarListItems">
//                         <MeetingRoom/> Leave Requests
//                         </li>
                        
//                     </ul>
                
//             </div>
//         </div>
//     </div>
//   )
// }
