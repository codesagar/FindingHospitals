import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '18px auto',
        marginTop:0
    },
    paper: {
        padding: '1.5rem 2rem',
        borderRadius:'10px'
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
        fontSize: '1.2em',
        fontWeight:'500'
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
    }
}));


const ListCard = ({ details, bedType }) => {
    
    const type = (bedType === 'GEN' ? 'Vacant General Beds' : (bedType === 'O2' ? 'Vacant Oxygen Supply beds' : 'Vacant ICU beds'));
    const classes = useStyles();

    const infoText = (key, value) => {
        return <div className={classes.infoContainer} key={key}>
            {
                key.toLowerCase() === "contact" || key === "Nodal Officer Mobile No" || key.toLowerCase() === "google contact"?
                    <Typography variant="body1">
                        <strong>
                            {key}:&ensp;
                        </strong>
                        <a href={`tel:${value}`} style={{ textDecoration: 'none'}}>{value}</a>
                    </Typography>
                    : <Typography variant="body1"><strong>{key}:&ensp;</strong>{value}
                        { key==="Distance"?' KM':null}</Typography>
            }
        </div>
    }

    const bedInfoText = (key, value) => {
        return <div key={key}
            className={type !== key ? classes.borderContainer : [classes.borderContainer, classes.hightlight].join(' ')}>
            <Typography style={{fontSize:'0.9rem',fontWeight:600}} color="primary">{key.toUpperCase()}:&ensp;</Typography>
            <Typography variant="body1" >{value}</Typography>
        </div>
    }

    const bedDetails = {
        "Vacant General Beds": details["Vacant-GEN"]?details["Vacant-GEN"]: 0,
        "Vacant Oxygen Supply beds": details["Vacant-O2"]?details["Vacant-O2"]: 0,
        "Vacant ICU beds": details["Vacant-ICU"]?details["Vacant-ICU"]: 0
    }

    return (
        <Container maxWidth="md" className={classes.container}>
            <Paper elevation={4} className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={11} md={8} component={Container}>
                        <Typography variant="subtitle1" className={classes.title}>{details["Hospital Name"]}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} component={Container} >
                        <Button variant="contained" color="primary" style={{width:'100%',fontWeight:'400'}}
                            onClick={() => window.open(details["Map Link"], "_blank")}
                        > Open with Maps</Button>
                    </Grid>
                </Grid>
                <br />
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
                        <br/>
                    </Grid>
                    <Grid item xs={12} md={4} component={Container}>
                        {
                            Object.keys(bedDetails).map((key) => {
                                return bedInfoText(key, bedDetails[key]);
                            })
                        }
                    </Grid>                   
                </Grid>
            </Paper>
        </Container>
    )
}

export default ListCard;