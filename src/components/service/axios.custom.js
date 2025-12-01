import axios from "axios";


// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Alter defaults after instance has been created
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OTJiMTFjNzM5ZWFkMjA1ZmFkYjExYWUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NjQ1NTY5MzcsImV4cCI6MTc2NDU5MjkzN30.hEcwCmHgBrY-cvjcCUPX_e1_4axYIcL2u5B4JCJ5aNw";
instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
}
);

// Add a response interceptor
instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data && response.data.data) {
        return response.data;
    }

    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    debugger;
    if (error.response && error.response.data) {
        debugger;
        return error.response.data;
    }
    return Promise.reject(error);
});



export default instance;