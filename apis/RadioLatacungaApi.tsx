import axios from 'axios';
//http://3.12.17.53:5001/api
// const baseURL= 'http://localhost:5000/api';

const baseURL= 'https://server.radio-latacunga.com/api';
export default axios.create({
    baseURL
})