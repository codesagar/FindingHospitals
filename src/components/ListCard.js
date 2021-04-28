import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ReportIcon from '@material-ui/icons/Report';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReportDialog from './ReportDialog';

const Styles = ((theme) => ({
    container: {
        margin: '12px auto',
        marginTop:0
    },
    paper: {
        display: 'flex',
        flexDirection:'column'
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: '3px auto',
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    title: {
        fontSize: '1.05rem',
        fontWeight:'500'
    },
    subtitle: {
      marginTop:'-10px'  
    },
    borderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        margin: '10px auto',
        marginTop:0,
        padding: '8px',
        border: '1px solid',
        borderColor:theme.palette.grey[700]
    },
    hightlight: {
        backgroundColor: '#deeeff'
    },
    reportBtn: {
        alignSelf: 'flex-start',
        color:theme.palette.error.main
    },
    bold: {
        fontWeight:600
    }
}));


class ListCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openReportDialog: false,
            subtextVisible:true
        }
    }

    handleReportClick = () => this.setState({ openReportDialog: true });
    handleReportDialogClose = () => this.setState({ openReportDialog: false });
    handleAccordionOpen = (event, expanded) => this.setState({ subtextVisible: !expanded });

    render() {
        const { details, bedType, classes } = this.props;
        const type = (bedType === 'GEN' ? 'Vacant General Beds' :
            (bedType === 'O2' ? 'Vacant Oxygen Supply beds' : 'Vacant ICU beds'));
        const { openReportDialog, subtextVisible } = this.state;

        const infoText = (key, value) => {
            return <div className={classes.infoContainer} key={key}>
                {
                    key.toLowerCase() === "contact" || key === "Nodal Officer Mobile No" || key.toLowerCase() === "google contact" ?
                        <Typography variant="body1">
                            <strong>
                                {key}:&ensp;
                        </strong>
                            <a href={`tel:${value}`} style={{ textDecoration: 'none' }}>{value}</a>
                        </Typography>
                        : <Typography variant="body1"><strong>{key}:&ensp;</strong>{value}
                            {key === "Distance" ? ' KM' : null}</Typography>
                }
            </div>
        }

        const bedInfoText = (key, value) => {
            return <div key={key}
                className={type !== key ? classes.borderContainer : [classes.borderContainer, classes.hightlight].join(' ')}>
                <Typography style={{ fontSize: '0.9rem', fontWeight: 600 }} color="primary">{key.toUpperCase()}:&ensp;</Typography>
                <Typography style={{ fontSize: '0.9rem' }}>{value}</Typography>
            </div>
        }

        const bedDetails = {
            "Vacant General Beds": details["Vacant-GEN"] ? details["Vacant-GEN"] : 0,
            "Vacant Oxygen Supply beds": details["Vacant-O2"] ? details["Vacant-O2"] : 0,
            "Vacant ICU beds": details["Vacant-ICU"] ? details["Vacant-ICU"] : 0
        }

        return (
            <Container maxWidth="md" className={classes.container}>
            <Accordion elevation={2} onChange={this.handleAccordionOpen}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={1}>
                        <Grid item xs={11} component={Container}>
                            <Typography variant="subtitle1" className={classes.title}>{details["Hospital Name"]}</Typography>
                        </Grid>
                            {
                                subtextVisible ? <>
                                    <Grid item xs={11} component={Container} className={classes.subtitle}>
                                        <Typography variant="caption">{type}: <span style={{ fontWeight: 500 }}>{details[`Vacant-${bedType}`]}</span></Typography>
                                    </Grid>
                                    <Grid item xs={11} component={Container} className={classes.subtitle}>
                                        <Typography variant="caption">Distance: <span style={{fontWeight:500}}>{details["Distance"]} KM</span></Typography>
                                    </Grid>
                                    </>
                                    :null
                            }    
                    </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} component={Container}>
                            {
                                Object.keys(details).slice(0, -3).map((key) => {
                                    if (["Cluster Name", "Hospital Name", "Lat", "Lon", "Lookup", "Map Link", "Place ID"].includes(key)
                                        || !details[key] || details[key].length <= 1) {
                                        return null;
                                    }
                                    return infoText(key, details[key]);
                                })
                            }
                            
                        </Grid>
                        <Grid item xs={12} md={4} component={Container}>
                            <Button variant="contained" color="primary" style={{ width: '100%', marginBottom:'10px'}}
                                onClick={() => window.open(details["Map Link"], "_blank")}
                            > Open with Maps</Button>
                            {
                                Object.keys(bedDetails).map((key) => {
                                    return bedInfoText(key, bedDetails[key]);
                                })
                            }
                        </Grid>
                    </Grid>
                        <Button
                            className={classes.reportBtn}
                            variant="text"
                            startIcon={<ReportIcon color="error"/>}
                            size="small"
                            onClick={this.handleReportClick}
                        >REPORT</Button>
                </AccordionDetails>
            </Accordion>
                <ReportDialog open={openReportDialog} handleClose={this.handleReportDialogClose} placeID={details["Place ID"]}
                    hospitalName={ details["Hospital Name"]}/>
        </Container> 
        );
    }
}

export default withStyles(Styles)(ListCard);