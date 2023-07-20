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

// import "assets/css/certstyle.css";

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

class CertificateDetailsDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }

    render(){
        return(
            <Fragment>
                
                
                    {
                        this.props.data ? (
                            <Dialog
                    // scroll={"paper"}
                    // fullWidth={"true"}
                    maxWidth={"100%"}
                    maxHeight={"100%"}
                    open={this.props.open}
                    close={this.props.close}
                    fullScreen={"true"}
                    classes={{paperFullScreen: "prePrint printDialog"}}
                    
                >
                            <DialogContent className={this.props.classes.dialogContent}>
                    <body className="words">                             
                    <div className="certificate-container">
                      <div className="certificate">
                          <div className="water-mark-overlay"></div>
                          <div className="certificate-header">
                              <img src="https://bethsaidainvestmentpartners.com/wp-content/uploads/2021/08/Logo-Investment-partners-transparent.png" className="logo" alt=""/>
                          </div>
                          <div className="certificate-body">
                             
                              <h1>Investment Certificate </h1>
                              <p className="student-name">{this.props.data.customer_id.firstName}     {this.props.data.customer_id.lastName}</p>
                              <div className="certificate-content">
                <div className="text-center">

                    <p>
                has an investment package of  &#8358;{parseFloat(this.props.data.principal).toLocaleString("en",{minimumFractionDigits: 2})} naira with us which started on the {moment(this.props.data.startDate).subtract(1,'months').format("dddd, MMMM Do YYYY")} at the rate of {this.props.data.rate} % and is expected to be matured on {moment(this.props.data.maturityDate).subtract(1,'months').format("dddd, MMMM Do YYYY")} thereby satisfying the {this.props.data.tenure} days stipulated date for the tenure. The return on investment which is the total sum of  {this.props.data.maturityInterest + this.props.data.principal ? (<span>&#8358;{parseFloat(this.props.data.maturityInterest+ this.props.data.principal).toLocaleString("en")}</span>) : "Not Available"} naira only would be paid on the {moment.utc(this.props.data.maturityDate).add(1,'days').format("ddd, MMM Do YYYY")}.
                </p>
                <p className="topic-title">
                     { this.props.data.topUpAmount ? (`Kindly be aware that this investment was topped-up with the sum of  ${ parseFloat(this.props.data.topUpAmount).toLocaleString("en",{minimumFractionDigits: 2})} only on the ${this.props.data.dateOfTopUp} which was added to the initial principal ${parseFloat(this.props.data.initialPrincipal).toLocaleString("en",{minimumFractionDigits: 2})}`) : ("") }
                </p>
                </div>
                <p className="topic-title">
                    Please note for Pre-matured Liquidation, you are expected to provide a minimum of  {this.props.data.investmentPackage == "Classic Investment" ? ("5 working days from the date of application and a penlty fee of 25%") : ("15 working days from the date of application and a penlty fee of 50%") }  will be charged on the interest accrued for premature termination of this investment.
                </p>
                <div className="text-center">
                    <p className="topic-description">Also, kindly notify the company of your intention to roll-over to liquidate the investment at least {this.props.data.investmentPackage == "Classic Investment" ? ("5") : ("15") }  woking days before maturity as the investment would be automatically rolled over upon maturity. </p>
                    <br/>
                </div>
            </div>
                              <div className="certificate-footer">
                                  <div className="row">
                                      <div className="col-md-4">
                                      <div className="certificate-signature">
                                            <img
                                                alt="..."
                                                // src={
                                                //     require("../../assets/img/brand/signature.png").default
                                                // }
                                                className="logo"
                                            />
                                        </div>

                                          <p>Abe Ezekiel</p>
                                          <p>Authorized SIgnatory</p>
                                      </div>
                                      <div className="col-md-4">
                                      <div className="certificate-signature3">
                                            <img
                                                alt="..."
                                                // src={
                                                //     require("../../assets/img/brand/SEAL.png").default
                                                // }
                                                className="logo"
                                            />
                                        </div>

                                      </div>

                                              <div className="col-md-4">
                                                  
                                                  <div className="certificate-signature2">
                                                                    <img
                                                            alt="..."
                                                            // src={
                                                            //     require("../../assets/img/brand/2ndsig.png").default
                                                            // }
                                                            className="logo"
                                                        />
                                                    </div>
                                                    <p>Tayo Ogunleye</p>
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
                            style = {{marginBottom: "50px"}}
                        >
                            Cancel
                        </Button>
                                    <Button href={`/customer/print/${this.props.data.id}`}  variant="contained" color="primary" style = {{marginBottom: "50px"}}>Print</Button>

                                    {/* <Button  onClick={() => window.print()} variant="contained" color="primary">Print</Button> */}
                    </DialogActions>
                            </Dialog>
                        ) : (
                            null
                        )
                    }
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
}
  
export default withStyles(useStyles)(CertificateDetailsDialog)