import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
});

//cookies backend-frontend
instance.defaults.withCredentials = true;

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (err) {
    const status = err.response?.status || 500;
    // we can handle global errors here
    console.log(status);
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Login Please");
            return Promise.reject(err);
        }
        case 402: {
            //toast.error("Login Please");
            return Promise.reject();
        }
        case 403: {
            toast.error("you dont have permission to here");
            console.log(err.response.data);
            return err.response.data;
        }
        case 500: {
            //toast.error("Login Please");
            return Promise.reject();
        }
        default:{
            return Promise.reject();
        }
    }
   
});



export default instance;