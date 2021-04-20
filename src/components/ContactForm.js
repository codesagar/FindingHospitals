import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import sendMessage from "../helpers/sendMessage";

const Styles = ((theme) => ({
    paper: {
        padding: '1.5rem',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'space-evenly',
    },
    textField: {
        margin: '10px auto',
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: '600',
        marginBottom: '15px',
        textAlign: 'center',
        color: theme.palette.primary.dark
    }
}));


class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            contact: '',
            message: '',
            snackbarOpen: false,
            snackbarText: '',
            snackbarSeverity:'',
            err:false
        }
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validateContact = () => {
        if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.state.contact) ||
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(this.state.contact)) {
            this.setState({err:false})
            return true;
        }
        else {
            this.setState({ err: true});
            return false;
        }
    }

    onClickSubmit = async() => {
        if (this.state.name.length > 1 && this.state.contact.length > 1 && this.state.message.length > 1) {
            if (this.validateContact()) {
                const res = await sendMessage({
                    name: this.state.name,
                    contact: this.state.contact,
                    message: this.state.message
                });
                if (res.err) 
                    this.setState({
                        snackbarOpen: true,
                        snackbarSeverity: "error",
                        snackbarText: res.err
                    });
                else 
                    this.setState({
                        snackbarOpen: true,
                        snackbarSeverity: "success",
                        snackbarText: res.success
                    });
                
            }
        } else {
            this.setState({
                snackbarSeverity:'error',
                snackbarOpen: true,
                snackbarText:'Please enter valid data'
            })
        }
    }

    render() {
        const { classes } = this.props
        const { err, snackbarOpen, snackbarText, snackbarSeverity } = this.state;
        return (
            <form noValidate>
                <Paper elevation={4} className={classes.paper}>
                    <Typography className={classes.title}>Contact Us</Typography>
                    <TextField
                        id="name"
                        label="Name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        required
                        className={classes.textField}
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="contact"
                        label="Contact ( Phone or email )"
                        name="contact"
                        variant="outlined"
                        fullWidth
                        required
                        className={classes.textField}
                        onChange={this.handleChange}
                        error={err}
                        helperText={err?'Invalid contact information':null}
                    />
                    <TextareaAutosize
                        required
                        placeholder="Message *"
                        name="message"
                        rowsMin="12"
                        className={classes.textField}
                        style={{ width: '98%' }}
                        onChange={this.handleChange}
                    ></TextareaAutosize>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.textField}
                        size="large"
                        style={{ width: '100%', marginTop: '18px' }}
                        onClick={this.onClickSubmit}
                    >Submit</Button>
                </Paper>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    message="Follow up completed!"
                    autoHideDuration={2500}>
                    <MuiAlert elevation={6} variant="filled" severity={snackbarSeverity}>{snackbarText}</MuiAlert>
                </Snackbar>
            </form>
        );
    }

}

export default withStyles(Styles)(ContactPage);