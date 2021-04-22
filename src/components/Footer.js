import React from 'react';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: '1rem',
        backgroundColor: theme.palette.grey[300],
        marginTop: 'auto',
        bottom: 0
    },
    link: {
        textDecoration:'none'
    },
    text: {
        color:'#4a4a4a'
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography variant="body2" align="center" component="p" className={classes.text}>
                Please reach out to us <Link to="/contact" className={classes.link}>here</Link> with suggestions or feedback.
            </Typography>
            <Typography variant="subtitle2" align="center" component="p" className={classes.text}>
                Read our terms of service <Link to="/terms" className={classes.link}>here</Link>
            </Typography>
        </footer>
    )
}

export default Footer;