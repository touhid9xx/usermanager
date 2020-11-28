import axios from 'axios';


//axios.defaults.headers.common['Authorization'] = token ? token.token : '';
const ax = axios.create({
    baseURL: 'http://localhost:8000/api',

    // timeout: 1000,
    // headers: {'X-Custom-Header': 'bearer '}
});

ax.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    //console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default ax;
