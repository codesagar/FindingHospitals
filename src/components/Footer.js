import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}Finding Hospitals{' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop:'auto',
        padding:'1rem'
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            {/* <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography> */}
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                A web application to find out the nearest hospital with COVID facilities in Vadodara
        </Typography>
            <Copyright />
        </footer>
    )
}

export default Footer;