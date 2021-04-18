import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom:theme.spacing(3),
        display: 'flex',
        justifyContent:'center'
    }
}));

const Title = ({text, variant}) => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Typography variant={variant} align="center">{text} </Typography>
        </Container>
    )
}

export default Title;