/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

import axios from "axios";
import { makeRequest, handleError} from 'utils/axios-helper';
import axiosConfig from '../../config/axiosConfig';

export default class AdminNavbar extends React.Component {
  constructor(props){
    super(props)
this.state = {
  persons: []
}

    };



    componentDidMount() {
      makeRequest(this.props).get("/loggedInUserName")
        .then(res => {
          const persons = res.data[0];
          this.setState({ persons });
          console.log(persons)
        })
    }

// componentDidMount(){
//         console.log(this.props.match)
//         axios.get(`https://jsonplaceholder.typicode.com/users/1`)
//        // axios.get(`http://localhost:8080/list/customer/${this.props.match.params.id}`)
//         .then(response => {
//             this.setState({
//                 isLoading:false,
//                 current_data: response,
//                 persons: Object.assign({},this.state.persons,
//                     {
//                         email: response.data.email,
//                         surname: response.data.surname,
//                         username: response.data.username,
//                         first_name: response.data.firstName,
//                         last_name: response.data.lastName,
//                         gender: response.data.gender,
//                         address: response.data.address,
//                         phone_number: response.data.phoneNumber,
//                         branch: response.data.branch,
//                         role: response.data.userRole, 
//                         status: response.data.status,
//                         marital_status: response.data.marital_status,
//                         birthday: response.data.birthday,
//                         mode_of_identification: response.data.mode_of_identification,
//                         identification_no: response.data.identification_no,
//                         bank_name: response.data.bank_name,
//                         bank_account_no: response.data.bank_account_number,
//                         bank_account_name: response.data.bank_account_name,
//                         bvn: response.data.bvn,
//                         marketer: response.data.marketer,
//                         notify_email: response.data.notify_email,
//                         notify_sms: response.data.notify_sms,
//                         is_active: response.data.is_active
//                             }
//                 )
//             })
//         })
    
// }

      handleLogout = () => {
        window.location = axiosConfig.login_url;

        
      };

render() {
  return (
    <>

      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h1 mb-4 text-dark text-uppercase d-none d-lg-inline-block mb-0"
            style={{fontFamily: "mulish"}}
            //h1 mb-4 text-dark text-uppercase d-none d-lg-inline-block mb-0
            // to="/"
          >
            Welcome {this.state.persons.firstName} {this.state.persons.lastName}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpeg")
                          .default
                      }
                    /> */}
                    <i className="fas fa-power-off"></i>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    {/* {this.state.persons.username} */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem divider />
                <DropdownItem onClick={(e) => localStorage.clear()} onClick={this.handleLogout}  >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
        </Container>
        
      </Navbar>
      
    </>
  )
};
};