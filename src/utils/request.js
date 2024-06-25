import axios from 'axios';

const requests = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
});

export const requestsPrivate = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default requests;
