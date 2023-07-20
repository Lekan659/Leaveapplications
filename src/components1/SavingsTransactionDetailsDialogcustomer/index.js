import React, { Component, Fragment } from 'react';
import { makeRequest } from '../../utils/axios-helper';
import {
    Box, 
    Button, 
    
     
    Dialog,
    DialogContent,
    DialogActions,
    createStyles, 
    withStyles,
    Typography,
    Grid,
    Divider
} from '@material-ui/core';

import { red, green } from '@material-ui/core/colors'
import moment from 'moment'
import axios from 'axios'

const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  responseType: 'arraybuffer' 
  };

const useStyles = createStyles(theme => ({
    dialogContent: {
        minHeight: 300
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

class SavingsTransactionDetailsDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,

            persons: [],

            // datas: {
            //     document:this.props.data.document 
            // },
            food: '',

            source:null
        }
        
    }

    componentDidMount() {
        axios.get("http://localhost:8080/marketerName")
        //makeRequest().get(`/files/${this.props.data.accountNumber}`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
      }
        // axios
        //   .get(
        //     `http://bethsaidatest-env.eba-7pwfmpqg.us-east-1.elasticbeanstalk.com/files/${this.props.data.docFile}`,
        //     { responseType: 'arraybuffer' },
        //   )
      componentDidMount() {
        this.setState({ datas: this.props.data})
          makeRequest().get(`/investmentFiles/Outlook-z1k0o3ba.png`, config)
          .then(response => {
            const base64 = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            );
            this.setState({ source: "data:;base64," + base64 });
            console.log(this.state.source)
          });
      }

    render(){
        return(
            <Fragment>
                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    {
                        this.props.data ? (
                            <DialogContent className={this.props.classes.dialogContent}>
                                <Grid container spacing={2}>
                
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Typography component="h4" className={this.props.classes.topHeader}>
                                            Investment Id - [ {this.props.data.id} ]
                                        </Typography>
                                        <Divider style={{marginTop:15, marginBottom:5}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Customer Name:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {this.props.data.firstName}     {this.props.data.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Account Number:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {this.props.data.accountNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Amount:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            &#8358;{parseFloat(this.props.data.principal).toLocaleString("en",{minimumFractionDigits: 2})}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Investment Status:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {this.props.data.status}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Rate:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {this.props.data.rate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Start Date:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {moment(this.props.data.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Maturity Date:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {moment(this.props.data.maturityDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Interest:
                                        </Typography>
                                        <Typography component="p" className={this.props.classes.text}>
                                            {this.props.data.maturityInterest ? (<span>&#8358;{parseFloat(this.props.data.maturityInterest).toLocaleString("en")}</span>) : "Not Available"}
                                        </Typography>
                                    </Grid>
                                     <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Proof Of Payment:
                                        </Typography>
                                        <Box>
                                            <img
                                                src={this.props.source1}
                                                style={{height: 200, width: 200}}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Additional Document:
                                        </Typography>
                                        <Box>
                                            <img
                                                src={this.props.source2}
                                                style={{height: 200, width: 200}}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        ) : (
                            null
                        )
                    }
                    <Divider style={{marginTop:15,marginBottom:5}}/>
                    <DialogActions>
                        <Button  
                            className={this.props.classes.buttonCancel} 
                            onClick={this.props.onClose}
                            variant="outlined"
                            disableElevation
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
  
export default withStyles(useStyles)(SavingsTransactionDetailsDialog)