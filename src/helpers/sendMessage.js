import axios from 'axios';

const sendMessage = async (params) => {
    const url = 'https://findhospitals.azurewebsites.net/message';
    const data = {
        name: params.name,
        contact: params.contact,
        message: params.message
    };
    const headers = { "Content-type": "application/json; charset=UTF-8" };
    const response = await axios.post(url, data, { headers }).catch((err) => {
        return { err: 'Something went wrong. Please try again' }
    });
    if (response.data.success)
        return { success: 'Your message has been sent successfully' }
    else
        return { err: 'Something went wrong. Please try again' }
}

export default sendMessage;