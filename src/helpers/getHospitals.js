import axios from 'axios';

const getHospitals = async(params) => {
    const url = 'https://findhospitals.azurewebsites.net/hospitals';
    const data = {
        lat: params.lat,
        lon: params.lon,
        type: params.type
    };
    const headers = { "Content-type": "application/json; charset=UTF-8" };
    const response = await axios.post(url, data, { headers }).catch((err) => {
        return {err:'Something went wrong. Please try again'}
    });
    if (response && response.status === 200)
        return { hospitals: response.data.result, lastUpdatedOn: response.data['last_updated'] };
    else
        return { err: 'Something went wrong. Please try again.' };
}

export default getHospitals;