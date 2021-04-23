import React from 'react';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import ContactForm from '../components/ContactForm';
import DeveloperTeamCard from '../components/DevInfoCard';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '2rem',
        marginBottom: '3rem',
        display: 'flex',
        flexDirection: 'column'
    },
    link: {
        fontWeight: 800,
        textDecoration: 'none',
        marginBottom:'8px'
    },
    alert: {
        marginBottom: '8px',
    },
    capital: {
        textTransform: 'uppercase'
    }
}));


const ContactPage = () => {
    
    const classes = useStyles();
    return (
        <>
        <Container maxWidth="sm" component="main" className={classes.container}>
            <Link className={classes.link} to="/">
                <Button size="small">
                    <ArrowBackIcon fontSize="small"/>&nbsp; Go back to home page
                </Button>
                </Link>
                <Alert severity="error" className={classes.alert}>
                    <strong className={classes.capital}>
                        Please do not email us for beds or injections.
                    </strong><br/>
                    This website is an information portal to help you find the nearest hospital.
                    We don't have the resources to address medical requirements.
                </Alert>
            <ContactForm />
        </Container>
        <Divider variant="middle"/>
        <DeveloperTeamCard />
        </>
    );
}

export default ContactPage;