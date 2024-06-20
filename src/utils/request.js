import axios from 'axios';

const BASE_URL = 'https://localhost:7262/api/';

const requests = axios.create({
    baseURL: BASE_URL,
});

export const requestsPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default requests;
