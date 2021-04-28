import React, { Component } from 'react';

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
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
        alignItems:'center'
    },
    btn: {
        paddingTop: '10px',
        paddingBottom:'10px'
    },
    flexDisplay: {
        display: 'flex',
        justifyContent: 'center'
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
            type: 'GEN',
            libLoaded:false
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleWindowLoad);
    }

    handleWindowLoad = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&libraries=places`;
        script.setAttribute('id', 'placesScript');
        document.getElementsByTagName('head')[0].appendChild(script);
        script.addEventListener('load', () => {
            this.setState({ libLoaded: true });
            const google = window.google;
            const autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocompleteField')), { types: ['geocode'] });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                this.setState({
                    address: place.formatted_address,
                    latitude: place.geometry.location.toJSON().lat,
                    longitude: place.geometry.location.toJSON().lng
                });
            })
        });        
    }

    componentWillUnmount() {
        if(document.getElementById('placesScript'))
            document.getElementById('placesScript').remove();
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

    onBtnClick=()=> {
        if (this.state.address.length > 1) {
            if (this.state.latitude && this.state.longitude)
                this.props.sendReqToGetHospitals({
                    lat: this.state.latitude,
                    lon: this.state.longitude,
                    type: this.state.type
                });
        }
        else
            this.setState({
                snackbarOpen: true,
                snackbarText: 'Enter valid location'
            });
    }

    render() {
        const { classes } = this.props;
        const { address, snackbarOpen, snackbarText, type } = this.state;
        
        return (
            <form className={classes.container} noValidate >
                <Grid container spacing={1} className={classes.grid} style={{marginBottom:'20px',marginTop:'12px',justifyContent:'center'}}>
                    <Grid item xs={10} component={Container} className={classes.flexDisplay} >
                        <Button variant="outlined" color="primary" onClick={this.getCurrentLocation} size="small"
                        >Detect my location</Button>
                    </Grid>
                    <Grid item xs={11} component={Container} className={classes.flexDisplay}>
                    <Typography variant="caption" color="secondary" align="center"
                        >Currently for Hyderabad/Telangana and Vadodara, expanding to other cities soon.</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={11} md={6} component={Container}>
                        <TextField
                            id="autocompleteField"
                            variant="outlined"
                            fullWidth
                            label="Location"
                            placeholder="Search for location..."
                            value={address}
                            onChange={(e)=>this.setState({address:e.target.value})}
                        />
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
                                <MenuItem value='O2'>Oxygen</MenuItem>
                                <MenuItem value='GEN'>General Bed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} md={1} component={Container}>
                        <Button
                            variant="contained"
                            size="small"
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
                        autoHideDuration={2500}>
                        <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
                    </Snackbar>
                </Grid>
            </form>
        );
    }
}

export default withStyles(Styles)(LocationForm);