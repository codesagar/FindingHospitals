import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Title from '../components/Title';
import ListCard from '../components/ListCard';
import LocationForm from '../components/LocationForm';

import getHospitals from '../helpers/getHospitals';



class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],
            isResponseLoaded: false,
            snackbarOpen: false,
            snackbarText: '',
            loading: false,
            bedType:''
        }
    }

    sendReqToGetHospitals = async (params) => {
        this.setState({ loading: true, bedType:params.type});
        const res = await getHospitals(params);
        if (res.err) {
            this.setState({
                snackbarOpen: true,
                snackbarText: res.err,
                loading: false
            });
        } else {
            this.setState({
                isResponseLoaded: true,
                hospitals: res.hospitals,
                loading: false
            })
        }
    }

    render() {
        const { isResponseLoaded, hospitals, snackbarOpen, snackbarText, loading, bedType } = this.state;
        return (
            <>
                <br />
                <Typography variant="subtitle1" align="center">Gujarat Helpline: <a href="tel:104" style={{textDecoration:'none'}}>104</a></Typography>
                <Typography variant="subtitle1" align="center">National Helpline: <a href="tel:+91-11-23978046" style={{ textDecoration: 'none' }}>+91-11-23978046</a></Typography>
                <Typography variant="subtitle1" align="center">National Toll Free: <a href="tel:1075" style={{ textDecoration: 'none' }}>1075</a></Typography>
                
                <Title
                    text="Search for nearest hospital in Vadodara based on your location and required facilities (ICU/Oxygen/General Bed)"
                    variant="h6" />
                <LocationForm sendReqToGetHospitals={this.sendReqToGetHospitals} /><br />
                {
                    loading ?
                        <div className="progress-container">
                            <CircularProgress />
                        </div> :
                        isResponseLoaded ?
                            <>
                                <Title text="Nearest hospitals" variant="h5" />
                                {hospitals.map((hos) => {
                                    return <ListCard key={hospitals.indexOf(hos)} details={hos} bedType={bedType}/>
                                })}<br /><br />
                            </>
                            : null
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    message="Follow up completed!"
                    autoHideDuration={2500}>
                    <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
                </Snackbar>
            </>
        );
    }
}

export default HomePage;