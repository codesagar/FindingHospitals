import React from 'react';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '1.2rem auto 2rem',
    },
    paper: {
        padding: '1.5rem',
        borderRadius: '12px',
        marginTop:'20px'
    },
    alert: {
        marginTop:'0.8rem'
    },
    link: {
        textDecoration:'none'
    }
}));

const TermsPage = () =>{
    const classes = useStyles();
    return (
        <Container className={classes.container} maxWidth="md">
            <Link to="/" className={classes.link}>
                <Button size="small">
                    <ArrowBackIcon fontSize="small" />&nbsp; Go back to home page
            </Button>
            </Link>
            <Alert severity="error" className={classes.alert}>
                We do our best to provide real time accurate information however we heavily
                depend on external data for it. We cannot guarantee accuracy of the data.
                All data is collected via publicly available sources.
                We urge visitors to verify the authenticity and accuracy on their own before
                taking any decisions. We are a volunteer group that is trying to help the
                citizens with as much available information as we can. We are not responsible for the data itself.
            </Alert>
            <Paper elevation={2} className={[classes.paper, classes.err].join(' ')}>
                <Typography variant="h6" >
                    Disclaimer/Terms of service
                </Typography>
                <br />
                <Typography variant="body2">
                    The information contained in this website is for general information purposes only.
                    <br/><br/>
                    We endeavour to keep the information up to date and correct, but we make no representations or warranties of
                    any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability
                    with respect to the website or the information contained on the
                    website for any purpose.
                    <br /><br />
                    Any reliance you place on such information is therefore strictly at your own risk.
                    <br /><br />
                    In no event will we be liable for any loss or damage including without limitation,
                    indirect or consequential loss or damage, or any loss or damage whatsoever arising from
                    or in connection with, the use of this website.
                    <br /><br />
                    Every effort is made to keep the website up and running smoothly.
                    However, we take no responsibility for, and will not be liable for, the website being temporarily
                    unavailable due to technical issues beyond our control.
                </Typography>
            </Paper>
        </Container>
    );
}

export default TermsPage;