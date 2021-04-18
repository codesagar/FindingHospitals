import React, { Component } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import autocompleteTextFieldProps from '../helpers/autoCompleteTextFieldProps';
import reverseGeocoding from '../helpers/reverseGeocoding';

const Styles = ((theme) => ({
    container: {
        marginLeft:theme.spacing(2)
    },
    grid: {
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btn: {
        width: '100%',
        paddingTop: '13px',
        paddingBottom:'13px'
    }
}));

class LocationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            address: '',
            snackbarOpen:false,
            snackbarText: '',
            type:'GEN'
        }
    }

    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (res) => {
            this.setState({ address: 'Getting user location...' });
            this.setState({
                latitude: res.coords.latitude,
                longitude: res.coords.longitude
            });
            const getLocation = await reverseGeocoding(this.state.latitude, this.state.longitude);
            if (getLocation.err) {
                this.setState({
                    snackbarOpen: true,
                    snackbarText: getLocation.err,
                    address:''
                })
            } else {
                this.setState({address: getLocation.address})
            }
            });
    }
    

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = async(address) => {
        this.setState({ address });
        const results = await geocodeByAddress(address).catch();
        const latLng = await getLatLng(results[0]).catch((err) => {
            this.setState({
                snackbarOpen: true,
                snackbarText: err
            });
        });
        this.setState({
            latitude: latLng.lat,
            longitude: latLng.lng
        });
    };

    onBtnClick=()=> {
        if (this.state.address.length > 1) {
            this.handleSelect(this.state.address);
            if (this.state.latitude && this.state.longitude)
                this.props.sendReqToGetHospitals({
                    lat: this.state.latitude,
                    lon: this.state.longitude,
                    type:this.state.type
                });
        }
        else
            this.setState({
                snackbarOpen: true,
                snackbarText:'Enter valid address'
            })
    }

    render() {
        const { classes } = this.props;
        const { address, snackbarOpen, snackbarText, type } = this.state;
        
        return (
            <form className={classes.container} noValidate >
                <div className={classes.grid} style={{marginBottom:'25px'}}>
                    <Button variant="outlined" color="primary" onClick={this.getCurrentLocation}
                    >Detect my location</Button>
                </div>
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={11} md={6} component={Container}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={this.handleChange}
                            onSelect={this.handleSelect}
                        >{ autocompleteTextFieldProps() }
                        </PlacesAutocomplete>
                    </Grid>
                    <Grid item xs={11} md={2} component={Container}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="inputlablt">Type</InputLabel>
                            <Select
                                labelId="type"
                                id="select"
                                value={type}
                                onChange={(e)=>this.setState({type:e.target.value})}
                                label="Type"
                            >
                                <MenuItem value='ICU'>ICU Bed</MenuItem>
                                <MenuItem value='O2'>Oxygen Supply</MenuItem>
                                <MenuItem value='GEN'>General Bed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} md={2} component={Container}>
                        <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            className={classes.btn}
                            fullWidth
                            onClick={this.onBtnClick}
                        > Search</Button>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={snackbarOpen}
                        onClose={()=>this.setState({snackbarOpen:false})}
                        message="Follow up completed!"
                        autoHideDuration={2500}>
                        <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
                    </Snackbar>
                </Grid>
            </form>
        );
    }
}

export default withStyles(Styles)(LocationForm);