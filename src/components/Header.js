import React from 'react';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        alignItems:'center'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
    },
    title: {
        flexGrow:1
    }
}));


const Header = () => {
    const classes = useStyles();
    return (
        <div >
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Link to='/' className={[classes.title,classes.link].join(' ')}>
                        <Typography variant="subtitle2" color="inherit" style={{fontSize:'1.1rem'}}>
                            COVID BEDS
                    </Typography>
                    </Link>
                    <Link to='/contact' className={classes.link}>
                        <Button color="inherit" variant="outlined" size="small">Contact us</Button>
                    </Link>
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;