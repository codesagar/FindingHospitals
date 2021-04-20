import React from 'react';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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
            <ContactForm />
        </Container>
        <Divider variant="middle"/>
        <DeveloperTeamCard />
        </>
    );
}

export default ContactPage;