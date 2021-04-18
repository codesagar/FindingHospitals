import axios from "axios";

const reverseGeocoding = async (latitude, longitude) => {
    const loc= `${latitude},${longitude}`;
    const url =
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(loc)}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
    let err = false;
    const response = await axios.get(url).catch((e) => {
        console.error(e);
        err = true;
    });
    const results = await response.data;
    if (results.status !== 'OK')
        err = true;
    if (err)
        return { err: 'Error geting location' }
    
    const address = await results.results[0].formatted_address
    return { address:address };
}

export default reverseGeocoding;