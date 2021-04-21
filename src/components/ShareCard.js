import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
    WhatsappShareButton, WhatsappIcon,
    FacebookShareButton, FacebookIcon,
    FacebookMessengerShareButton, FacebookMessengerIcon,
    TwitterShareButton, TwitterIcon,
    TelegramShareButton, TelegramIcon,
    EmailShareButton, EmailIcon,
} from "react-share";

const Styles = (theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        paddingBottom:'25px'
    },
    btn: {
        margin: '6px',
        display: 'flex',
        flexDirection:'column'
    },
    title: {
        margin:'9px auto'
    },
    iconBtn: {
        padding: '3.5px'
    }
});

class ShareCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbarOpen:false
        }
    }

    render() {
        const { classes, open, onClose } = this.props;
        const { snackbarOpen } = this.state;
        const url = 'https://covidbeds.online/';
        return (
            <div>
                <Drawer anchor="bottom" open={open} onClose={onClose}>
                    <Typography align="center" variant="subtitle1" className={classes.title}>
                        <strong>Share</strong>
                    </Typography>
                    <div className={classes.container}>
                        <div className={classes.btn}>
                            <IconButton className={classes.iconBtn} onClick={() => {
                                navigator.clipboard.writeText(url);
                                this.setState({ snackbarOpen: true });
                            }}>
                                <FileCopyOutlinedIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="caption" color="textSecondary">Copy link</Typography>
                        </div>
                        <div className={classes.btn}>
                            <WhatsappShareButton url={url}>
                                <WhatsappIcon size="2.5rem" />
                            </WhatsappShareButton>
                            <Typography variant="caption" color="textSecondary">WhatsApp</Typography>
                        </div>
                        <div className={classes.btn}>
                            <FacebookShareButton url={url}>
                                <FacebookIcon size="2.5rem" />
                            </FacebookShareButton>
                            <Typography variant="caption" color="textSecondary">Facebook</Typography>
                        </div>
                        <div className={classes.btn}>
                            <FacebookMessengerShareButton url={url}>
                                <FacebookMessengerIcon size="2.5rem" />
                            </FacebookMessengerShareButton>
                            <Typography variant="caption" color="textSecondary">Messenger</Typography>
                        </div>
                        <div className={classes.btn}>
                            <TwitterShareButton url={url}>
                                <TwitterIcon size="2.5rem" />
                            </TwitterShareButton>
                            <Typography variant="caption" color="textSecondary">Twitter</Typography>
                        </div>
                        <div className={classes.btn}>
                            <TelegramShareButton url={url}>
                                <TelegramIcon size="2.5rem" />
                            </TelegramShareButton>
                            <Typography variant="caption" color="textSecondary">Telegram</Typography>
                        </div>
                        <div className={classes.btn}>
                            <EmailShareButton url={url}>
                                <EmailIcon size="2.5rem" />
                            </EmailShareButton>
                            <Typography variant="caption" color="textSecondary">Email</Typography>
                        </div>
                    </div>
                </Drawer>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    onClose={() => this.setState({ snackbarOpen: false })}
                    autoHideDuration={1500}>
                    <MuiAlert elevation={4} variant="standard" severity="info">Link Copied!</MuiAlert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(Styles)(ShareCard);