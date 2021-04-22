import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

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
            bedType: '',
            lastUpdatedOn: ''
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
                lastUpdatedOn:res.lastUpdatedOn,
                loading: false
            });
            window.scrollTo({ top: 185, behavior: 'smooth' });
        }
    }

    render() {
        const { isResponseLoaded, hospitals, snackbarOpen, snackbarText, loading, bedType, lastUpdatedOn } = this.state;
        return (
            <>
                <br />
                <Container>
                    <Typography variant="body2" align="center">
                        National Helpline:
                        <a href="tel:1075" style={{ textDecoration: 'none' }}>1075</a>
                    </Typography>
                    <Typography align="center" style={{marginTop:'15px', fontSize:'1rem'}}>
                        <strong >
                            Search for nearest hospital in Vadodara based on your location and
                            required facilities (ICU/Oxygen/General Bed)
                        </strong>
                    </Typography>
                </Container>
                <LocationForm sendReqToGetHospitals={this.sendReqToGetHospitals} /><br />
                {
                    loading ?
                        <div className="progress-container">
                            <CircularProgress />
                        </div> :
                        isResponseLoaded ?
                            <>
                                <Typography align="center" style={{ marginTop: '5px', fontSize: '1.3rem' }}>
                                    Nearest hospitals
                                </Typography>
                                <Container maxWidth="md" style={{ margin: '8px auto' }}>
                                    <Alert severity="info" >
                                        Last updated on <strong>{lastUpdatedOn}. </strong>
                                        Data might be delayed or partial. Please verify with the hospital
                                    </Alert>
                                </Container>
                                {hospitals.map((hos) => {
                                    return <ListCard key={hospitals.indexOf(hos)} details={hos} bedType={bedType} />
                                })}<br /><br />
                            </>
                            : null
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    autoHideDuration={2500}>
                    <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
                </Snackbar>
            </>
        );
    }
}

export default HomePage;