import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    outerContainer: {
        backgroundColor: theme.palette.grey[200],
        padding:'2rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paper: {
        padding: '10px 20px',
        borderRadius:'12px',
        margin:'15px auto'
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem',
        marginBottom: '8px',
    },
    name: {
        fontWeight: 'bolder',
        fontSize: '0.96rem',
        margin: '5px auto 8px',
        textTransform: 'uppercase'
    },
    contact: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: theme.palette.primary.dark,
        fontSize:'0.9rem'
    }
}));

const DevInfoCard = () => {
    const classes = useStyles();
    const details = [
        {
            name: 'Sagar Patel',
            linkedIn: 'https://www.linkedin.com/in/codesagar',
            linkedInContactText: 'LinkedIn Profile',
            email: 'sagarpatel.exe@gmail.com',
            emailContactText:'sagarpatel.exe@gmail.com'
        },
        {
            name: 'Shreya Paradkar',
            linkedIn: '',
            linkedInContactText:'',
            email: 'srparadkar15@gmail.com',
            emailContactText:'srparadkar15@gmail.com',
        }
    ]

    const infoDisplay = (params) => {
        return <Paper className={classes.paper}>
            <Typography className={classes.name} align="center">{params.name}</Typography>
            {
                params.linkedIn ?
                    <Typography align="center">
                        <a href={params.linkedIn} className={classes.contact} target="_blank" rel="noreferrer" >
                            <LinkedInIcon color="primary" />&nbsp;{params.linkedInContactText}
                        </a>
                    </Typography>
                    :null
            }
            {
                params.email ?
                    <Typography align="center">
                        <a href={`mailto:${params.email}`} className={classes.contact} target="_blank" rel="noreferrer" >
                            <EmailIcon color="primary" />&nbsp;{params.emailContactText}
                        </a>
                    </Typography>
                    :null
            }
            </Paper>
    }

    return (
        <div className={classes.outerContainer}>
            <Typography className={classes.title}>Developer Team</Typography>
            <Container  maxWidth='sm' className={classes.container}>
                {
                    details.map((dev) => infoDisplay({
                        name: dev.name,
                        linkedIn: dev.linkedIn,
                        linkedInContactText: dev.linkedInContactText,
                        email: dev.email,
                        emailContactText: dev.emailContactText
                    }))
                }
            </Container>
        </div>       
    )
}

export default DevInfoCard;