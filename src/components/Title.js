import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom:theme.spacing(1),
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