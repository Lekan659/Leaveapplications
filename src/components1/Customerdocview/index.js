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
import { orange, red, green } from '@material-ui/core/colors'
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
        //     `http://bethsaidatest-env.eba-7pwfmpqg.us-east-1.elasticbeanstalk.com/files/${this.props.data.customer_id.docFile}`,
        //     { responseType: 'arraybuffer' },
        //   )
    //   componentDidMount() {
    //     this.setState({ data: this.props.data})
    //       makeRequest().get(`/files/${this.state.data.customer_id.docFile}`, config)
    //       .then(response => {
    //         const base64 = btoa(
    //           new Uint8Array(response.data).reduce(
    //             (data, byte) => data + String.fromCharCode(byte),
    //             '',
    //           ),
    //         );
    //         this.setState({ source: "data:;base64," + base64 });
    //         console.log(this.state.source)
    //       });
    //   }

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
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Customers Signature:
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
                                            Identification Document:
                                        </Typography>
                                        <Box>
                                            <img
                                                src={this.props.source2}
                                                style={{height: 200, width: 200}}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Typography component="h4" className={this.props.classes.title}>
                                            Form:
                                        </Typography>
                                        <Box>
                                            <img
                                                src={this.props.source3}
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