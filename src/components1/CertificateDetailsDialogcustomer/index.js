import React, { Component, Fragment } from 'react';
import {
    Box, 
    Button, 
    Avatar, 
    Dialog,
    DialogContent,
    DialogActions,
    createStyles, 
    withStyles,
    Typography,
    CircularProgress,
    Grid,
    Divider
} from '@material-ui/core';
import { WarningRounded as WarningIcon, Done as SuccessIcon} from '@material-ui/icons'
import { orange, red, green,grey } from '@material-ui/core/colors'
import moment from 'moment'
// import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
//import "assets/css/certstyle.css";

const useStyles = createStyles(theme => ({
    dialogContent: {
        // height: "fit-content",
        // maxWidth: "100%"
    },
    avatarBox:{
        display: "flex",
        flexDirection:  "column",
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        width: 80,
        height: 80,
        backgroundColor: green[500]
    },
    topHeader:{
        fontSize: 17,
        color: "#333333",
        fontWeight: 500,
    },
    title: {
        fontSize: 15,
        color: "#222222",
        fontWeight: 500,
    },
    text: {
        fontSize: 13,
        color: "#555555",
        marginTop: 5,
        marginBottom: 15,
        textTransform: "Capitalize"
    },
    balanceText: {
        fontSize: 14,
        color: green[600],
        fontWeight: 600,
        marginTop: 5,
        marginBottom: 15
    },
    lastInfo: {
        fontSize: 13,
        color: "#555555",
        marginTop: 20,
    },
    buttonCancel:{
        color: red[500]
    }
}))

