import axios from 'axios';

const requests = axios.create({
    baseURL: 'http://localhost:7262/api/',
});

export default requests;
