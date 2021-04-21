import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShareCard from './ShareCard';

const Styles = ((theme) => ({
    offset: theme.mixins.toolbar,
    toolbar: {
        justifyContent:'flex-end'
    },
    linkText: {
        textDecoration: 'none',
        color: 'white',
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    title: {
        flexGrow:1
    },
    share: {
        marginRight:'8px'
    }
}));


class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen:false
        }
    }

    componentDidMount() {
        if (window.innerWidth <= 330) {
            document.getElementById('headerTitle').remove()
        }
    }

    onShareBtnClick = () => {
        this.setState({drawerOpen:!this.state.drawerOpen})
    }
    
    render(props) {
        const { classes } = this.props;
        const { drawerOpen } = this.state;
        return (
            <React.Fragment>
                <AppBar position="sticky">
                    <Toolbar className={classes.toolbar} variant="dense">
                        <Typography variant="subtitle2" color="inherit" id="headerTitle"
                            className={[classes.title, classes.linkText].join(' ')}>
                            <Link to='/' className={classes.link} >
                                COVID HOSPITALS
                        </Link>
                        </Typography>
                        <Button color="inherit" variant="outlined" className={classes.share} onClick={this.onShareBtnClick}
                            size="small">Share</Button>
                        <Link to='/contact' className={classes.link}>
                            <Button color="inherit" variant="outlined" size="small">Contact us</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <ShareCard open={drawerOpen} onClose={this.onShareBtnClick}/>
            </React.Fragment>
        );
    }
    
}

export default withStyles(Styles)(Header);