function CertificateDetailsDialogcustomer(props) {

        return(
            <Fragment>

                            <Dialog
                            // scroll={"paper"}
                            // fullWidth={"true"}
                            // maxWidth={"100%"}
                            // maxHeight={"100%"}
                            open={"true"}
                            // close={this.props.close}
                            fullScreen={"true"}
                            classes={{paperFullScreen: "prePrint printDialog"}}
                            
                        >
                            <DialogContent className={this.props.classes.dialogContent}>
                    <body className="words">                             
                    <div className="certificate-container">
                      <div className="certificate">
                          <div className="water-mark-overlay"></div>
                          <div className="certificate-header">
                              <img src="https://uploads-ssl.webflow.com/60b33c956ec9b08963e26560/60b522b1fa03aeb36265399f_trovest-inline_cropped-png-p-500.png" className="logo" alt=""/>
                          </div>
                          <div className="certificate-body">
                          <p className="student-name">
                              {moment().subtract(1,'months').format(" MMMM Do YYYY")} <br/> {"firstName"}     {"lastName"} <br/>
                             {"address"}</p>
                             <h2>Dear Ma/Sir</h2>
                              <div className="certificate-content">
                <div className="text-left">


                <h2>In line with our discussion regarding the above subject matter, Kindly find below the basic terms <br/>
and conditions regarding your investment with our company. </h2>
                <h2>
                {/* Investors: {frag.data.firstName}     {frag.data.lastName} <br/>
                Invested Amount: {frag.data.accountNumber} <br/>
                Start Date: {moment(frag.data.startDate).subtract(1,'months').format(" MMMM Do YYYY")} <br/>
                Maturity Date: {moment.utc(frag.data.maturityDate).subtract(1,'months').format("ddd, MMM Do YYYY")} <br/> */}
                {/* Tenure: {frag.data.tenure} days <br/> */}
                Investors: <br/>
                Invested Amount: <br/>
                Start Date: <br/>
                Maturity Date: <br/>
                Tenure: <br/>
                Interest Rate: <br/>
                Interest Due: <br/>
                {/* Interest Rate: {frag.data.rate} % <br/> */}
                {/* Interest Due: {frag.data.maturityInterest ? (<span>&#8358;{parseFloat(frag.data.maturityInterest).toLocaleString("en")}</span>) : "Not Available"} <br/> */}
                {/* Total Due at Maturity: {frag.data.upFrontMaturity == "No" ? (<span>&#8358;{parseFloat(frag.data.maturityInterest+ frag.data.principal).toLocaleString("en")}</span>) : (<span>&#8358;{parseFloat(frag.data.principal).toLocaleString("en")}</span>)} <br/> */}
                Total Due at Maturity: <br/>
                {/* Start Date: {moment(frag.data.startDate).subtract(1,'months').format(" MMMM Do YYYY")} <br/>
                Maturity Date: {moment.utc(frag.data.maturityDate).subtract(1,'months').format("ddd, MMM Do YYYY")} <br/> */}
                     </h2>

                    {/* <p>
                    This is an investment package of  &#8358;{parseFloat(frag.data.principal).toLocaleString("en",{minimumFractionDigits: 2})} naira with us which started on the {moment(frag.data.startDate).subtract(1,'months').format(" MMMM Do YYYY")} at the rate of {frag.data.rate} % and is expected to be matured on {moment.utc(frag.data.maturityDate).subtract(1,'months').format("ddd, MMM Do YYYY")} thereby satisfying the {frag.data.tenure} days stipulated date for the tenure. {frag.data.upFrontMaturity == "No" ? (`The return on investment which is the total sum of ${(parseFloat(frag.data.maturityInterest+ frag.data.principal).toLocaleString("en"))}`) : (`The return on investment which is ${(parseFloat(frag.data.maturityInterest).toLocaleString("en"))} naira only has been paid upfront and the balance of ${(parseFloat(frag.data.principal).toLocaleString("en"))}`) } naira only would be paid on the {moment.utc(frag.data.maturityDate).subtract(1,'months').format("ddd, MMM Do YYYY")}.
                </p> */}

                <p>
                Pre-termination of this investment in part or in whole will attract a penalty charge of 30% flat on
the total accrued interest earned.
                </p>

                {/* <p className="topic-title">
                     { frag.data.topUpAmount ? (`Kindly be aware that this investment was topped-up with the sum of  ${ parseFloat(frag.data.topUpAmount).toLocaleString("en",{minimumFractionDigits: 2})} only on the ${frag.data.dateOfTopUp} which was added to the initial principal ${parseFloat(frag.data.initialPrincipal).toLocaleString("en",{minimumFractionDigits: 2})}`) : ("") }
                </p> */}
                </div>
                <p className="topic-title">
                The investment will be rolled over at prevailing agreed rate if we do not receive any instruction
from you on or before maturity.
                </p>

               


                <div className="text-left">
                    <p >For further enquiries or clarification, kindly contact your account executive. </p>
                    <br/>
                    <p>Thank you for choosing to invest through Coremars Asset Management Limited.</p>
                    <p> Yours Faithfully,<br/>
                    For: For: Coremars Asset Management Limited:
                    </p>
                </div>
            </div>
            <div className="certificate-footer">
                                  <div className="row">
                                      <div className="col-md-4 text-center">
                                      <div className="certificate-signature">
                                            <img
                                                alt="..."
                                                // src={
                                                //     require("../../assets/img/brand/signature.png").default
                                                // }
                                                className="logo"
                                            />
                                        </div >

                                          <p className="">James Jackson</p>
                                          <p>Authorized SIgnatory</p>
                                      </div>
                                      <div className="col-md-4">
                                      <div className="certificate-signature3">
                                      <img src="https://uploads-ssl.webflow.com/60b33c956ec9b08963e26560/60b522b1fa03aeb36265399f_trovest-inline_cropped-png-p-500.png" className="logo" alt=""/>
                                        </div>

                                      </div>

                                              <div className="col-md-4 text-center">
                                                  
                                                  <div className="certificate-signature2">
                                                  <img
                                                            alt="..."
                                                            // src={
                                                            //     require("../../assets/img/brand/2ndsig.png").default
                                                            // }
                                                            className="logo"
                                                        />
                                                    </div>
                                                    <p>James Jackson</p>
                                          <p>Authorized SIgnatory</p>
                                              </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  </body>
               
                   
                            </DialogContent>
                            <DialogActions>
                        <Button  
                            className={this.props.classes.buttonCancel} 
                            onClick={this.props.close}
                            variant="outlined"
                            disableElevation
                            
                        >
                            Cancel
                        </Button>
                                    <Button href={`/customer/print/${1}`}  variant="contained" color="primary">Print</Button>
                    </DialogActions>
                            </Dialog>

                    {/* <DialogActions>
                        <Button  
                            className={this.props.classes.buttonCancel} 
                            onClick={this.props.close}
                            variant="outlined"
                            disableElevation
                        >
                            Cancel
                        </Button>
                                    <Button  onClick={() => window.print()} variant="contained" color="primary">Print</Button>
                    </DialogActions> */}
                
            </Fragment>
        )
    }
  
export default withStyles(useStyles)(CertificateDetailsDialogcustomer)