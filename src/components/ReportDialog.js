import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import reportError from '../helpers/reportError';

class ReportDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wrongLocation: false,
            wrongContactNumber: false,
            notAnsweringPhone: false,
            bedsNotAvailable: false,
            other: false,
            text: '',
            snackbarOpen: false,
            snackbarText: '',
            snackbarSeverity: '',
            disabled:false
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }

    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleReport = async() => {
        if (!this.state.wrongLocation && !this.state.wrongContactNumber &&
            !this.state.notAnsweringPhone && !this.state.bedsNotAvailable &&
            !this.state.other && this.state.text.length<=1 ) {
            this.setState({
                snackbarOpen: true,
                snackbarText: 'Enter valid data',
                snackbarSeverity: 'error'
            });
        } else if (this.state.other && this.state.text.length <= 1) {
            this.setState({
                snackbarOpen: true,
                snackbarText: 'Enter reason',
                snackbarSeverity: 'error'
            });
        }
        else {
            this.setState({disabled:true})
        
            let params = {
                placeID: this.props.placeID,
                hospitalName: this.props.hospitalName,
                reportData:[]
            }
            if (this.state.wrongLocation)
                params.reportData.push('Wrong location');
            if (this.state.wrongContactNumber)
                params.reportData.push('Wrong contact number');
            if (this.state.bedsNotAvailable)
                params.reportData.push('Beds not available');
            if (this.state.notAnsweringPhone)
                params.reportData.push("Nobody's answering the phone")
            if (this.state.text.length > 1)
                params.reportData.push(this.state.text);
            
            const res = await reportError(params);
            if (res.err) {
                this.setState({
                    snackbarOpen: true,
                    snackbarText: res.err,
                    snackbarSeverity:'error',
                    disabled: false
                });
            } else {
                this.setState({
                    snackbarOpen: true,
                    snackbarText: res.res,
                    snackbarSeverity: 'success',
                    disabled: false
                });
                this.props.handleClose();
            }
        }
    }

    render() {
        const { open, handleClose } = this.props;
        const { wrongLocation, wrongContactNumber, notAnsweringPhone,
            bedsNotAvailable, other, snackbarOpen,snackbarSeverity,snackbarText,disabled } = this.state;
        return (
            <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report</DialogTitle>
                <DialogContent dividers>
                    <Typography color="error" variant="subtitle2" >
                        <strong>
                            In cetain cases, the data might be delayed or inaccurate.
                            If you come across an such an error, please report it and help us rectify it.
                        </strong>
                    </Typography>
                    <Divider style={{margin:'8px auto'}}/>
                    <Typography variant="body2" >
                        Select from the categories or write about it in the textbox below.
                        We'll do our best to update the data accordingly.
                    </Typography><br />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={wrongLocation} onChange={this.handleChange}
                                name="wrongLocation" size="small" color="primary" />}
                            label="Wrong location"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={wrongContactNumber} onChange={this.handleChange}
                                name="wrongContactNumber" size="small" color="primary"/>}
                            label="Wrong contact number"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={notAnsweringPhone} onChange={this.handleChange}
                                name="notAnsweringPhone" size="small" color="primary"/>}
                            label="Nobody's answering the phone"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={bedsNotAvailable} onChange={this.handleChange}
                                name="bedsNotAvailable" size="small" color="primary"/>}
                            label="Beds not available"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={other} onChange={this.handleChange}
                                name="other" size="small" color="primary"/>}
                            label="Other"
                        />
                        <TextareaAutosize
                            style={{width:'100%',margin:'10px auto'}}
                            placeholder="Others"
                            name="text"
                            rowsMin="5"
                            onChange={this.handleTextChange}
                        ></TextareaAutosize>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                        <Button onClick={this.handleReport} variant="contained" disabled={disabled} color="secondary">
                        Report
                    </Button>
                </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    autoHideDuration={2500}>
                    <MuiAlert elevation={2} variant="filled" severity={snackbarSeverity}>{snackbarText}</MuiAlert>
                </Snackbar>
            </>
        );
    }
}

export default ReportDialog;
