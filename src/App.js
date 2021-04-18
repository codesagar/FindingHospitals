import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Header from './components/Header';
import Title from './components/Title';
import ListCard from './components/ListCard';
import LocationForm from './components/LocationForm';
// import Footer from './components/Footer';

import getHospitals from './helpers/getHospitals';
import './App.css';
import { CircularProgress } from '@material-ui/core';


require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      isResponseLoaded: false,
      snackbarOpen: false,
      snackbarText: '',
      loading:false
    }
  }

  sendReqToGetHospitals = async (params) => {
    this.setState({ loading: true });
    const res = await getHospitals(params);
    if (res.err) {
      this.setState({
        snackbarOpen: true,
        snackbarText: res.err,
        loading:false
      });
    } else {
      this.setState({
        isResponseLoaded: true,
        hospitals: res.hospitals,
        loading:false
      })
    }
  }

  render() {
    const { isResponseLoaded, hospitals, snackbarOpen, snackbarText , loading} = this.state;
    return (
      <div className="app-container">
        <div className="app-main">
          <Header />
          <br/>
          <Title text="Search by location and types of beds(ICU Beds, O2 Supply, Beds for Mild Symptomatic), to get information about nearby hospitals with required availability"
            variant="body1" />
          <LocationForm sendReqToGetHospitals={this.sendReqToGetHospitals} /><br />
          {
            loading ?
              <div className="progress-container">
                <CircularProgress/>
              </div>:
            isResponseLoaded ?
              <>
                <Title text="Nearest hospitals" variant="h5" />
                {hospitals.map((hos) => {
                  return <ListCard key={hospitals.indexOf(hos)} details={hos} />
                })}<br/><br/>
              </>
              : null
          }
        </div>
        {/* <Footer/> */}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={() => this.setState({ snackbarOpen: false })}
          message="Follow up completed!"
          autoHideDuration={2500}>
          <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

export default App;