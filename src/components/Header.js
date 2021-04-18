import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => {
    return (
        <div >
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="subtitle1" color="inherit">
                        FINDING HOSPITALS
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;