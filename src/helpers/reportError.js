import axios from 'axios';

const reportError = async (params) => {
    const url = 'https://findhospitals.azurewebsites.net/report';
    const headers = { "Content-type": "application/json; charset=UTF-8" };
    const response = await axios.post(url, params, { headers }).catch((err) => {
        return { err: 'Something went wrong. Please try again' }
    });
    if (response && response.status === 200 && response.data.success)
        return { res:'Thank you for reporting the error.'};
    else
        return { err: 'Something went wrong. Please try again.' };
}

export default reportError;