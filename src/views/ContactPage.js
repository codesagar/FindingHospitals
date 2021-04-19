import React from 'react';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import ContactForm from '../components/ContactForm';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '2.5rem',
        paddingBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column'
    },
    link: {
        alignSelf: 'center',
        marginTop: '13px',
        fontWeight: 800,
        textDecoration:'none'
    }
}));


const ContactPage = () => {
    
    const classes = useStyles();
    return (
        <Container maxWidth="sm" component="main" className={classes.container}>
            <ContactForm /><br />
            <Link className={classes.link} to="/">
                <Button size="small">
                    &lt;&lt; Go back to home page
                </Button>
            </Link>
        </Container>
    );
}

export default ContactPage;