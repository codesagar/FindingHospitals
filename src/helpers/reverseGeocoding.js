import axios from "axios";

const reverseGeocoding = async (latitude, longitude) => {
    const loc= `${latitude},${longitude}`;
    const url =
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(loc)}&key=${process.env.REACT_APP_MAPS_API_KEY}`;
    const response = await axios.get(url).catch((e) => {
        return { err: 'Error geting location' };
    });
    if (response && response.status===200) {
        const results = await response.data;
        if (results.status !== 'OK')
            return { err: 'Error geting location' };
        const address = await results.results[0].formatted_address
        return { address: address };
    } else {
        return { err: 'Error geting location' };
    }     
}

export default reverseGeocoding;